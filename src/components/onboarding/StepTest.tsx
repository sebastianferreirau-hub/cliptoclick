import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StepTestProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

const questions = [
  {
    key: "from_now",
    question: "1. ¿De dónde eres y dónde estás viviendo ahora?",
    helper: "Dispara origen cultural y posible vertical de pertenencia o comunidad.",
  },
  {
    key: "who_with",
    question: "2. ¿Con quién o con qué vives que haga parte de tu día a día?",
    helper: "Sirve para descubrir si hay mascota, pareja, roomie, familia — todas posibles verticales.",
  },
  {
    key: "energizes",
    question: "3. ¿Qué cosas te apasionan o te dan energía últimamente?",
    helper: "Abre paso a verticales de hobby o estilo de vida.",
  },
  {
    key: "job_now",
    question: "4. ¿A qué te dedicas o qué haces para pagar tus cuentas (aunque no te encante)?",
    helper: "Permite mostrar contraste entre 'lo que hago' y 'lo que quiero hacer'.",
  },
  {
    key: "one_year",
    question: "5. ¿Qué te gustaría estar haciendo dentro de un año si todo te saliera bien?",
    helper: "Aquí sale la cuarta vertical aspiracional, lo que quieres ser.",
  },
  {
    key: "five_min_topics",
    question: "6. Nombra 3 temas de los que podrías hablar 5 minutos sin guion:",
    helper: "Ej: 'Recetas ecuatorianas, Adaptarse a USA, Fotografía urbana'",
  },
];

const StepTest = ({ data, updateData }: StepTestProps) => {
  const handleTextChange = (key: string, value: string) => {
    const newResponses = { ...data.answers, [key]: value };
    updateData("answers", newResponses);
  };

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      <div>
        <h2 className="text-2xl font-heading mb-2">Cuéntanos tu historia</h2>
        <p className="text-muted-foreground mb-3">
          No lo pienses mucho, solo escríbelo como si estuvieras contando tu historia a un amigo.
        </p>
        <p className="text-xs text-muted-foreground/80">
          No hay respuestas correctas, lo importante es que te salga natural. Lo que pongas acá no se va a publicar, es solo para ayudarte a ver qué cosas ya tienes que contar.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.key} className="space-y-2 p-4 rounded-xl bg-secondary/30">
            <Label className="text-sm font-semibold leading-relaxed">{q.question}</Label>
            <p className="text-xs text-muted-foreground">{q.helper}</p>
            <Textarea
              value={data.answers[q.key] || ""}
              onChange={(e) => handleTextChange(q.key, e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="min-h-[80px] resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTest;