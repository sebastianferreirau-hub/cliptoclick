import { Card } from "@/components/ui/card";
import { Instagram, Video, TrendingUp } from "lucide-react";

const SocialProof = () => {
  const items = [
    { platform: "Instagram", handle: "@ferenloscielos", metric: "Reels virales", icon: Instagram },
    { platform: "TikTok", handle: "@mariaclaudiaql", metric: "+seguidores", icon: Video },
    { platform: "Snapchat", handle: "@sebasferreirauu", metric: "Spotlight", icon: TrendingUp },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          +363M vistas en 3 meses
        </h2>
        <p className="text-xs text-muted-foreground/70 text-center mb-12">
          *Resultados de casos reales. Tus resultados dependen de consistencia y ejecución.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="glass-card p-8 text-center hover:shadow-elegant transition-all">
                <div className="p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.platform}</h3>
                <p className="text-muted-foreground mb-2">{item.handle}</p>
                <p className="text-sm text-primary font-medium">{item.metric}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
