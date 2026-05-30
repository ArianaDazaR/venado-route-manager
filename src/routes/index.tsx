import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StoreProvider, useStore } from "@/lib/store";
import { Login } from "@/components/Login";
import { BottomNav } from "@/components/BottomNav";
import { MiRuta } from "@/components/reponedor/MiRuta";
import { Visitas } from "@/components/reponedor/Visitas";
import { Historial } from "@/components/reponedor/Historial";
import { Perfil } from "@/components/reponedor/Perfil";
import { ExecutionView } from "@/components/reponedor/ExecutionView";
import { Dashboard } from "@/components/supervisor/Dashboard";
import { Equipo } from "@/components/supervisor/Equipo";
import { Reportes } from "@/components/supervisor/Reportes";
import { IASoluciones } from "@/components/supervisor/IASoluciones";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Venado Route — Optimización inteligente de cobertura" }] }),
  component: () => (
    <StoreProvider>
      <App />
    </StoreProvider>
  ),
});

function App() {
  return (
    <div className="min-h-screen bg-slate-200 py-0 sm:py-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col overflow-hidden bg-background shadow-2xl sm:min-h-[860px] sm:rounded-[2.5rem]">
        <Shell />
      </div>
    </div>
  );
}

function Shell() {
  const { role } = useStore();
  if (!role) return <Login />;
  if (role === "reponedor") return <ReponedorApp />;
  return <SupervisorApp />;
}

function ReponedorApp() {
  const [tab, setTab] = useState("visitas");
  const { activeVisitId, setActiveVisitId, visits } = useStore();

  if (activeVisitId != null) {
    return <ExecutionView visitId={activeVisitId} onBack={() => { setActiveVisitId(null); setTab("visitas"); }} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        {tab === "ruta" && <MiRuta />}
        {tab === "visitas" && <Visitas onStart={(id) => setActiveVisitId(id)} />}
        {tab === "nueva" && <Visitas onStart={(id) => setActiveVisitId(id)} />}
        {tab === "historial" && <Historial />}
        {tab === "perfil" && <Perfil />}
      </div>
      <BottomNav role="reponedor" active={tab} onChange={(t) => {
        if (t === "nueva") {
          const next = visits.find((v) => v.status === "ready");
          if (next) setActiveVisitId(next.id);
          else setTab("visitas");
        } else setTab(t);
      }} />
    </div>
  );
}

function SupervisorApp() {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        {tab === "dashboard" && <Dashboard />}
        {tab === "equipo" && <Equipo />}
        {tab === "reportes" && <Reportes />}
        {tab === "ia" && <IASoluciones />}
      </div>
      <BottomNav role="supervisor" active={tab} onChange={setTab} />
    </div>
  );
}
