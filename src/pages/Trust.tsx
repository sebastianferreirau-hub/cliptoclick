import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Trust() {
  const [corridor, setCorridor] = useState<'US-CO' | 'US-MX'>('US-CO');

  // Mock data - in production, fetch from backend
  const data = {
    'US-CO': {
      payoutSuccess: 99.6,
      ttfdHours: 18,
      disputeRate: 0.3,
      fraudLossBps: 4,
    },
    'US-MX': {
      payoutSuccess: 99.5,
      ttfdHours: 20,
      disputeRate: 0.4,
      fraudLossBps: 6,
    },
  };

  const metrics = data[corridor];

  const MetricCard = ({
    label,
    value,
    suffix,
    trend,
  }: {
    label: string;
    value: number;
    suffix: string;
    trend?: 'up' | 'down';
  }) => (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardDescription className="text-sm">{label}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold">
            {value}
            {suffix}
          </div>
        </div>
        {trend && (
          <div className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
            {trend === 'up' ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trust Dashboard</h1>
            <p className="text-muted-foreground">Monitor platform health and compliance metrics</p>
          </div>
          <div className="flex gap-2">
            {(['US-CO', 'US-MX'] as const).map((c) => (
              <Button
                key={c}
                variant={corridor === c ? 'default' : 'secondary'}
                onClick={() => setCorridor(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard label="Payout Success" value={metrics.payoutSuccess} suffix="%" trend="up" />
          <MetricCard label="Time to First Dollar (hrs)" value={metrics.ttfdHours} suffix="" />
          <MetricCard label="Dispute Rate" value={metrics.disputeRate} suffix="%" />
          <MetricCard label="Fraud Loss" value={metrics.fraudLossBps} suffix=" bps" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payout Success Rate</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Chart coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Trend</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Chart coming soon</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exceptions</CardTitle>
            <CardDescription>Failed payouts and disputes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">No exceptions in the last 7 days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
