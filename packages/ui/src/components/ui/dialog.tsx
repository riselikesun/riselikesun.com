"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { X } from "../icons"

// Tracks, in open order, the ids of dialogs currently participating in
// back-button handling. Only the top of the stack ever touches history —
// this keeps nested/stacked dialogs (e.g. a confirm dialog over a form
// dialog) from stepping on each other's popstate events.
let dialogHistoryStack: string[] = []

function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  closeOnBackButton = false,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & {
  /**
   * When true, pressing the device/browser back button closes the dialog
   * instead of navigating away. Opt-in: off by default so this component
   * doesn't surprise apps that manage their own history/routing.
   */
  closeOnBackButton?: boolean
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : internalOpen

  const id = React.useId()
  // True while we're closing *because* a popstate fired (real back press).
  // Lets the cleanup below tell "user pressed back" apart from "dialog
  // closed some other way" so it doesn't double-consume history entries.
  const isPoppingRef = React.useRef(false)

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  const handleOpenChangeRef = React.useRef(handleOpenChange)
  React.useEffect(() => {
    handleOpenChangeRef.current = handleOpenChange
  }, [handleOpenChange])

  React.useEffect(() => {
    if (!closeOnBackButton || !open) return

    dialogHistoryStack.push(id)
    // No url argument -> the address bar / URL never changes. This entry
    // exists purely so the back button has something to intercept.
    window.history.pushState({ __dialog: id }, "")

    const handlePopState = () => {
      // Only the top-most dialog we pushed should respond to a given
      // back press; deeper dialogs stay open until it's their turn.
      if (dialogHistoryStack[dialogHistoryStack.length - 1] !== id) return
      dialogHistoryStack.pop()
      isPoppingRef.current = true
      handleOpenChangeRef.current(false)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)

      const idx = dialogHistoryStack.lastIndexOf(id)
      if (idx !== -1) dialogHistoryStack.splice(idx, 1)

      // Closed some way other than the back button (X, Escape, outside
      // click, programmatic close) while our entry was still the top of
      // the stack: consume it silently so it doesn't linger as a dead
      // no-op back-press later.
      if (!isPoppingRef.current && idx === dialogHistoryStack.length) {
        window.history.back()
      }
      isPoppingRef.current = false
    }
  }, [open, closeOnBackButton, id])

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={handleOpenChange}
      data-slot="dialog"
      {...props}
    />
  )
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-background/80 duration-200 backdrop-blur-md data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

const dialogContentVariants = cva(
  "fixed max-h-[90vh] top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-[24px] duration-200 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 shadow-2xl",
  {
    variants: {
      background: {
        default: "bg-popover backdrop-blur-xl text-popover-foreground border border-border",
        solid: "bg-[#0a0a0a] border-white/10 text-slate-200 border",
        dark: "bg-[#0a0a0a] border-white/10 text-slate-200 border",
        card: "bg-card border border-border text-card-foreground",
        glass: "bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 text-foreground",
        none: "",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        md: "p-6 sm:p-8",
        lg: "p-6 sm:p-10 md:p-12 lg:p-16",
        xl: "p-6 sm:p-10 md:p-12 lg:p-16",
      },
      width: {
        default: "sm:max-w-md",
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        "6xl": "sm:max-w-6xl",
        "7xl": "w-[95vw] sm:max-w-7xl",
        full: "w-[95vw] sm:max-w-[calc(100vw-4rem)]",
      },
    },
    defaultVariants: {
      background: "default",
      padding: "default",
      width: "default",
    },
  }
)

// Single source of truth for the inner scroll container's padding, so it
// can't drift out of sync with dialogContentVariants' own `padding` variant.
const dialogBodyPaddingClasses: Record<
  NonNullable<VariantProps<typeof dialogContentVariants>["padding"]>,
  string
> = {
  none: "p-0",
  sm: "p-4",
  default: "p-6",
  md: "p-6 sm:p-8",
  lg: "p-6 sm:p-10 md:p-12 lg:p-16",
  xl: "p-6 sm:p-10 md:p-12 lg:p-16",
}

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  background = "default",
  padding = "default",
  width = "default",
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-lenis-prevent="true"
        className={cn(dialogContentVariants({ background, padding: "none", width, className }), "overflow-hidden flex flex-col")}
        {...props}
      >
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 z-50 bg-background/50 backdrop-blur-md rounded-full shadow-sm hover:bg-background/80"
              size="icon-lg"
              cursor="pointer"
            >
              <X/>
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
        <div className={cn("flex-1 overflow-y-auto grid gap-6", dialogBodyPaddingClasses[padding ?? "default"])}>
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
}