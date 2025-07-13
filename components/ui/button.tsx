import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-[0.98] transition-transform duration-100",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:scale-[0.98] transition-transform duration-100",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-transparent dark:border-input dark:hover:bg-input/50 active:scale-[0.98] transition-transform duration-100",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:scale-[0.98] transition-transform duration-100",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:scale-[0.98] transition-transform duration-100",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-green-600 text-white shadow-xs hover:bg-green-700 active:scale-[0.98] transition-transform duration-100",
        warning:
          "bg-amber-500 text-white shadow-xs hover:bg-amber-600 active:scale-[0.98] transition-transform duration-100",
        info: "bg-blue-500 text-white shadow-xs hover:bg-blue-600 active:scale-[0.98] transition-transform duration-100",
        gradient:
          "bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 active:scale-[0.98] transition-transform duration-100",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 active:scale-[0.98] transition-transform duration-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        xl: "h-12 rounded-md text-base px-8",
        icon: "size-9 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
        pill: "h-9 px-5 py-2 rounded-full",
        "pill-sm": "h-8 px-4 py-1.5 rounded-full gap-1.5 text-xs",
        "pill-lg": "h-10 px-6 py-2.5 rounded-full text-base",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
        ping: "animate-ping",
      },
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
      iconPosition: "left",
      shadow: "none",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof buttonVariants>, "animation" | "iconPosition"> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animation?: "none" | "pulse" | "bounce" | "ping"; // Exclude "spin" from the public API to avoid conflicts
  fullWidth?: boolean;
  iconPosition?: "left" | "right"; // Add this to control icon position when both icons are present
}

function Button({
  className,
  variant,
  size,
  shadow,
  asChild = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  animation = "none",
  fullWidth = false,
  iconPosition: userIconPosition,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  // Determine the effective icon position
  // 1. Use user-specified position if provided
  // 2. If only rightIcon is present, use "right"
  // 3. Default to "left" in all other cases
  const effectiveIconPosition =
    userIconPosition ||
    (rightIcon && !leftIcon && !isLoading ? "right" : "left");

  // Create classes for the button component
  const buttonClasses = cn(
    buttonVariants({
      variant,
      size,
      animation: (animation as any) === "spin" ? "none" : animation, // prevent conflicts with loading spinner
      iconPosition: effectiveIconPosition,
      shadow,
      className,
    }),
    fullWidth && "w-full"
  );

  // Render order based on the effective icon position
  const renderLeftContent = () => {
    if (effectiveIconPosition === "right") {
      return props.children;
    }
    return isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon;
  };

  const renderMiddleContent = () => {
    if (effectiveIconPosition === "right" || effectiveIconPosition === "left") {
      if (effectiveIconPosition === "right") {
        return isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          rightIcon
        );
      } else {
        return props.children;
      }
    }
    return null;
  };

  const renderRightContent = () => {
    if (effectiveIconPosition === "left") {
      return rightIcon;
    }
    return null;
  };

  return (
    <Comp
      data-slot="button"
      className={buttonClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {renderLeftContent()}
      {renderMiddleContent()}
      {renderRightContent()}
    </Comp>
  );
}

export { Button, buttonVariants };
