import { Menu, Bell, ChevronDown, MapPin, Users, Clock, Share2, AlertTriangle, TrendingUp, ChevronRight, FileDown } from "lucide-react";
import { VenadoLogo } from "../VenadoLogo";
import { useStore } from "@/lib/store";
import { exportWeeklyReport } from "@/lib/reportPdf";
import { toast } from "sonner";

export function SupHeader() {
  const { userName } = useStore();
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-3">
        <Menu className="h-6 w-6 text-foreground" />
        <VenadoLogo />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Bell className="h-6 w-6 text-primary" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">3</span>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70" />
        <div className="text-sm">
          <div className="font-bold leading-tight">{userName || "Juan Pérez"}</div>
          <div className="text-xs text-muted-foreground">Supervisor</div>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <SupHeader />
      <div className="px-5">
        <div className="text-sm">¡Buenos días!</div>
        <h1 className="text-3xl font-extrabold text-foreground">Juan Pérez</h1>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-sm text-primary">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          Lunes, 20 de mayo
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5">
        <Kpi icon={MapPin} color="text-success" label="Cobertura actual" value="185 / 220" sub="PDV visitados" extra="84%" />
        <Kpi icon={Users} color="text-primary" label="Reponedores activos" value="18 / 20" sub="activos" />
        <Kpi icon={Clock} color="text-purple-500" label="Tiempo promedio" value="24.3 min" sub="por visita" />
        <Kpi icon={Share2} color="text-orange-500" label="Distancia promedio" value="18.6 km" sub="recorridos" />
      </div>

      <div className="px-5">
        <div className="text-sm font-bold text-foreground">Mapa de densidad de PDV - La Paz</div>
        <div className="mt-2 relative overflow-hidden rounded-2xl h-60 bg-[radial-gradient(circle_at_30%_40%,#fb923c,transparent_25%),radial-gradient(circle_at_60%_50%,#22c55e,transparent_25%),radial-gradient(circle_at_50%_70%,#ef4444,transparent_25%),radial-gradient(circle_at_20%_60%,#eab308,transparent_25%),linear-gradient(135deg,#0c4a6e,#1e293b)]">
          {Array.from({ length: 18 }).map((_, i) => {
            const colors = ["bg-success", "bg-warning", "bg-destructive"];
            const c = colors[i % 3];
            return (
              <div key={i} className={`absolute h-3 w-3 rounded-full ring-2 ring-white ${c}`} style={{ left: `${10 + (i * 17) % 80}%`, top: `${15 + (i * 23) % 70}%` }} />
            );
          })}
          <div className="absolute left-1/2 top-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-xs">🏠</div>
            <div className="mt-1 rounded-md bg-white/90 px-2 text-xs font-bold text-foreground">La Paz</div>
          </div>
          <div className="absolute left-3 bottom-3 rounded-lg bg-black/60 p-2 text-[10px] text-white">
            <div className="font-bold mb-1">Leyenda</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> PDV atendidos</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> En proceso</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" /> Pendientes</div>
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="flex justify-between"><div className="font-bold">Alertas inteligentes</div><button className="text-sm text-primary">Ver todas ›</button></div>
        <div className="mt-2 space-y-2">
          {[
            { c: "bg-destructive", t: "Juan Pérez", s: "35 min promedio (+7 min sobre lo esperado)", time: "10:24 a.m." },
            { c: "bg-warning", t: "Zona Sur", s: "12 PDV pendientes", time: "10:15 a.m." },
            { c: "bg-warning", t: "Ruta 5", s: "Sobrecarga operativa", time: "09:58 a.m." },
            { c: "bg-destructive", t: "Mayorista San José", s: "Inventario crítico", time: "09:40 a.m." },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-surface p-3 shadow-sm">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${a.c}`}><AlertTriangle className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="text-sm font-bold">{a.t}</div>
                <div className="text-xs text-muted-foreground">{a.s}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.time}</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, color, label, value, sub, extra }: any) {
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-2"><Icon className={`h-5 w-5 ${color}`} /><div className="text-xs text-muted-foreground">{label}</div></div>
      <div className="mt-2 text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      {extra && <div className="mt-1 text-sm font-bold text-success">{extra}</div>}
    </div>
  );
}
