import { cn } from "@/lib/utils";
import { TYPOGRAPHY } from "@/lib/design-system";

interface PageHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string;
  gradient?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  gradient = false,
  children,
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn("page-header", className)}>
      <h1 className={cn(
        TYPOGRAPHY.pageTitle,
        gradient && TYPOGRAPHY.gradientText,
        "mb-3"
      )}>
        {title}
      </h1>
      {subtitle && (
        <p className={cn(TYPOGRAPHY.pageSubtitle, "mb-6")}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};
