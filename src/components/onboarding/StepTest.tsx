import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface StepTestProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

const questions = [
  "Prefiero contar historias reales vs seguir tendencias",
  "Me gusta hablar directo a cámara",
  "Uso mucho B-roll y transiciones",
  "Disfruto explicar procesos paso a paso",
  "El humor situacional es mi estilo",
  "Grabo rápido sin guion detallado",
  "Me gustan las series o retos",
  "Comparto datos e insights",
  "Grabo en eventos, ciudad o viajes",
  "Tengo acceso único a mi oficio",
  "Reutilizo clips existentes",
  "Comparto mi vida personal",
];

const StepTest = ({ data, updateData }: StepTestProps) => {
  const handleSliderChange = (index: number, value: number[]) => {
    const newResponses = [...data.test_responses];
    newResponses[index] = value[0];
    updateData("test_responses", newResponses);
  };

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      <div>
        <h2 className="text-2xl font-heading mb-2">Test de personalidad</h2>
        <p className="text-muted-foreground">
          Evalúa cada afirmación del 1 (nada) al 5 (totalmente)
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="space-y-3 p-4 rounded-xl bg-secondary/30">
            <Label className="text-sm leading-relaxed">{q}</Label>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-8">Nada</span>
              <Slider
                value={[data.test_responses[index]]}
                onValueChange={(val) => handleSliderChange(index, val)}
                min={1}
                max={5}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-16 text-right">Totalmente</span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
                {data.test_responses[index]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTest;