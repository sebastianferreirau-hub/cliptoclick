import { Card } from "@/components/ui/card";
import { Users, DollarSign, Building, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";

interface StepGoalProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

const goals = [
  { value: "community", label: "Crear comunidad", icon: Users },
  { value: "monetize", label: "Monetizar", icon: DollarSign },
  { value: "brand", label: "Construir marca", icon: Building },
  { value: "leads", label: "Generar leads", icon: Target },
];

const StepGoal = ({ data, updateData }: StepGoalProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading mb-2">Objetivo principal</h2>
        <p className="text-muted-foreground">
          ¿Cuál es tu meta principal con tu contenido?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <Card
              key={goal.value}
              className={`p-6 cursor-pointer transition-all ${
                data.goal_primary === goal.value
                  ? "bg-primary/10 border-primary shadow-glow"
                  : "hover:bg-secondary/50"
              }`}
              onClick={() => updateData("goal_primary", goal.value)}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-2xl bg-primary/20">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{goal.label}</h3>
              </div>
            </Card>
          );
        })}
      </div>

      <Alert className="bg-accent/10 border-accent">
        <Sparkles className="h-4 w-4 text-accent" />
        <AlertDescription className="ml-2 text-sm">
          <strong>From Clip to Click™</strong> · Relatable &gt; Perfecto · Ritmo &gt; Efectos · Velocidad &gt; Complejidad
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default StepGoal;