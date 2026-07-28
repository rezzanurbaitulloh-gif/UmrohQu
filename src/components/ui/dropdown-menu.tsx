"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function DropdownMenu({ open, onOpenChange, children }: DropdownMenuProps) {
  return <>{children}</>;
}

function DropdownMenuTrigger({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <button {...props}>
      {children}
    </button>
  );
}

function DropdownMenuContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "z-50 max-h-60 min-w-32 overflow-x-hidden overflow-y-auto rounded-lg bg-white p-1 text-slate-900 shadow-md ring-1 ring-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none hover:bg-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr className={cn("-mx-1 my-1 h-px bg-slate-200", className)} {...props} />
  );
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-1.5 py-1 text-xs font-medium text-slate-500", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("ml-auto text-xs text-slate-400", className)} {...props} />
  );
}

function DropdownMenuGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

function DropdownMenuRadioGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

function DropdownMenuCheckboxItem({ children, checked, ...props }: React.ComponentProps<"div"> & { checked?: boolean }) {
  return (
    <div className="relative flex items-center gap-2" {...props}>
      <CheckIcon className={cn("h-4 w-4", checked ? "opacity-100" : "opacity-0")} />
      {children}
    </div>
  );
}

function DropdownMenuRadioItem({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

function DropdownMenuSub({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

function DropdownMenuSubTrigger({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-slate-100" {...props}>
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </div>
  );
}

function DropdownMenuSubContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-auto min-w-36 rounded-lg bg-white p-1 text-slate-900 shadow-lg ring-1 ring-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};