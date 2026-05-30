import { useState } from "react";
import { Search, Plus, Phone, Mail, Clock, MapPin } from "lucide-react";
import { SupHeader } from "./Dashboard";

const TEAM = [
  { id: 1, name: "Juan Pérez", route: "Ruta Norte", status: "En ruta", color: "text-success", initials: "JP" },
  { id: 2, name: "Ana López", route: "Ruta Sur", status: "En ruta", color: "text-success", initials: "AL" },
  { id: 3, name: "Carlos Rojas", route: "Ruta Este", status: "En pausa", color: "text-warning", initials: "CR" },
  { id: 4, name: "María González", route: "Ruta Centro", status: "En ruta", color: "text-success", initials: "MG" },
];

export function Equipo() {
  const [selected, setSelected] = useState(1);
  const [q, setQ] = useState("");
  const filtered = TEAM.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  const sel = TEAM.find((t) => t.id === selected)!;

  return (
    <div className="flex flex-col gap-4 pb-6">
      <SupHeader />
      <div className="px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Equipo de reponedores</h1>
            <p className="text-sm text-muted-foreground">Gestión y desempeño de tu equipo en tiempo real</p>
          </div>
          <button className="flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white"><Plus className="h-4 w-4" />Agregar</button>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-3 border-b border-border">
          <button className="border-b-2 border-primary px-1 pb-2 text-sm font-semibold text-primary">Lista del equipo</button>
          <button className="px-1 pb-2 text-sm text-muted-foreground">Mapa del equipo</button>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar reponedor…" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
      </div>

      <div className="space-y-2 px-5">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`flex w-full items-center gap-3 rounded-2xl border bg-surface p-3 text-left shadow-sm ${selected === t.id ? "border-primary ring-2 ring-primary/20 bg-primary-soft" : "border-border"}`}
          >
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">{t.initials}</div>
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white ${t.status === "En ruta" ? "bg-success" : "bg-warning"}`} />
            </div>
            <div className="flex-1">
              <div className="font-bold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.route}</div>
              <div className={`text-xs font-medium ${t.color}`}>{t.status}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mx-5 overflow-hidden rounded-2xl bg-surface shadow-sm">
        <div className="bg-primary p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 font-bold">{sel.initials}</div>
            <div className="flex-1">
              <div className="text-lg font-bold">{sel.name}</div>
              <div className="mt-1 inline-block rounded-full bg-success/30 px-2 py-0.5 text-xs">{sel.status}</div>
              <div className="text-xs opacity-80">{sel.route}</div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary font-bold">84%</div>
          </div>
        </div>
        <div className="grid grid-cols-4 divide-x divide-border p-3 text-center text-xs">
          <div><div className="font-bold text-base">35</div>Visitas hoy</div>
          <div><div className="font-bold text-base">24.3</div>Prom. visita</div>
          <div><div className="font-bold text-base">18.6 km</div>Recorridos</div>
          <div><div className="font-bold text-base">84%</div>Cumpl.</div>
        </div>
        <div className="space-y-2 border-t border-border p-4 text-xs">
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />+506 8888 1234</div>
          <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />juan.perez@venadoroute.com</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Inicio: 7:30 a.m.</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Av. 6 de Agosto, La Paz</div>
        </div>
        <div className="space-y-2 border-t border-border p-4 text-xs">
          <Bar label="PDV visitados" value={35} max={40} color="bg-primary" suffix="/40" />
          <Bar label="Cobertura" value={84} max={100} color="bg-success" suffix="%" />
          <Bar label="Cumplimiento" value={92} max={100} color="bg-purple-500" suffix="%" />
          <Bar label="Evidencias" value={32} max={40} color="bg-orange-500" suffix="/40" />
        </div>
        <button className="m-4 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white">Ver detalle completo</button>
      </div>
    </div>
  );
}

function Bar({ label, value, max, color, suffix }: any) {
  return (
    <div>
      <div className="flex justify-between"><span>{label}</span><span className="font-bold">{value}{suffix}</span></div>
      <div className="mt-1 h-1.5 rounded bg-border"><div className={`h-full rounded ${color}`} style={{ width: `${(value / max) * 100}%` }} /></div>
    </div>
  );
}
