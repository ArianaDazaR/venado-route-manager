import { Map, ClipboardList, Plus, History, User, LayoutDashboard, Users, BarChart3, Sparkles } from "lucide-react";

interface Tab { id: string; label: string; icon: any; primary?: boolean }

const REPONEDOR_TABS: Tab[] = [
  { id: "ruta", label: "Mi ruta", icon: Map },
  { id: "visitas", label: "Visitas", icon: ClipboardList },
  { id: "nueva", label: "Nueva visita", icon: Plus, primary: true },
  { id: "historial", label: "Historial", icon: History },
  { id: "perfil", label: "Perfil", icon: User },
];

const SUPERVISOR_TABS: Tab[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "equipo", label: "Equipo", icon: Users },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
  { id: "ia", label: "IA Soluciones", icon: Sparkles },
];

export function BottomNav({ role, active, onChange }: { role: "reponedor" | "supervisor"; active: string; onChange: (id: string) => void }) {
  const tabs = role === "reponedor" ? REPONEDOR_TABS : SUPERVISOR_TABS;
  return (
    <div className="sticky bottom-0 z-30 border-t border-border bg-surface/95 px-2 pb-3 pt-2 backdrop-blur">
      <div className="flex items-end justify-around">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          if (t.primary) {
            return (
              <button key={t.id} onClick={() => onChange(t.id)} className="flex flex-col items-center -mt-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-1 text-[11px] font-medium text-muted-foreground">{t.label}</span>
              </button>
            );
          }
          return (
            <button key={t.id} onClick={() => onChange(t.id)} className="flex flex-1 flex-col items-center gap-1 py-1">
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[11px] ${isActive ? "font-semibold text-primary" : "text-muted-foreground"}`}>{t.label}</span>
              {isActive && <div className="h-0.5 w-6 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
