import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  CheckCircle2, 
  Sparkles, 
  Lock,
  CreditCard
} from "lucide-react";
import { BRAND, PRICING } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const basePrice = PRICING.course.price;
  const finalPrice = basePrice - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "LATAM30") {
      setDiscount(Math.round(basePrice * 0.3));
      setAppliedCoupon("LATAM30");
      alert("✅ Beca LATAM aplicada - 30% de descuento");
    } else {
      alert("❌ Código inválido");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          plan: 'one_time',
          promo_code: appliedCoupon || undefined
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('❌ Error al procesar el pago. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {BRAND.name}
            </h1>
            <p className="text-sm text-gray-600">{BRAND.fullName}</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Finalizar inscripción
          </h2>
          <p className="text-lg text-gray-600">
            Completa tu pago seguro y empieza hoy mismo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Plan */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-purple-400 bg-gradient-to-br from-white to-purple-50 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Recomendado
                      </Badge>
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 mb-2">
                      Acceso completo
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      Todo incluido. Sin sorpresas.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-purple-600">
                      ${basePrice}
                    </div>
                    <p className="text-sm text-gray-600">Pago único</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Curso completo (8 módulos, 12 horas)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Quiz IA + Plan de 7 días generado</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Dashboard operativo (90 días gratis, después $19/mes opcional)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Plantilla Notion + recursos descargables</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Comunidad Discord (acceso de por vida)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Sesiones grupales de feedback (&lt;48h response)</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <strong>Dashboard gratis 90 días:</strong> Después puedes continuar con $19/mes (opcional) 
                    o usar solo el curso + Notion gratis.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Coupon */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  ¿Tienes un código promocional?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input 
                    type="text"
                    placeholder="Ingresa tu código"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1"
                    disabled={appliedCoupon !== null}
                  />
                  <Button 
                    onClick={handleApplyCoupon}
                    disabled={appliedCoupon !== null || !couponCode}
                    variant={appliedCoupon ? "secondary" : "default"}
                  >
                    {appliedCoupon ? "Aplicado ✓" : "Aplicar"}
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="mt-3 flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Código <strong>{appliedCoupon}</strong> aplicado exitosamente</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Garantía de 30 días incluida
                    </h4>
                    <p className="text-sm text-gray-700">
                      Completa el 70% del curso en 30 días y no estás satisfecho? 
                      Reembolso del 100%. Sin preguntas complicadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Resumen del pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {PRICING.course.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {PRICING.course.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-medium">${basePrice}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento ({appliedCoupon})</span>
                        <span className="font-medium">-${discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-purple-600">${finalPrice}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold shadow-lg"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Proceder al pago seguro
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Lock className="w-4 h-4" />
                      <span>SSL Seguro</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CreditCard className="w-4 h-4" />
                      <span>Stripe</span>
                    </div>
                  </div>

                  <p className="text-xs text-center text-gray-500">
                    Procesado de forma segura por Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = "/"}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Volver a la página principal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
