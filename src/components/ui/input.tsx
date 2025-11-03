import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[48px] w-full rounded-xl border-[1.5px] border-[var(--cc-border)] bg-[var(--cc-field-bg)] px-4 py-3.5 text-[var(--cc-text)] outline-none transition-all duration-150",
          "placeholder:text-[var(--cc-placeholder)]",
          "hover:border-[var(--cc-border-hover)]",
          "focus:border-[var(--cc-violet)] focus:shadow-[0_0_0_2px_white,0_0_0_4px_rgba(124,58,237,0.35),0_0_0_8px_rgba(236,72,153,0.25)]",
          "disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:border-[#E2E8F0] disabled:text-[#94A3B8]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--cc-text)]",
          "aria-[invalid=true]:border-[var(--cc-error)] aria-[invalid=true]:bg-[var(--cc-error-bg)] aria-[invalid=true]:shadow-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
