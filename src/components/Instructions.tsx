import { ArrowLeft, MapPin, ListChecks, Camera, BarChart3, Brain, HelpCircle } from "lucide-react";

export function Instructions({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-full flex-col bg-background pb-8">
      <div className="flex items-center gap-3 bg-primary px-5 pb-5 pt-6 text-white">
        <button onClick={onBack} className="rounded-full bg-white/15 p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <div className="text-xs opacity-80">Ayuda</div>
          <h1 className="text-xl font-bold">Instrucciones de uso</h1>
        </div>
        <HelpCircle className="ml-auto h-7 w-7 opacity-80" />
      </div>

      <div className="space-y-3 px-5 pt-5">
        <Step icon={MapPin} title="1. Inicia sesión según tu rol" desc="Usa RV-#### para reponedor o SV-#### para supervisor. Cada rol verá únicamente las herramientas que le corresponden." />
        <Step icon={ListChecks} title="2. Reponedor: ejecuta tu ruta" desc="En 'Mi ruta' filtra por día y toca cualquier marcador del mapa para ver los datos del cliente y marcarlo como Visitado." />
        <Step icon={Camera} title="3. Registra las tareas" desc="En cada visita ejecuta las microtareas en orden y captura evidencia fotográfica cuando se requiera." />
        <Step icon={BarChart3} title="4. Supervisor: monitorea en tiempo real" desc="Revisa cobertura, alertas y reportes de control X̄ / S del equipo. Exporta el reporte semanal en PDF desde el dashboard." />
        <Step icon={Brain} title="5. IA Soluciones" desc="Aplica las recomendaciones predictivas para reasignar PDV, optimizar tiempos y resolver incidencias antes de que escalen." />
      </div>

      <div className="mx-5 mt-6 rounded-2xl bg-primary-soft p-4 text-xs text-muted-foreground">
        <div className="font-bold text-primary">¿Sin conexión?</div>
        La app guarda tus avances localmente y sincroniza automáticamente cuando recuperes señal.
      </div>
    </div>
  );
}

function Step({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-bold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
