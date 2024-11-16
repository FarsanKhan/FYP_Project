import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

const Textarea = React.forwardRef(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div>
        {label && <Label className="mb-1">{label}</Label>}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className={cn("text-sm font-medium text-destructive")}>{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
