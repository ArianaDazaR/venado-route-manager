import { Calendar, Share2, AlertTriangle, MapPin, CheckCircle, ChevronRight, Brain, Sparkles, BarChart3, TrendingUp, Clock, ArrowDown, ArrowUp } from "lucide-react";
import { SupHeader } from "./Dashboard";

export function IASoluciones() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <SupHeader />
      <div className="px-5 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold">IA Soluciones</h1>
          <p className="text-sm text-muted-foreground">Recomendaciones inteligentes generadas por IA<br />para mejorar el desempeño de tus rutas.</p>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-primary-soft px-3 py-2 text-xs"><Calendar className="h-4 w-4 text-primary" />20 May, 2024</div>
      </div>

      <div className="mx-5 rounded-2xl bg-surface p-4 shadow-sm flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100"><Brain className="h-6 w-6 text-purple-600" /></div>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">Resumen IA del día</div>
          <div className="font-bold">2 recomendaciones activas</div>
          <div className="text-[10px] text-muted-foreground">Generadas automáticamente por IA predictiva</div>
        </div>
        <div className="flex gap-2 text-center text-xs">
          <div><div className="text-xl font-bold text-destructive">1</div>Crítica</div>
          <div><div className="text-xl font-bold text-warning">1</div>Preventiva</div>
          <div><div className="text-xl font-bold text-success">0</div>Informativa</div>
        </div>
      </div>

      <div className="mx-5 rounded-2xl bg-surface p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100"><Share2 className="h-6 w-6 text-purple-600" /></div>
          <div className="flex-1">
            <div className="flex justify-between"><span className="font-bold">1. Optimización de cobertura</span><span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">CRÍTICA</span></div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold"><AlertTriangle className="h-4 w-4 text-warning" />Problema detectado</div>
              <div className="text-xs text-muted-foreground">La Ruta Norte presenta sobrecarga operativa respecto al promedio del equipo.</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-success"><CheckCircle className="h-4 w-4" />Acción sugerida</div>
              <div className="text-xs text-muted-foreground">Mover <b>3 PDV</b> de Juan Pérez a Ana López.</div>
            </div>
            <button className="flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white">Ver simulación <ChevronRight className="h-3 w-3" /></button>
          </div>
          <div className="rounded-xl bg-primary-soft p-3 space-y-2 text-xs">
            <div className="font-semibold">Impacto estimado</div>
            <ImpactRow icon={Share2} dir="down" value="12 km" label="menos recorridos" />
            <ImpactRow icon={Clock} dir="down" value="45 min" label="menos de traslado" />
            <ImpactRow icon={BarChart3} dir="up" value="8%" label="más cobertura" />
            <ImpactRow icon={TrendingUp} dir="up" value="5%" label="más productividad" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground"><Sparkles className="h-3 w-3 text-primary" />Generado automáticamente mediante DSS + IA predictiva</div>
      </div>

      <div className="mx-5 rounded-2xl bg-surface p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="font-bold">2. Riesgo de incumplimiento</div>
          <span className="rounded-full bg-warning/20 px-2 py-0.5 text-xs font-bold text-warning">PREVENTIVA</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-destructive"><MapPin className="h-4 w-4" />Ruta Sur</div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-destructive/5 p-3 text-center">
            <div className="text-xs text-foreground">Probabilidad</div>
            <CircleProgress value={87} />
          </div>
          <div className="text-xs space-y-1">
            <div className="font-semibold">Motivos detectados por IA</div>
            <div>• Tráfico histórico elevado</div>
            <div>• Exceso de visitas programadas</div>
            <div>• Tiempos superiores al estándar</div>
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1 font-semibold text-success"><CheckCircle className="h-4 w-4" />Acción</div>
            <div className="text-muted-foreground">Reducir <b>2 PDV</b> para la jornada de mañana.</div>
            <button className="mt-2 flex items-center gap-1 rounded-xl bg-primary px-2 py-1.5 text-[11px] font-semibold text-white">Ver impacto <ChevronRight className="h-3 w-3" /></button>
          </div>
        </div>
      </div>

      <div className="mx-5 rounded-2xl bg-surface p-4 shadow-sm">
        <div className="font-bold mb-3">Impacto acumulado esperado</div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <Impact icon={Share2} value="67 km" sub="ahorrados" color="bg-purple-100 text-purple-600" />
          <Impact icon={Clock} value="4.3 h" sub="recuperadas" color="bg-blue-100 text-blue-600" />
          <Impact icon={BarChart3} value="+11%" sub="cobertura" color="bg-green-100 text-green-600" />
          <Impact icon={TrendingUp} value="+9%" sub="productividad" color="bg-orange-100 text-orange-600" />
        </div>
      </div>
    </div>
  );
}

function ImpactRow({ icon: Icon, dir, value, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      {dir === "down" ? <ArrowDown className="h-3 w-3 text-success" /> : <ArrowUp className="h-3 w-3 text-success" />}
      <span className="font-bold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function Impact({ icon: Icon, value, sub, color }: any) {
  return (
    <div>
      <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${color}`}><Icon className="h-5 w-5" /></div>
      <div className="mt-1 font-bold text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function CircleProgress({ value }: { value: number }) {
  const c = 2 * Math.PI * 28;
  return (
    <svg className="mx-auto mt-1" width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="28" fill="none" stroke="#fee2e2" strokeWidth="6" />
      <circle cx="35" cy="35" r="28" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * value) / 100} transform="rotate(-90 35 35)" />
      <text x="35" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ef4444">{value}%</text>
    </svg>
  );
}
