import { Card } from "@/components/ui/card";
import { Video, Film, Layers } from "lucide-react";

interface StepFormatProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

const options = [
  { value: "short", label: "Cortos ≤12s", icon: Video, desc: "Máxima viralidad" },
  { value: "long", label: "Largos ≥50s", icon: Film, desc: "Mayor retención" },
  { value: "both", label: "Ambos", icon: Layers, desc: "Estrategia Barbell" },
];

const StepFormat = ({ data, updateData }: StepFormatProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading mb-2">Formato preferido</h2>
        <p className="text-muted-foreground">
          ¿Qué tipo de contenido te gusta crear?
        </p>
      </div>

      <div className="grid gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.value}
              className={`p-6 cursor-pointer transition-all ${
                data.preferred_format === option.value
                  ? "bg-primary/10 border-primary shadow-glow"
                  : "hover:bg-secondary/50"
              }`}
              onClick={() => updateData("preferred_format", option.value)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{option.label}</h3>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StepFormat;