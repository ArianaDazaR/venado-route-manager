import { MapPin, Sparkles, CloudDownload, ChevronRight, Navigation, Layers } from "lucide-react";
import { AppHeader, DateChip } from "../AppHeader";

const STOPS = [
  { x: 12, y: 60 }, { x: 22, y: 35 }, { x: 38, y: 35 },
  { x: 35, y: 60 }, { x: 45, y: 75 }, { x: 55, y: 75 },
  { x: 62, y: 60 }, { x: 75, y: 35 }, { x: 85, y: 40 }, { x: 88, y: 55 },
];

export function MiRuta() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <AppHeader />
      <DateChip text="Lunes, 20 de mayo" />

      <div className="px-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Mi ruta de hoy</h2>
        </div>
        <p className="ml-8 text-sm text-muted-foreground">Ruta más eficiente · 10 visitas programadas</p>
      </div>

      <div className="mx-5 overflow-hidden rounded-3xl border border-border shadow-sm">
        <div className="relative h-56 bg-[linear-gradient(135deg,#dbeafe,#ecfdf5_40%,#fef3c7)]">
          {/* fake streets */}
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 14} x2="100" y2={i * 14} stroke="#94a3b8" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={i * 14} y1="0" x2={i * 14} y2="100" stroke="#94a3b8" strokeWidth="0.3" />
            ))}
            <line x1="50" y1="0" x2="50" y2="100" stroke="#fbbf24" strokeWidth="0.8" />
          </svg>

          {/* route line */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={STOPS.slice(0, 9).map((s) => `${s.x},${s.y}`).join(" ")}
              fill="none"
              stroke="#0B33A2"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>

          {/* numbered pins */}
          {STOPS.slice(0, 9).map((s, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-primary text-[10px] font-bold text-primary"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: 20, height: 20, lineHeight: "16px", textAlign: "center" }}
            >
              {i + 1}
            </div>
          ))}

          {/* inicio / fin */}
          <div className="absolute left-2 top-[68%] rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">Inicio</div>
          <div className="absolute right-3 top-[60%] rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">Fin</div>

          <button className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow"><Navigation className="h-4 w-4 text-primary" /></button>
          <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow"><Layers className="h-4 w-4 text-primary" /></button>
        </div>
      </div>

      <div className="mx-5 flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-foreground">Ruta optimizada</div>
          <div className="text-xs text-muted-foreground">Hemos calculado la ruta más eficiente para ahorrar tiempo y distancia.</div>
        </div>
        <button className="flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-primary shadow-sm">
          Ver detalle <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-5 flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CloudDownload className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-foreground">Datos sincronizados</div>
          <div className="text-xs text-muted-foreground">Última sincronización: Hoy 9:30 AM</div>
        </div>
        <ChevronRight className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}
