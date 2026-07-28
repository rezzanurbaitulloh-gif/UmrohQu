"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm" | "lg";
}

function Avatar({ className, size = "default", ...props }: AvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    default: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div
      data-slot="avatar"
      data-size={size}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-sm text-slate-600",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2", className)}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-badge"
      className={cn(
        "absolute bottom-0 right-0 inline-flex items-center justify-center rounded-full bg-emerald-600 text-xs text-white ring-2 ring-white",
        className
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarBadge,
};