import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InstagramMetrics {
  posts_this_week: number;
  total_impressions: number;
  total_reach: number;
  total_engagement: number;
  engagement_rate: number;
  last_updated: string;
}

export const useInstagramMetrics = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['instagram-metrics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('instagram_metrics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      return data as InstagramMetrics | null;
    },
  });

  const refreshMetrics = useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No active session for Instagram metrics refresh');
        throw new Error('Not authenticated');
      }

      console.log('Calling fetch-instagram-insights edge function...');
      const response = await supabase.functions.invoke('fetch-instagram-insights', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('Instagram insights response:', response);

      if (response.error) {
        console.error('Instagram insights error:', response.error);
        throw new Error(response.error.message || 'Failed to fetch insights');
      }

      return response.data;
    },
    onSuccess: () => {
      console.log('Instagram metrics refreshed successfully');
      queryClient.invalidateQueries({ queryKey: ['instagram-metrics'] });
      toast({
        title: 'Métricas actualizadas',
        description: 'Tus datos de Instagram se han actualizado correctamente',
      });
    },
    onError: (error) => {
      console.error('Failed to refresh Instagram metrics:', error);
      toast({
        title: 'Error al actualizar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    metrics,
    isLoading,
    refreshMetrics: refreshMetrics.mutate,
    isRefreshing: refreshMetrics.isPending,
  };
};
