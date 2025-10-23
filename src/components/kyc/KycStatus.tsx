import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KycRecord {
  id: string;
  status: string | null;
  provider: string | null;
  reference: string | null;
  started_at: string | null;
  completed_at: string | null;
}

interface KycStatusProps {
  userId: string;
  onKycComplete?: () => void;
}

export function KycStatus({ userId, onKycComplete }: KycStatusProps) {
  const [kycRecord, setKycRecord] = useState<KycRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchKycStatus();

    // Set up real-time subscription
    const channel = supabase
      .channel('kyc-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'kyc_records',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('KYC status changed:', payload);
          if (payload.new) {
            setKycRecord(payload.new as KycRecord);
            if ((payload.new as KycRecord).status === 'approved' && onKycComplete) {
              onKycComplete();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onKycComplete]);

  const fetchKycStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('kyc_records')
        .select('*')
        .eq('user_id', userId)
        .order('started_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setKycRecord(data);
    } catch (error) {
      console.error('Error fetching KYC status:', error);
    } finally {
      setLoading(false);
    }
  };

  const startKycSession = async () => {
    setStarting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('kyc-session', {
        body: { userId },
      });

      if (error) throw error;

      toast({
        title: "KYC Session Created",
        description: `Reference: ${data.reference}`,
      });

      // Simulate opening KYC verification in new tab
      window.open(data.sessionUrl, '_blank');

      // Refresh KYC status
      fetchKycStatus();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setStarting(false);
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string | null) => {
    const variant = status === 'approved' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary';
    return (
      <Badge variant={variant} className="ml-2">
        {status || 'unstarted'}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>KYC Verification</CardTitle>
          <CardDescription>Loading status...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          KYC Verification
          {kycRecord && getStatusBadge(kycRecord.status)}
        </CardTitle>
        <CardDescription>
          Verify your identity to access platform features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {kycRecord ? (
          <>
            <div className="flex items-center gap-3">
              {getStatusIcon(kycRecord.status)}
              <div>
                <p className="font-medium">
                  Status: {kycRecord.status || 'Unknown'}
                </p>
                {kycRecord.reference && (
                  <p className="text-sm text-muted-foreground">
                    Reference: {kycRecord.reference}
                  </p>
                )}
              </div>
            </div>

            {kycRecord.started_at && (
              <p className="text-sm text-muted-foreground">
                Started: {new Date(kycRecord.started_at).toLocaleString()}
              </p>
            )}

            {kycRecord.completed_at && (
              <p className="text-sm text-muted-foreground">
                Completed: {new Date(kycRecord.completed_at).toLocaleString()}
              </p>
            )}

            {kycRecord.status === 'pending' && (
              <p className="text-sm text-yellow-600">
                Your verification is in progress. This typically takes 1-2 business days.
              </p>
            )}

            {kycRecord.status === 'rejected' && (
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  Your verification was not approved. Please try again or contact support.
                </p>
                <Button onClick={startKycSession} disabled={starting}>
                  Retry Verification
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You haven't started the KYC verification process yet.
            </p>
            <Button onClick={startKycSession} disabled={starting}>
              {starting ? 'Starting...' : 'Start KYC Verification'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
