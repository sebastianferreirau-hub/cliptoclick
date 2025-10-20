import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface StepTimeProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

const options = [
  { value: "1-5h", label: "1-5 horas/semana", desc: "Casual" },
  { value: "5-10h", label: "5-10 horas/semana", desc: "Regular" },
  { value: "10+h", label: "+10 horas/semana", desc: "Profesional" },
];

const StepTime = ({ data, updateData }: StepTimeProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading mb-2">Tiempo semanal</h2>
        <p className="text-muted-foreground">
          ¿Cuánto tiempo dedicas a crear contenido?
        </p>
      </div>

      <div className="grid gap-4">
        {options.map((option) => (
          <Card
            key={option.value}
            className={`p-6 cursor-pointer transition-all ${
              data.time_commitment === option.value
                ? "bg-primary/10 border-primary shadow-glow"
                : "hover:bg-secondary/50"
            }`}
            onClick={() => updateData("time_commitment", option.value)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{option.label}</h3>
                <p className="text-sm text-muted-foreground">{option.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StepTime;