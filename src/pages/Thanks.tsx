import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Sparkles, 
  Users,
  GraduationCap,
  Rocket,
  MessageCircle
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getAppUrl } from "@/lib/subdomain";

const Thanks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6 shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¡Bienvenido! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu pago ha sido confirmado. Es momento de empezar tu transformación como creador.
          </p>
        </div>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-xl mb-8">
          <CardContent className="pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Rocket className="w-6 h-6 text-purple-600" />
              Tus próximos pasos (15 minutos)
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-purple-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Completa el quiz de Content Cores
                  </h3>
                  <p className="text-sm text-gray-600">
                    7 preguntas que nuestra IA analiza para detectar tus 3 verticales de contenido. 
                    <strong className="text-purple-600"> Toma solo 5 minutos.</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-purple-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Descubre tus verticales personalizadas
                  </h3>
                  <p className="text-sm text-gray-600">
                    La IA procesa tus respuestas y genera 3 verticales únicas + ejemplos de contenido 
                    que puedes crear <strong className="text-purple-600">hoy mismo</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-purple-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Accede a tu Dashboard y genera tu plan de 7 días
                  </h3>
                  <p className="text-sm text-gray-600">
                    Un plan de publicación completo con qué grabar, qué editar y qué publicar cada día. 
                    <strong className="text-purple-600"> Copy-paste a Notion y ejecuta.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold shadow-lg"
                onClick={() => window.location.href = getAppUrl("/onboarding")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Empezar mi onboarding ahora
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-xl mb-8">
          <CardContent className="pt-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Únete a la comunidad
                  </h3>
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    150+ creadores activos
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">
                  Más de 150 creadores están compartiendo qué funciona, pidiendo feedback y 
                  celebrando wins en Discord. <strong>Acceso de por vida incluido.</strong>
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={() => window.open(BRAND.discord, '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Unirme a Discord ahora
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200">
          <CardContent className="pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              Qué puedes esperar
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Email de confirmación:</strong> Llegará en menos de 2 minutos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Invitación a Discord:</strong> Link exclusivo para la comunidad
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Acceso al curso:</strong> Los 8 módulos disponibles desde hoy
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Dashboard gratis 90 días:</strong> Después $19/mes opcional
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Preguntas? Escríbenos a{" "}
            <a 
              href={`mailto:${BRAND.email}`}
              className="text-purple-600 hover:underline font-medium"
            >
              {BRAND.email}
            </a>
          </p>
          <p className="text-sm text-gray-500">
            {BRAND.fullName} · {BRAND.principles.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
