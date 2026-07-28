"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Map path segments to display names
  const segmentNames: Record<string, string> = {
    admin: "Admin",
    dashboard: "Dashboard",
    users: "Users",
    vendors: "Vendors",
    packages: "Packages",
    finance: "Finance",
    settings: "Settings",
  };

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const displayName = segmentNames[segment] || segment;
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

        return (
          <div key={segment} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-3 w-3" />}
            {isLast ? (
              <span className="text-slate-900 dark:text-slate-50 font-medium">{displayName}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}