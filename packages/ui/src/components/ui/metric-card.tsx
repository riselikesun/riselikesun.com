"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Copy, Check } from "../icons"
import { Card } from "./card"
import { Button } from "./button"
import { Slot } from "radix-ui"

const metricCardVariants = cva(
  "group relative overflow-hidden transition-all duration-300 rounded-[20px]",
  {
    variants: {
      variant: {
        default: "bg-foreground/[0.03] border-border hover:border-primary/40 hover:bg-foreground/[0.05]",
        featured: "bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:border-primary/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface MetricCardProps extends React.ComponentProps<"div">, VariantProps<typeof metricCardVariants> {
  /** Optional icon displayed in the top-left corner. */
  icon?: React.ReactNode;
  /** The descriptive title for the metric. */
  label: string;
  /** The primary value to display. */
  value: string;
  /** If true, displays an external link arrow icon next to the value. */
  showExternalIcon?: boolean;
  /** Optional Tailwind text color class for the icon (e.g. `text-sky-300`). */
  accent?: string;
  /** If provided, displays a copy icon button at the top right to copy the link or value. */
  copyLink?: boolean | string;
  /** If true, merges the component onto its immediate child via Radix Slot. */
  asChild?: boolean;
}


/**
 * Display component for numeric or text metrics.
 * Acts as a wrapper and can be rendered as a custom element or link using the `asChild` prop.
 */
const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps & { showExternalIcon?: boolean }>(
  ({ className, variant, icon, label, value, accent, showExternalIcon, copyLink, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div";
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = typeof copyLink === 'string' ? copyLink : value;
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }, [value, copyLink]);

    return (
      <Comp
        className={cn("block focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-[20px]", className)}
        {...props}
      >
        <Card ref={ref} padding="none" className={cn(metricCardVariants({ variant }), "h-full relative")}>
          {copyLink && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="absolute right-4 top-4 z-10"
              aria-label="Copy to clipboard"
              title="Copy to clipboard"
            >
              {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          )}
          <div className="flex flex-col h-full p-5">
            <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start sm:gap-6">
              {icon && (
                <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-foreground/4">
                  <div className={cn("flex items-center justify-center [&_svg]:size-5", accent || "text-foreground")}>
                    {icon}
                  </div>
                </div>
              )}
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-lg font-medium text-foreground">{value}</span>
              {showExternalIcon && (
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              )}
            </div>
          </div>
        </Card>
      </Comp>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }
