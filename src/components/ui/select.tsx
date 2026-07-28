"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

function Select({ value, onValueChange, children, ...props }: React.ComponentProps<"div"> & { value?: string; onValueChange?: (value: string) => void }) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div {...props}>{children}</div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-1", className)} {...props} />;
}

function SelectValue({ className, placeholder, ...props }: React.ComponentProps<"span"> & { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return <span className={cn("flex flex-1 text-left", className)} {...props}>{value || placeholder || "Pilih..."}</span>;
}

function SelectTrigger({ className, size = "default", children, ...props }: React.ComponentProps<"button"> & { size?: "sm" | "default" }) {
  const [open, setOpen] = React.useState(false);
  const { value, onValueChange } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm whitespace-nowrap transition-colors hover:bg-slate-50",
        className
      )}
      onClick={() => {
        const next = !open;
        setOpen(next);
        if (!next && onValueChange && value === undefined) {
          onValueChange("");
        }
      }}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 text-slate-500" />
    </button>
  );
}

function SelectContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative z-50 max-h-60 min-w-36 overflow-x-hidden overflow-y-auto rounded-md bg-white p-1 text-slate-900 shadow-md ring-1 ring-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectItem({ className, children, value, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext);

  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-slate-100",
        selectedValue === value && "bg-slate-100",
        className
      )}
      onClick={() => onValueChange?.(value)}
      {...props}
    >
      <span className="flex flex-1">{children}</span>
      {selectedValue === value && <CheckIcon className="h-4 w-4" />}
    </div>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-2 py-1.5 text-xs text-slate-500", className)} {...props} />;
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return <hr className={cn("-mx-1 my-1 h-px bg-slate-200", className)} {...props} />;
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
};