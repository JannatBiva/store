"use client";
import { Menu } from "lucide-react";

export default function ToggleSidebarButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("sidebar:toggle"))}
      className="grid h-9 w-9 place-items-center rounded-full border bg-white/80 hover:bg-white shadow-sm"
      aria-label="Toggle sidebar"
      title="Toggle sidebar"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
