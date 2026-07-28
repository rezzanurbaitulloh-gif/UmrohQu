"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

const TabsContext = React.createContext<TabsContextValue>({
  value: "",
  onValueChange: () => {},
});

function Tabs({ defaultValue, value, onValueChange, children, className, ...props }: TabsProps & React.ComponentProps<"div">) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");

  const activeValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, value, children, ...props }: React.ComponentProps<"button"> & { value: string }) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext);
  const isActive = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-slot="tabs-trigger"
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex h-8 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, value, children, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const { value: selectedValue } = React.useContext(TabsContext);
  const isActive = selectedValue === value;

  if (!isActive) return null;

  return (
    <div
      data-slot="tabs-content"
      data-state={isActive ? "active" : "inactive"}
      className={cn("mt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };