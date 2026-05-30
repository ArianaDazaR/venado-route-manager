import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import { Calendar, Users, MapPin, Download, Clock, Share2, Store, Target, Timer, TrendingUp } from "lucide-react";
import { SupHeader } from "./Dashboard";

const meanData = Array.from({ length: 31 }, (_, i) => ({ day: i + 1, val: 18 + Math.random() * 20 }));
const sigmaData = Array.from({ length: 31 }, (_, i) => ({ day: i + 1, val: 0.8 + Math.random() * 2 }));
const timeDist = [{ k: "0-15", v: 18, c: "#7c3aed" }, { k: "15-30", v: 46, c: "#2563eb" }, { k: "30-45", v: 24, c: "#f97316" }, { k: "45+", v: 12, c: "#ef4444" }];
const distDist = [{ k: "0-10 km", v: 28, c: "#22c55e" }, { k: "10-20 km", v: 48, c: "#2563eb" }, { k: "20-30 km", v: 18, c: "#f97316" }, { k: "30+ km", v: 6, c: "#ef4444" }];

export function Reportes() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <SupHeader />
      <div className="px-5">
        <h1 className="text-3xl font-extrabold">Reportes</h1>
        <p className="text-sm text-muted-foreground">Datos relevantes para BI y toma de decisiones</p>
      </div>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-5">
        <Pill icon={Calendar}>13 May - 20 May, 2024</Pill>
        <Pill icon={Users}>Todos los reponedores</Pill>
        <Pill icon={MapPin}>Todas las rutas</Pill>
        <button className="flex shrink-0 items-center gap-1 rounded-xl border border-primary px-3 py-2 text-xs font-semibold text-primary"><Download className="h-4 w-4" />Exportar</button>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5">
        <KpiCard icon={Clock} color="bg-purple-100 text-purple-600" label="Tiempo de traslado promedio" value="24.3 min" trend="+6.2%" />
        <KpiCard icon={Share2} color="bg-orange-100 text-orange-600" label="Distancia entre PDVs promedio" value="18.6 km" trend="+5.1%" />
        <KpiCard icon={Store} color="bg-blue-100 text-blue-600" label="PDV visitados promedio" value="35" trend="+3.4%" />
        <KpiCard icon={Target} color="bg-green-100 text-green-600" label="Cumplimiento de ruta" value="92%" trend="+4.7%" />
        <KpiCard icon={Timer} color="bg-pink-100 text-pink-600" label="Tiempo en tienda" value="12.1 min" trend="+4.3%" />
        <KpiCard icon={MapPin} color="bg-amber-100 text-amber-600" label="Inicio - Fin de jornada" value="8h 23m" trend="+3.8%" />
        <KpiCard icon={Target} color="bg-emerald-100 text-emerald-600" label="Eficiencia equipo" value="84%" trend="+5.6%" />
        <KpiCard icon={TrendingUp} color="bg-purple-100 text-purple-600" label="Desviación estándar" value="1.32 min" trend="+9.1%" />
      </div>

      <ChartCard title="Gráfico de Control de Medias (X̄)">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={meanData}>
            <XAxis dataKey="day" fontSize={10} />
            <YAxis fontSize={10} />
            <Tooltip />
            <ReferenceLine y={42} stroke="#ef4444" />
            <ReferenceLine y={24} stroke="#22c55e" />
            <ReferenceLine y={6} stroke="#ef4444" />
            <Line type="monotone" dataKey="val" stroke="#0B33A2" strokeWidth={1.5} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Gráfico de Control de Desviación Estándar (S)">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={sigmaData}>
            <XAxis dataKey="day" fontSize={10} />
            <YAxis fontSize={10} />
            <Tooltip />
            <ReferenceLine y={3} stroke="#ef4444" />
            <ReferenceLine y={1.5} stroke="#22c55e" />
            <ReferenceLine y={0.2} stroke="#ef4444" />
            <Line type="monotone" dataKey="val" stroke="#0B33A2" strokeWidth={1.5} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Distribución de tiempos (minutos)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={timeDist} layout="vertical">
            <XAxis type="number" fontSize={10} />
            <YAxis dataKey="k" type="category" fontSize={11} width={50} />
            <Tooltip />
            <Bar dataKey="v" radius={[0, 8, 8, 0]}>
              {timeDist.map((d, i) => <rect key={i} fill={d.c} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Distancia entre PDVs (km)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={distDist} layout="vertical">
            <XAxis type="number" fontSize={10} />
            <YAxis dataKey="k" type="category" fontSize={11} width={60} />
            <Tooltip />
            <Bar dataKey="v" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function Pill({ icon: Icon, children }: any) {
  return <div className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs"><Icon className="h-4 w-4 text-primary" />{children}</div>;
}

function KpiCard({ icon: Icon, color, label, value, trend }: any) {
  return (
    <div className="rounded-2xl bg-surface p-3 shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}><Icon className="h-5 w-5" /></div>
      <div className="mt-2 text-[11px] text-muted-foreground leading-tight">{label}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[10px] text-success">↑ {trend} vs sem. anterior</div>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="mx-5 rounded-2xl bg-surface p-4 shadow-sm">
      <div className="text-sm font-bold mb-2">{title}</div>
      {children}
    </div>
  );
}
