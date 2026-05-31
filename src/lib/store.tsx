import { createContext, useContext, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Role = "reponedor" | "supervisor";

export interface TaskExec {
  id: number;
  name: string;
  description: string;
  requiresPhoto: boolean;
  status: "pending" | "running" | "completed";
  startedAt?: number;
  durationSec: number;
  photoUrl?: string;
}

export interface VisitExec {
  id: number;
  clientName: string;
  code: string;
  type: string;
  address: string;
  zone: string;
  status: "locked" | "ready" | "in_progress" | "completed";
  startedAt?: number;
  finishedAt?: number;
  totalSec: number;
  tasks: TaskExec[];
  evidenceUrl?: string;
}

const TASK_TEMPLATE = (): TaskExec[] => [
  { id: 1, name: "Armado y mantenimiento de exhibiciones", description: "Verifica y organiza la exhibición de productos.", requiresPhoto: true, status: "pending", durationSec: 0 },
  { id: 2, name: "Toma y actualización de precios", description: "Verifica y actualiza los precios de los productos.", requiresPhoto: false, status: "pending", durationSec: 0 },
  { id: 3, name: "Limpieza y generación de espacios", description: "Limpia y genera espacios en percha o estante.", requiresPhoto: false, status: "pending", durationSec: 0 },
  { id: 4, name: "Instalación y visualización de material POP", description: "Instala y asegura la correcta visualización del material POP.", requiresPhoto: true, status: "pending", durationSec: 0 },
  { id: 5, name: "Toma de inventario", description: "Verifica el inventario para asegurar la disponibilidad de producto.", requiresPhoto: false, status: "pending", durationSec: 0 },
];

const initialVisits = (): VisitExec[] => {
  const data = [
    { clientName: "Mayorista San José", code: "GV049", type: "MAYORISTA", address: "Av. 6 de Marzo, #1234", zone: "Achumani" },
    { clientName: "Supermercado Los Andes", code: "GV050", type: "SUPERMERCADO", address: "Av. Buenos Aires, #567", zone: "Centro" },
    { clientName: "Distribuidora El Alba", code: "GV051", type: "DISTRIBUIDORA", address: "Calle 25, #890", zone: "Sur" },
    { clientName: "Mercado Central", code: "GV052", type: "MERCADO", address: "Av. Camacho, #210", zone: "Centro" },
    { clientName: "Tienda Don Pepe", code: "GV053", type: "TIENDA", address: "Calle Sucre, #45", zone: "Miraflores" },
    { clientName: "Hipermaxi Sopocachi", code: "GV054", type: "HIPERMERCADO", address: "Av. Ecuador, #1100", zone: "Sopocachi" },
    { clientName: "Minimarket La Paz", code: "GV055", type: "MINIMARKET", address: "Calle Illampu, #321", zone: "El Alto" },
    { clientName: "Bodega San Miguel", code: "GV056", type: "BODEGA", address: "Av. Ballivián, #800", zone: "San Miguel" },
    { clientName: "Comercial Andina", code: "GV057", type: "MAYORISTA", address: "Av. Arce, #2200", zone: "Obrajes" },
    { clientName: "Super Express", code: "GV058", type: "SUPERMERCADO", address: "Av. 16 de Julio, #1500", zone: "Centro" },
  ];
  return data.map((d, i) => ({
    id: i + 1,
    ...d,
    status: i === 0 ? "ready" : "locked",
    totalSec: 0,
    tasks: TASK_TEMPLATE(),
  }));
};

interface Store {
  role: Role | null;
  userId: string;
  userName: string;
  nombreAsignado: string;
  login: (id: string, pwd: string) => Promise<Role | null>;
  logout: () => void;
  visits: VisitExec[];
  setVisits: (v: VisitExec[]) => void;
  activeVisitId: number | null;
  setActiveVisitId: (id: number | null) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [nombreAsignado, setNombreAsignado] = useState("");
  const [visits, setVisits] = useState<VisitExec[]>(initialVisits());
  const [activeVisitId, setActiveVisitId] = useState<number | null>(null);

  const login = async (id: string, pwd: string): Promise<Role | null> => {
    const { data, error } = await supabase
      .from("credenciales_accesos")
      .select("codigo,password,rol,nombre_asignado,activo")
      .eq("codigo", id)
      .maybeSingle();
    if (error || !data || !data.activo || data.password !== pwd) return null;
    const mapped: Role = data.rol === "SUPERVISOR" ? "supervisor" : "reponedor";
    setRole(mapped);
    setUserId(data.codigo);
    setUserName(data.nombre_asignado);
    setNombreAsignado(data.nombre_asignado);
    return mapped;
  };

  const logout = () => {
    setRole(null);
    setUserId("");
    setUserName("");
    setNombreAsignado("");
    setVisits(initialVisits());
    setActiveVisitId(null);
  };

  return (
    <Ctx.Provider value={{ role, userId, userName, nombreAsignado, login, logout, visits, setVisits, activeVisitId, setActiveVisitId }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const fmtTime = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const fmtMin = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} min`;
};
