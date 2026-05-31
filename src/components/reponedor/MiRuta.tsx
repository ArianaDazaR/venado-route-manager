import { useEffect, useMemo, useState } from "react";
import { MapPin, Sparkles, X, Store, Tag, DollarSign, CheckCircle2, Loader2 } from "lucide-react";
import { AppHeader, DateChip } from "../AppHeader";
import { supabase } from "@/integrations/supabase/client";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

type Cliente = {
  id: string;
  id_cliente_lovable: string;
  mercado_zona: string | null;
  categoria_pareto: string | null;
  latitud: number | null;
  longitud: number | null;
  volumen_compra_bs: number | null;
  marca_foco_venta: string | null;
  material_pop_asignado: string | null;
  estado_cumplimiento: string | null;
  reponedor: string | null;
  lunes: number; martes: number; miercoles: number;
  jueves: number; viernes: number; sabado: number;
};

const DAYS = [
  { key: "lunes", label: "Lun" },
  { key: "martes", label: "Mar" },
  { key: "miercoles", label: "Mié" },
  { key: "jueves", label: "Jue" },
  { key: "viernes", label: "Vie" },
  { key: "sabado", label: "Sáb" },
] as const;

type DayKey = typeof DAYS[number]["key"];

export function MiRuta() {
  const { nombreAsignado, role } = useStore();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState<DayKey>("lunes");
  const [selected, setSelected] = useState<Cliente | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let q = supabase
        .from("clientes_trade_lp")
        .select("id,id_cliente_lovable,mercado_zona,categoria_pareto,latitud,longitud,volumen_compra_bs,marca_foco_venta,material_pop_asignado,estado_cumplimiento,reponedor,lunes,martes,miercoles,jueves,viernes,sabado")
        .limit(1000);
      if (role === "reponedor" && nombreAsignado) {
        q = q.eq("reponedor", nombreAsignado);
      }
      const { data, error } = await q;
      if (error) toast.error("Error cargando clientes");
      else setClientes((data || []) as Cliente[]);
      setLoading(false);
    })();
  }, [nombreAsignado, role]);

  const filtered = useMemo(
    () => clientes.filter((c) => (c as any)[day] === 1 && c.latitud != null && c.longitud != null),
    [clientes, day]
  );

  const bounds = useMemo(() => {
    if (!filtered.length) return null;
    const lats = filtered.map((c) => c.latitud!);
    const lngs = filtered.map((c) => c.longitud!);
    const pad = 0.003;
    return {
      minLat: Math.min(...lats) - pad,
      maxLat: Math.max(...lats) + pad,
      minLng: Math.min(...lngs) - pad,
      maxLng: Math.max(...lngs) + pad,
    };
  }, [filtered]);

  const project = (c: Cliente) => {
    if (!bounds) return { x: 50, y: 50 };
    const x = ((c.longitud! - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = (1 - (c.latitud! - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
    return { x, y };
  };

  const toggleEstado = async (c: Cliente) => {
    const next = c.estado_cumplimiento === "Visitado" ? "Pendiente" : "Visitado";
    setSaving(true);
    const { error } = await supabase
      .from("clientes_trade_lp")
      .update({ estado_cumplimiento: next })
      .eq("id", c.id);
    setSaving(false);
    if (error) return toast.error("No se pudo actualizar");
    toast.success(`Cliente marcado como ${next}`);
    setClientes((prev) => prev.map((x) => (x.id === c.id ? { ...x, estado_cumplimiento: next } : x)));
    setSelected({ ...c, estado_cumplimiento: next });
  };

  const colorFor = (estado: string | null) =>
    estado === "Visitado" ? "#22c55e" : estado?.startsWith("No Visitado") ? "#ef4444" : "#f59e0b";

  return (
    <div className="flex flex-col gap-4 pb-6">
      <AppHeader />
      <DateChip text="Ruta semanal · La Paz" />

      <div className="px-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Mi ruta de hoy</h2>
        </div>
        <p className="ml-8 text-sm text-muted-foreground">
          {loading ? "Cargando puntos de venta…" : `${filtered.length} clientes programados`}
        </p>
      </div>

      {/* Day selector */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-5">
        {DAYS.map((d) => (
          <button
            key={d.key}
            onClick={() => setDay(d.key)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              day === d.key
                ? "bg-primary text-white shadow"
                : "bg-surface text-foreground border border-border"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="mx-5 overflow-hidden rounded-3xl border border-border shadow-sm">
        <div className="relative h-72 bg-[linear-gradient(135deg,#dbeafe,#ecfdf5_40%,#fef3c7)]">
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 14} x2="100" y2={i * 14} stroke="#94a3b8" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 14} y1="0" x2={i * 14} y2="100" stroke="#94a3b8" strokeWidth="0.3" />
            ))}
          </svg>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              Sin clientes asignados a este día.
            </div>
          )}

          {filtered.map((c) => {
            const { x, y } = project(c);
            const color = colorFor(c.estado_cumplimiento);
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                title={c.id_cliente_lovable}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white shadow hover:scale-125 transition"
                style={{ left: `${x}%`, top: `${y}%`, width: 14, height: 14, backgroundColor: color }}
              />
            );
          })}

          {/* Legend */}
          <div className="absolute left-3 bottom-3 rounded-lg bg-white/90 p-2 text-[10px] shadow">
            <div className="font-bold text-foreground mb-1">Estado</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" /> Visitado</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Pendiente</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Incidencia</div>
          </div>
        </div>
      </div>

      <div className="mx-5 flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-foreground">Ruta optimizada</div>
          <div className="text-xs text-muted-foreground">
            Mostrando clientes con visita programada para {DAYS.find((d) => d.key === day)?.label}.
          </div>
        </div>
      </div>

      {/* Side panel */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSelected(null)} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col bg-background shadow-2xl sm:rounded-l-3xl">
            <div className="flex items-start justify-between bg-primary px-5 py-4 text-white sm:rounded-tl-3xl">
              <div>
                <div className="text-[11px] uppercase tracking-wider opacity-80">{selected.categoria_pareto}</div>
                <div className="text-lg font-bold leading-tight">{selected.id_cliente_lovable}</div>
                <div className="text-xs opacity-80">{selected.mercado_zona}</div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full bg-white/15 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              <PanelRow icon={DollarSign} label="Volumen de compra" value={`Bs. ${(selected.volumen_compra_bs ?? 0).toLocaleString("es-BO")}`} />
              <PanelRow icon={Tag} label="Marca foco" value={selected.marca_foco_venta || "—"} />
              <PanelRow icon={Store} label="Material POP" value={selected.material_pop_asignado || "—"} />
              <PanelRow icon={MapPin} label="Coordenadas" value={`${selected.latitud?.toFixed(5)}, ${selected.longitud?.toFixed(5)}`} />

              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="text-xs text-muted-foreground">Estado actual</div>
                <div
                  className="mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: colorFor(selected.estado_cumplimiento) }}
                >
                  {selected.estado_cumplimiento || "Pendiente"}
                </div>
              </div>

              <button
                onClick={() => toggleEstado(selected)}
                disabled={saving}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition active:scale-[0.98] ${
                  selected.estado_cumplimiento === "Visitado"
                    ? "bg-amber-500"
                    : "bg-green-600"
                }`}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
                {selected.estado_cumplimiento === "Visitado"
                  ? "Marcar como Pendiente"
                  : "Marcar como Visitado"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PanelRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}
