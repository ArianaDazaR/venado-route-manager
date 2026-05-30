import { Bell } from "lucide-react";
import { VenadoLogo } from "./VenadoLogo";
import { useStore } from "@/lib/store";

export function AppHeader({ subtitle, supervisor }: { subtitle?: string; supervisor?: boolean }) {
  const { userName, logout } = useStore();
  return (
    <div className="flex items-start justify-between px-5 pt-5">
      <VenadoLogo />
      <div className="flex items-center gap-3">
        <div className="text-right">
          {!supervisor && <div className="text-xs text-muted-foreground">¡Buenos días!</div>}
          <div className="text-base font-bold text-foreground leading-tight">{userName || "Juan Pérez"}</div>
          {supervisor && <div className="text-xs text-muted-foreground">Supervisor</div>}
        </div>
        <button className="relative">
          <Bell className="h-6 w-6 text-primary" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
        </button>
        <button onClick={logout} className="h-10 w-10 overflow-hidden rounded-full bg-primary ring-2 ring-primary/20">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white">
            {(userName || "JP").split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
        </button>
      </div>
    </div>
  );
}

export function DateChip({ text }: { text: string }) {
  return (
    <div className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-medium text-primary">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
      {text}
    </div>
  );
}
