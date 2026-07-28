"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<"input">) {
  const numMin = Number(min);
  const numMax = Number(max);
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [numMin, numMax];

  const minVal = Number(_values[0] ?? numMin);
  const maxVal = Number(_values[1] ?? numMax);

  if (_values.length === 2) {
    const left = ((minVal - numMin) / (numMax - numMin)) * 100;
    const width = ((maxVal - minVal) / (numMax - numMin)) * 100;

    return (
      <div className={cn("relative w-full", className)} {...props}>
        <div className="relative h-2 w-full rounded-full bg-slate-200">
          <div
            className="absolute h-full rounded-full bg-emerald-600"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        </div>
        <input
          type="range"
          min={numMin}
          max={numMax}
          value={minVal}
          readOnly
          className="absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600"
        />
      </div>
    );
  }

  return (
    <input
      type="range"
      min={numMin}
      max={numMax}
      value={minVal}
      className={cn(
        "w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600",
        className
      )}
      {...props}
    />
  );
}

export { Slider };