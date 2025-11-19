import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { COPY } from "@/lib/constants";

const GuaranteeBox = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="glass-card p-8 md:p-12 border-success/20">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-xl bg-success/10 flex-shrink-0">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-4">{COPY.guarantee.title}</h3>
              <p className="text-lg mb-4">
                {COPY.guarantee.description}
              </p>
              {COPY.guarantee.detailsList.map((detail, index) => (
                <p key={index} className="text-sm mb-2">
                  {detail}
                </p>
              ))}
              <p className="text-sm text-muted-foreground mt-4 mb-4">
                {COPY.guarantee.reasoning}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {COPY.guarantee.disclaimer}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default GuaranteeBox;
