import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { BRAND } from "@/lib/constants";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      } else {
        setUserId(user.id);
      }
    };
    checkAuth();
  }, [navigate]);
  
  // Step 1: Basics
  const [fullName, setFullName] = useState("");
  const [handle, setHandle] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("ES");

  // Step 2: Content Cores (7 questions)
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: ""
  });

  // Step 3: Format
  const [format, setFormat] = useState("shorts");

  // Step 4: Goal
  const [goal, setGoal] = useState("");

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const questions = [
    {
      id: "q1",
      text: "¿De dónde eres y dónde estás viviendo ahora?",
      helper: "Ejemplo: 'Nací en Medellín, vivo en Miami hace 3 años'"
    },
    {
      id: "q2",
      text: "¿Cómo describirías tus raíces o tu identidad cultural?",
      helper: "Ejemplo: 'Colombiano de nacimiento pero con mentalidad muy gringa después de 5 años acá'"
    },
    {
      id: "q3",
      text: "¿Con quién o con qué vives que haga parte de tu día a día?",
      helper: "Ejemplo: 'Vivo con mi perro Boston y mi novia. Compartimos depa con otro colombiano'"
    },
    {
      id: "q4",
      text: "¿Qué cosas te apasionan o te dan energía últimamente?",
      helper: "Ejemplo: 'Gym todas las mañanas, cocinar platos colombianos, fotografía urbana'"
    },
    {
      id: "q5",
      text: "¿A qué te dedicas o qué haces para pagar tus cuentas (aunque no te encante)?",
      helper: "Ejemplo: 'Trabajo en una tienda de ropa pero mi sueño es vivir de contenido'"
    },
    {
      id: "q6",
      text: "¿Qué te gustaría estar haciendo dentro de un año si todo te saliera bien?",
      helper: "Ejemplo: 'Vivir de crear contenido sobre mi vida como inmigrante y tener 100K seguidores'"
    },
    {
      id: "q7",
      text: "Nombra 3 temas de los que podrías hablar 5 minutos sin guion:",
      helper: "Ejemplo: 'La vida con mi perro, emprender sin capital, adaptarse a otro país'"
    }
  ];

  const goals = [
    { id: "community", label: "Crear comunidad", icon: "👥" },
    { id: "monetize", label: "Monetizar", icon: "💰" },
    { id: "brand", label: "Construir marca", icon: "🏢" },
    { id: "leads", label: "Generar leads", icon: "🎯" }
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "No estás autenticado",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log('Starting onboarding submission...');
      console.log('User ID:', user.id);
      console.log('Answers:', answers);

      // Call Claude AI function
      console.log('Calling analyze-cores edge function...');
      
      const { data: aiData, error: aiError } = await supabase.functions.invoke('analyze-cores', {
        body: { 
          answers,
          fullName,
          handle,
          country,
          language,
          format,
          goal
        }
      });

      if (aiError) {
        console.error('Edge function error:', aiError);
        throw new Error(`Edge function error: ${aiError.message || JSON.stringify(aiError)}`);
      }

      if (!aiData) {
        throw new Error('No data returned from edge function');
      }

      console.log('AI generated verticals:', aiData);

      if (!aiData.verticals || !Array.isArray(aiData.verticals)) {
        throw new Error('Invalid AI response: missing verticals array');
      }

      // Save to profile
      console.log('Saving to profile...');
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          handle: handle,
          country: country,
          lang: language,
          content_cores: {
            verticals: aiData.verticals,
            quiz_answers: answers,
            format: format,
            goal: goal,
            generated_at: new Date().toISOString()
          },
          onboarding_completed: true
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }

      console.log('Profile updated successfully');
      toast({
        title: "✅ Content Cores generados con IA!",
        description: "Tu perfil está listo. Redirigiendo al dashboard...",
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error: any) {
      console.error('=== ONBOARDING ERROR ===');
      console.error('Error:', error);
      
      // Show detailed error to user
      const errorMessage = error.message || 'Error desconocido';
      toast({
        title: "Error procesando onboarding",
        description: `${errorMessage}\n\nRevisa la consola para más detalles.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canProceedStep1 = fullName && handle && country && language;
  const canProceedStep2 = Object.values(answers).every(a => a.length > 10);
  const canProceedStep3 = format;
  const canProceedStep4 = goal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {BRAND.name}
          </h1>
          <p className="text-gray-600">Configuración inicial</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Paso {step} de {totalSteps}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Basics */}
        {step === 1 && (
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Información básica
              </CardTitle>
              <p className="text-gray-600">Cuéntanos un poco sobre ti</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  id="fullName"
                  placeholder="Ej: Sebastián Ferreira"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="handle">Usuario / Handle</Label>
                <Input
                  id="handle"
                  placeholder="Ej: @sebasferreirauu"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  placeholder="Ej: Colombia"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma principal</Label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="ES">Español</option>
                  <option value="EN">English</option>
                  <option value="PT">Português</option>
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Content Cores Quiz */}
        {step === 2 && (
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Descubre tus Content Cores
              </CardTitle>
              <p className="text-gray-600">
                Responde con sinceridad y naturalidad. Esta información solo la usamos 
                para detectar tus verticales de contenido—nada se publica.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> No hay respuestas correctas. Lo importante es que te salga natural, 
                  como si hablaras con un amigo.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q, index) => (
                <div key={q.id} className="space-y-2">
                  <Label htmlFor={q.id} className="text-base font-semibold text-gray-900">
                    {index + 1}. {q.text}
                  </Label>
                  <Textarea
                    id={q.id}
                    placeholder="Escribe tu respuesta aquí..."
                    value={answers[q.id as keyof typeof answers]}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">{q.helper}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Format */}
        {step === 3 && (
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Formato preferido
              </CardTitle>
              <p className="text-gray-600">¿Qué tipo de contenido te gusta crear?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onClick={() => setFormat("shorts")}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  format === "shorts"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Shorts ≤12s (recomendado)
                    </h3>
                    <p className="text-sm text-gray-600">Máxima viralidad</p>
                  </div>
                  {format === "shorts" && (
                    <CheckCircle2 className="w-6 h-6 text-purple-600" />
                  )}
                </div>
              </div>

              <div className="p-6 border-2 border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Shorts + Long
                    </h3>
                    <p className="text-sm text-gray-600">Próximamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Goal */}
        {step === 4 && (
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Objetivo principal
              </CardTitle>
              <p className="text-gray-600">¿Cuál es tu meta principal con tu contenido?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    goal === g.id
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{g.icon}</span>
                      <span className="font-semibold text-lg text-gray-900">
                        {g.label}
                      </span>
                    </div>
                    {goal === g.id && (
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </Button>
          )}

          <div className="flex-1" />

          {step < totalSteps && (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3)
              }
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {step === totalSteps && (
            <Button
              onClick={handleSubmit}
              disabled={!canProceedStep4 || loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analizando con IA...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generar mis Content Cores
                </>
              )}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {BRAND.fullName} · {BRAND.principles.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;