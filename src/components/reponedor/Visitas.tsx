import { Map as MapIcon, Timer, Flag, ClipboardList, ArrowLeftRight, Store, Play, MapPin, Lock, Check, Info, CloudDownload, ChevronRight } from "lucide-react";
import { AppHeader, DateChip } from "../AppHeader";
import { useStore } from "@/lib/store";

export function Visitas({ onStart }: { onStart: (visitId: number) => void }) {
  const { visits } = useStore();
  const completed = visits.filter((v) => v.status === "completed").length;

  return (
    <div className="flex flex-col gap-5 pb-6">
      <AppHeader />
      <DateChip text="Lunes, 20 de mayo" />

      <div className="mx-5 rounded-2xl bg-surface p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <Stat icon={MapIcon} label="Distancia total" value="18.6 km" />
          <div className="h-12 w-px bg-border" />
          <Stat icon={Timer} label="Tiempo estimado" value="4h 15m" />
          <div className="h-12 w-px bg-border" />
          <div className="flex-1 pl-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft"><Flag className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Progreso del día</div>
                <div className="text-lg font-bold"><span className="text-foreground">{completed}</span> / 10</div>
              </div>
            </div>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded ${i < completed ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white"><ClipboardList className="h-5 w-5" /></div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Mis visitas de hoy</h2>
              <p className="text-xs text-muted-foreground">Tienes 10 visitas programadas</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeftRight className="h-4 w-4 text-primary" />
            <span>Desliza para ver<br />todas tus visitas</span>
          </div>
        </div>
      </div>

      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-5 pb-2">
        {visits.map((v) => (
          <VisitCard key={v.id} v={v} onStart={() => onStart(v.id)} />
        ))}
      </div>

      <div className="mx-5 flex items-start gap-3 rounded-2xl bg-primary-soft p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"><Info className="h-5 w-5" /></div>
        <div className="flex-1 text-xs text-muted-foreground">
          Completa todas tus microtareas y sube evidencia en cada visita para alcanzar el 100% de cumplimiento.
        </div>
        <ChevronRight className="h-5 w-5 text-primary" />
      </div>

      <div className="mx-5 flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
        <CloudDownload className="h-6 w-6 text-primary" />
        <div className="flex-1">
          <div className="font-bold text-sm">Datos sincronizados</div>
          <div className="text-xs text-muted-foreground">Última sincronización: Hoy 9:30 AM</div>
        </div>
        <ChevronRight className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="flex-1 pr-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft"><Icon className="h-5 w-5 text-primary" /></div>
      <div className="mt-2 text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}

function VisitCard({ v, onStart }: { v: any; onStart: () => void }) {
  const isActive = v.status === "ready" || v.status === "in_progress";
  const isCompleted = v.status === "completed";
  const isLocked = v.status === "locked";

  return (
    <div
      className={`w-[230px] shrink-0 rounded-2xl border bg-surface p-4 shadow-sm ${
        isActive ? "border-primary ring-2 ring-primary/30" : "border-border"
      } ${isLocked ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
          isActive || isCompleted ? "bg-primary text-white" : "bg-primary-soft text-primary"
        }`}>{v.id}</div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft"><Store className="h-4 w-4 text-primary" /></div>
      </div>
      <div className="mt-3 font-bold leading-tight text-foreground">{v.clientName}</div>
      <div className="mt-3 flex items-start gap-1 text-xs text-muted-foreground">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{v.address}<br />La Paz, Bolivia</span>
      </div>
      <div className="mt-3 inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">Visita {v.id} de 10</div>
      {isActive && (
        <button onClick={onStart} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow active:scale-95">
          <Play className="h-4 w-4 fill-current" /> {v.status === "in_progress" ? "Continuar" : "Iniciar visita"}
        </button>
      )}
      {isCompleted && (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-success/10 py-2.5 text-sm font-semibold text-success">
          <Check className="h-4 w-4" /> Completada
        </div>
      )}
      {isLocked && (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-muted py-2.5 text-sm font-medium text-muted-foreground">
          <Lock className="h-4 w-4" /> Bloqueada
        </div>
      )}
    </div>
  );
}
