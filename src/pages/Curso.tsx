import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  Lock,
  PlayCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { BRAND } from "@/lib/constants";

const Curso = () => {
  const hasAccess = true; // Change to false to test paywall
  const hasVerticals = true; // From onboarding

  // Mock course structure
  const modules = [
    {
      week: 1,
      title: "M1: Setup & Clips",
      lessons: [
        { title: "De dónde nace todo esto", duration: "12 min", completed: false },
        { title: "Cómo generar contenido real y orgánico", duration: "18 min", completed: false },
        { title: "El método clipping", duration: "15 min", completed: false }
      ]
    },
    {
      week: 2,
      title: "M2: Ritmo I",
      lessons: [
        { title: "Introducción a la web app", duration: "8 min", completed: false },
        { title: "Crea tu perfil de creador", duration: "10 min", completed: false },
        { title: "Encuentra tus cores y verticales", duration: "20 min", completed: false }
      ]
    },
    {
      week: 3,
      title: "M3: Distribución I",
      lessons: [
        { title: "Cómo inspirarte", duration: "12 min", completed: false },
        { title: "Registrar ideas en Notion", duration: "15 min", completed: false },
        { title: "Conectar inspiración con clips", duration: "18 min", completed: false }
      ]
    },
    {
      week: 4,
      title: "M4: Optimización",
      lessons: [
        { title: "Por qué clips de 5-10s", duration: "10 min", completed: false },
        { title: "Ejemplos de edición", duration: "25 min", completed: false }
      ]
    },
    {
      week: 5,
      title: "M5: Ritmo II",
      lessons: [
        { title: "Distribución avanzada", duration: "16 min", completed: false }
      ]
    },
    {
      week: 6,
      title: "M6: Distribución II",
      lessons: [
        { title: "Equipos recomendados", duration: "12 min", completed: false }
      ]
    },
    {
      week: 7,
      title: "M7: Consolidación",
      lessons: [
        { title: "Lectura y análisis de datos", duration: "20 min", completed: false }
      ]
    },
    {
      week: 8,
      title: "M8: Lanzamiento",
      lessons: [
        { title: "Monetización en redes", duration: "22 min", completed: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            {BRAND.name} Academy
          </h1>
          <p className="text-gray-600 mb-4">
            Domina el método completo: de tu primer clip a contenido que escala
          </p>
          <p className="text-sm text-gray-500">
            8 módulos · 12 horas de contenido · Actualizaciones incluidas de por vida
          </p>
        </div>

        {/* Warning if no verticals */}
        {!hasVerticals && (
          <Card className="border-2 border-amber-200 bg-amber-50 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800">
                    ⚠️ <strong>Completa el quiz de Content Cores primero</strong> para desbloquear 
                    todas las lecciones y ver cuáles son más relevantes para ti.
                  </p>
                  <Button
                    size="sm"
                    className="mt-3 bg-amber-600 hover:bg-amber-700"
                    onClick={() => (window.location.href = "/onboarding")}
                  >
                    Ir al quiz de Cores
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modules List */}
        <div className="space-y-6">
          {modules.map((module, moduleIndex) => (
            <Card key={moduleIndex} className="border-2 border-gray-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Semana {module.week}
                    </Badge>
                    <CardTitle className="text-xl text-gray-900">
                      {module.title}
                    </CardTitle>
                  </div>
                  <div className="text-sm text-gray-600">
                    {module.lessons.length} lecciones
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => alert(`Lección: ${lesson.title}`)}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : hasAccess ? (
                          <PlayCircle className="w-5 h-5 text-purple-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="font-medium text-gray-900">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/dashboard")}
          >
            ← Volver al Dashboard
          </Button>
          <p className="text-sm text-gray-500 mt-6">
            {BRAND.fullName} · {BRAND.principles.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Curso;
