"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export default function LoadingSpinner({
  size = 24,
  className = "",
  text,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className="animate-spin text-primary" size={size} />
      {text && <span className="text-sm text-slate-600">{text}</span>}
    </div>
  );
}