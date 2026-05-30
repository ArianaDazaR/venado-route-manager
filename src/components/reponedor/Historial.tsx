import { Store, Calendar, Clock, ChevronRight, Eye, MapPin, Award, TrendingUp, Check, Camera } from "lucide-react";
import { AppHeader } from "../AppHeader";
import { useStore, fmtMin } from "@/lib/store";

export function Historial() {
  const { visits } = useStore();
  const completed = visits.filter((v) => v.status === "completed");

  return (
    <div className="flex flex-col gap-5 pb-6">
      <AppHeader />
      <div className="px-5">
        <h1 className="text-2xl font-bold text-foreground">Historial de visitas</h1>
        <p className="text-sm text-muted-foreground">Revisa tus actividades anteriores y el desempeño registrado.</p>
      </div>

      {completed.length === 0 && (
        <div className="mx-5 rounded-2xl bg-surface p-8 text-center text-sm text-muted-foreground shadow-sm">
          Aún no has completado visitas hoy. Inicia una visita desde la pestaña Visitas.
        </div>
      )}

      {completed.map((v) => {
        const completedTasks = v.tasks.filter((t) => t.status === "completed").length;
        const totalMin = Math.floor(v.totalSec / 60);
        const efficiency = Math.min(100, Math.round((30 * 60 / Math.max(v.totalSec, 1)) * 97));
        return (
          <div key={v.id} className="mx-5 rounded-2xl bg-surface p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white"><Store className="h-6 w-6" /></div>
              <div className="flex-1">
                <div className="text-lg font-bold text-foreground">{v.clientName}</div>
                <div className="text-xs text-muted-foreground">Código: {v.code}</div>
                <div className="mt-2 flex gap-2">
                  <span className="rounded bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">{v.type}</span>
                  <span className="text-xs text-muted-foreground">Zona: {v.zone}</span>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="flex items-center justify-end gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />Hoy</div>
                <div className="mt-1 flex items-center justify-end gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{totalMin} min</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-4 border-t border-border pt-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">Resumen de tareas</span>
                <span className="text-primary">{completedTasks} de 5 completadas</span>
              </div>
              <div className="mt-2 space-y-2">
                {v.tasks.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 text-xs">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">{t.id}</div>
                    <span className="flex-1 truncate text-foreground">{t.name}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{fmtMin(t.durationSec)}</span>
                    <span className="flex items-center gap-1 text-success"><Check className="h-3 w-3" />OK</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border pt-3">
              <Metric icon={Clock} label="Tiempo total" value={`${totalMin} min`} sub={`+${Math.abs(totalMin - 30)}%`} />
              <Metric icon={Check} label="Tareas" value={`${completedTasks}/5`} sub="100%" />
              <Metric icon={TrendingUp} label="Eficiencia" value={`${efficiency}%`} sub="Muy buena" />
              <Metric icon={Award} label="Calidad" value="A" sub="¡Excelente!" />
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-primary-soft p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white"><Camera className="h-5 w-5 text-primary" /></div>
              <div className="flex-1 text-xs">
                <div className="font-semibold">Evidencia capturada</div>
                <div className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />-16.5313, -68.0748</div>
              </div>
              <button className="flex items-center gap-1 rounded-lg border border-primary px-2 py-1.5 text-xs font-semibold text-primary"><Eye className="h-3 w-3" />Ver</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Metric({ icon: Icon, label, value, sub }: any) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft"><Icon className="h-4 w-4 text-primary" /></div>
      <div className="mt-1 text-[10px] text-muted-foreground">{label}</div>
      <div className="text-sm font-bold text-foreground">{value}</div>
      <div className="text-[9px] text-success">{sub}</div>
    </div>
  );
}
