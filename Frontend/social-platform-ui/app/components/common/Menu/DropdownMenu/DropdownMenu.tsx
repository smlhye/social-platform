"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export default function DropdownMenu({
  trigger,
  children,
  align = "left",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="cursor-pointer select-none"
      >
        {trigger}
      </button>

      {open && (
        <div
          className={`
                        absolute mt-2 min-w-[160px]
                        rounded-md border border-border
                        bg-background shadow-lg z-50
                        ${align === "left" ? "left-0" : "right-0"}
                    `}
        >
          {children}
        </div>
      )}
    </div>
  );
}
