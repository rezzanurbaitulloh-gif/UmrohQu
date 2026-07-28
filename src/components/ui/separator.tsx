"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentProps<"hr"> {
  orientation?: "horizontal" | "vertical";
}

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <hr
      data-slot="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-slate-200",
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
        className
      )}
      {...props}
    />
  );
}

export { Separator };