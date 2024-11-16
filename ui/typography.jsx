import { cn } from "../../lib/utils";

export function TypographyH1({ children, className, ...props }) {
  return (
    <h1
      {...props}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className, ...props }) {
  return (
    <h2
      {...props}
      className={cn("scroll-m-20 text-3xl font-semibold first:mt-0", className)}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className, ...props }) {
  return (
    <h3
      {...props}
      className={cn("scroll-m-20 text-2xl font-semibold", className)}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className, ...props }) {
  return (
    <h4
      {...props}
      className={cn("scroll-m-20 text-xl font-semibold", className)}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className, ...props }) {
  return (
    <p {...props} className={cn("leading-7", className)}>
      {children}
    </p>
  );
}

export function TypographyBlockquote({ children }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographyMuted({ children, className, ...props }) {
  return (
    <p {...props} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
