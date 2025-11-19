import { cn } from "@/lib/utils";
import { TYPOGRAPHY } from "@/lib/design-system";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  gradient = false,
  className 
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      <h2 className={cn(
        TYPOGRAPHY.sectionTitle,
        gradient && TYPOGRAPHY.gradientText,
        "mb-3"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={TYPOGRAPHY.sectionSubtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
