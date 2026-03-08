import { cn } from "@/lib/utils";

// ── Headings ──

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function PageTitle({ children, className, as: Tag = "h1" }: HeadingProps) {
  return (
    <Tag className={cn("text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl", className)}>
      {children}
    </Tag>
  );
}

export function SectionTitle({ children, className, as: Tag = "h2" }: HeadingProps) {
  return (
    <Tag className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", className)}>
      {children}
    </Tag>
  );
}

export function CardTitle({ children, className, as: Tag = "h3" }: HeadingProps) {
  return (
    <Tag className={cn("text-lg font-semibold leading-snug sm:text-xl", className)}>
      {children}
    </Tag>
  );
}

export function Subtitle({ children, className, as: Tag = "h4" }: HeadingProps) {
  return (
    <Tag className={cn("text-base font-medium", className)}>
      {children}
    </Tag>
  );
}

// ── Body text ──

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function BodyLarge({ children, className }: TextProps) {
  return (
    <p className={cn("text-base leading-relaxed text-foreground sm:text-lg", className)}>
      {children}
    </p>
  );
}

export function Body({ children, className }: TextProps) {
  return (
    <p className={cn("text-sm leading-relaxed text-foreground", className)}>
      {children}
    </p>
  );
}

export function BodySmall({ children, className }: TextProps) {
  return (
    <p className={cn("text-xs leading-normal text-foreground", className)}>
      {children}
    </p>
  );
}

// ── Muted / secondary text ──

export function Muted({ children, className }: TextProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function MutedSmall({ children, className }: TextProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {children}
    </p>
  );
}

// ── Labels / overlines ──

export function Label({ children, className }: TextProps) {
  return (
    <span className={cn("text-xs font-semibold uppercase tracking-wider text-muted-foreground", className)}>
      {children}
    </span>
  );
}
