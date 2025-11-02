import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState("one_time");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const prices = {
    one_time: 499,
    earlybird: 379,
    two_pay: 279,
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "LATAM30") {
      setDiscount(0.3);
      toast.success("¡Beca LATAM aplicada! 30% de descuento");
    } else {
      toast.error("Código inválido");
    }
  };

  const calculatePrice = () => {
    const basePrice = plan === "one_time" ? prices.earlybird : prices.two_pay;
    return Math.round(basePrice * (1 - discount));
  };

  const handleCheckout = () => {
    toast.success("Redirigiendo a pago seguro...");
    setTimeout(() => navigate("/thanks"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading gradient-text mb-4">
            Finalizar inscripción
          </h1>
          <p className="text-muted-foreground">
            Elige tu plan y completa el pago seguro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-heading mb-6">Plan de pago</h2>
            
            <RadioGroup value={plan} onValueChange={setPlan} className="space-y-4">
              <Card className={`p-6 cursor-pointer transition-all ${plan === "one_time" ? "border-primary shadow-glow" : ""}`}>
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="one_time" id="one_time" />
                  <Label htmlFor="one_time" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg">Pago único</span>
                      <Shield className="w-4 h-4 text-success" />
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">
                      USD {prices.earlybird}
                    </p>
                    <p className="text-sm text-muted-foreground line-through mb-2">
                      USD {prices.one_time}
                    </p>
                    <p className="text-sm text-success font-medium">
                      ✓ Con garantía de resultados
                    </p>
                  </Label>
                </div>
              </Card>

              <Card className={`p-6 cursor-pointer transition-all ${plan === "two_pay" ? "border-primary shadow-glow" : ""}`}>
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="two_pay" id="two_pay" />
                  <Label htmlFor="two_pay" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-lg mb-2">2 pagos</div>
                    <p className="text-2xl font-bold text-primary mb-2">
                      USD {prices.two_pay} × 2
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sin garantía de reembolso
                    </p>
                  </Label>
                </div>
              </Card>
            </RadioGroup>

            <div className="mt-6">
              <Label className="text-sm mb-2 block">¿Tienes un código de descuento?</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ej: LATAM30"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="rounded-xl"
                />
                <Button onClick={applyCoupon} variant="outline" className="rounded-xl">
                  Aplicar
                </Button>
              </div>
            </div>
          </Card>

          <div>
            <Card className="glass-card p-8 mb-6">
              <h2 className="text-2xl font-heading mb-6">Resumen</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan seleccionado:</span>
                  <span className="font-semibold">
                    {plan === "one_time" ? "Pago único" : "2 pagos"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio base:</span>
                  <span>USD {plan === "one_time" ? prices.earlybird : prices.two_pay}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Descuento ({discount * 100}%):</span>
                    <span>-USD {Math.round((plan === "one_time" ? prices.earlybird : prices.two_pay) * discount)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">USD {calculatePrice()}</span>
                </div>
                {plan === "two_pay" && (
                  <p className="text-xs text-muted-foreground">
                    * Primer pago hoy, segundo pago en 30 días
                  </p>
                )}
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-xl mb-4"
                onClick={handleCheckout}
              >
                <CreditCard className="mr-2 w-5 h-5" />
                Proceder al pago
              </Button>

              {plan === "one_time" && (
                <div className="bg-success/10 rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Este plan incluye nuestra garantía de resultados
                  </p>
                </div>
              )}
            </Card>

            <Card className="glass-card p-6 text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Términos importantes:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>La garantía aplica solo al plan de pago único</li>
                <li>El plan en 2 pagos no es elegible a reembolso</li>
                <li>Acceso inmediato tras confirmación de pago</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
