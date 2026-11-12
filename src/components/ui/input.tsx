import * as React from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Input 컴포넌트 구조
function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border-[3px] border-border bg-surface px-3 text-base outline-none placeholder:text-black/40 focus:shadow-brutal-sm aria-invalid:border-danger",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-20 w-full rounded-xl border-[3px] border-border bg-surface px-3 py-2 text-base outline-none placeholder:text-black/40 focus:shadow-brutal-sm",
        className,
      )}
      {...props}
    />
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-bold", className)} {...props} />;
}

export { Input, Textarea, Label };
