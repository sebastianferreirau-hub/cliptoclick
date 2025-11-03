import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import StepBasics from "@/components/onboarding/StepBasics";
import StepTime from "@/components/onboarding/StepTime";
import StepFormat from "@/components/onboarding/StepFormat";
import StepTest from "@/components/onboarding/StepTest";
import StepGoal from "@/components/onboarding/StepGoal";

const STEPS = 4;

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    country: "",
    lang: "es",
    time_commitment: "",
    preferred_format: "",
    answers: {
      from_now: "",
      who_with: "",
      energizes: "",
      job_now: "",
      one_year: "",
      five_min_topics: "",
    },
    goal_primary: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
      }
    });
  }, [navigate]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // Call VerticalsAI
      const { data: aiData, error: aiError } = await supabase.functions.invoke('verticals-ai', {
        body: {
          answers: {
            name: formData.name,
            ...formData.answers
          },
          meta: {
            platforms: formData.preferred_format === 'short' ? ['instagram', 'tiktok'] : ['instagram', 'tiktok', 'youtube'],
            language: formData.lang,
            level: formData.time_commitment === '1-5h' ? 'beginner' : formData.time_commitment === '5-10h' ? 'intermediate' : 'advanced',
          }
        }
      });

      if (aiError) throw aiError;

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          handle: formData.handle,
          country: formData.country,
          lang: formData.lang,
          time_commitment: formData.time_commitment,
          goal_primary: formData.goal_primary,
          content_cores: aiData,
          ai_profile_summary: aiData.summary,
          onboarding_completed: true,
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      // Save analysis
      await supabase.from('ai_runs').insert({
        user_id: userId,
        kind: 'verticals',
        input_json: formData,
        output_json: aiData,
      });

      toast.success("¡Perfil creado con éxito!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Error al completar onboarding");
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / STEPS) * 100;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-heading gradient-text mb-4">
            Descubre tus Content Cores
          </h1>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Paso {currentStep} de {STEPS}
          </p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-2xl min-h-[400px]">
          {currentStep === 1 && (
            <StepBasics data={formData} updateData={updateFormData} />
          )}
          {currentStep === 2 && (
            <StepTest data={formData} updateData={updateFormData} />
          )}
          {currentStep === 3 && (
            <StepFormat data={formData} updateData={updateFormData} />
          )}
          {currentStep === 4 && (
            <StepGoal data={formData} updateData={updateFormData} />
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </Button>

          {currentStep < STEPS ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-primary hover:opacity-90 gap-2"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={loading}
              className="bg-gradient-primary hover:opacity-90"
            >
              {loading ? "Procesando..." : "Completar"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;