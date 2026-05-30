import { LogOut, Phone, Mail, MapPin, Shield, Settings, ChevronRight } from "lucide-react";
import { AppHeader } from "../AppHeader";
import { useStore } from "@/lib/store";

export function Perfil() {
  const { userName, userId, logout } = useStore();
  return (
    <div className="flex flex-col gap-5 pb-6">
      <AppHeader />
      <div className="mx-5 rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">JP</div>
          <div>
            <div className="text-xl font-bold">{userName}</div>
            <div className="text-sm opacity-80">Reponedor · {userId}</div>
            <span className="mt-1 inline-block rounded-full bg-success/20 px-2 py-0.5 text-xs">En ruta</span>
          </div>
        </div>
      </div>

      <div className="mx-5 space-y-2">
        <Row icon={Phone} label="Teléfono" value="+506 8888 1234" />
        <Row icon={Mail} label="Correo" value="juan.perez@venadoroute.com" />
        <Row icon={MapPin} label="Ruta asignada" value="Ruta Norte · La Paz" />
        <Row icon={Shield} label="Reponedor desde" value="Enero 2024" />
        <Row icon={Settings} label="Configuración" value="Notificaciones, idioma" />
      </div>

      <button onClick={logout} className="mx-5 mt-2 flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 py-4 font-semibold text-destructive">
        <LogOut className="h-5 w-5" /> Cerrar sesión
      </button>
    </div>
  );
}

function Row({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft"><Icon className="h-5 w-5 text-primary" /></div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}
