import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle2 } from "lucide-react";
import { COPY, TYPOGRAPHY, CARD_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GuaranteeBox = () => {
  return (
    <section className="section">
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <Card className={cn(CARD_STYLES.primary)}>
            <CardHeader className="text-center border-b border-green-200 bg-green-50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className={cn(TYPOGRAPHY.sectionTitle)}>
                {COPY.guarantee.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-700 mb-6 text-center")}>
                {COPY.guarantee.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {COPY.guarantee.detailsList.map((detail: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className={cn(TYPOGRAPHY.body, "text-gray-700")}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className={cn(TYPOGRAPHY.bodySmall, "text-blue-900")}>
                  <strong>Por qué pedimos esto:</strong> {COPY.guarantee.disclaimer}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeBox;
