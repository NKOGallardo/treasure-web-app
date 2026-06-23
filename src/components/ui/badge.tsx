import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn("badge", variant === "gold" && "badge--gold", className)} {...props} />
  );
}

export { Badge };
