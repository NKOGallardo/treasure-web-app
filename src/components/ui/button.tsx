import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "ghost"
  | "link"
  | "gold"
  | "luxe"
  | "outlineLuxe";
type ButtonSize = "default" | "sm" | "lg" | "xl" | "icon";

const variantClass: Record<ButtonVariant, string> = {
  default: "btn--default",
  ghost: "btn--ghost",
  link: "btn--link",
  gold: "btn--gold",
  luxe: "btn--luxe",
  outlineLuxe: "btn--outline-luxe",
};

const sizeClass: Record<ButtonSize, string> = {
  default: "",
  sm: "btn--sm",
  lg: "btn--lg",
  xl: "btn--xl",
  icon: "btn--icon",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn("btn", variantClass[variant], sizeClass[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
