"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks/use-in-view";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay }: RevealProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:translate-y-2 motion-safe:opacity-0 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
        inView && "motion-safe:translate-y-0 motion-safe:opacity-100",
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
}

export function RevealGroup({ children, className, staggerMs = 30 }: RevealGroupProps) {
  const { ref, inView } = useInView();
  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={cn(
            "motion-safe:translate-y-2 motion-safe:opacity-0 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
            inView && "motion-safe:translate-y-0 motion-safe:opacity-100"
          )}
          style={{ transitionDelay: `${i * staggerMs}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
