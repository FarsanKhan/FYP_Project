import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";
import { FaMinusCircle } from "react-icons/fa";

const Input = React.forwardRef(
  ({ className, type, error, label, left, right, ...props }, ref) => {
    return (
      <div>
        {label && <Label className="mb-1">{label}</Label>}
        <div className="relative">
          {left}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          {right}
        </div>
        {error && (
          <div className="mt-1 flex items-center">
            <FaMinusCircle className="text-red-600" size="0.775em" />
            <p className={cn("ml-1 text-xs text-red-600")}>{error}</p>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
