import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Bell, Clock, Camera, Check, Play, Package, Tag, Sparkles, MessageSquare, ClipboardCheck, BarChart3, Lightbulb, X } from "lucide-react";
import { useStore, fmtTime, fmtMin, type TaskExec } from "@/lib/store";
import { VenadoLogo } from "../VenadoLogo";

const TASK_ICONS = [Package, Tag, Sparkles, MessageSquare, ClipboardCheck];

export function ExecutionView({ visitId, onBack }: { visitId: number; onBack: () => void }) {
  const { visits, setVisits } = useStore();
  const visit = visits.find((v) => v.id === visitId)!;
  const [now, setNow] = useState(Date.now());
  const [cameraOpen, setCameraOpen] = useState(false);
  const [activeTaskForPhoto, setActiveTaskForPhoto] = useState<number | null>(null);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const startedAtRef = useRef(visit.startedAt ?? Date.now());

  // start visit
  useEffect(() => {
    if (visit.status === "ready") {
      const startedAt = Date.now();
      startedAtRef.current = startedAt;
      setVisits(visits.map((v) => v.id === visitId ? { ...v, status: "in_progress", startedAt } : v));
    } else if (visit.startedAt) {
      startedAtRef.current = visit.startedAt;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // global ticker
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.floor((now - startedAtRef.current) / 1000);
  const completedCount = visit.tasks.filter((t) => t.status === "completed").length;

  const updateVisit = (updater: (v: typeof visit) => typeof visit) => {
    setVisits(visits.map((v) => v.id === visitId ? updater(v) : v));
  };

  const startTask = (taskId: number) => {
    updateVisit((v) => ({
      ...v,
      tasks: v.tasks.map((t) => t.id === taskId ? { ...t, status: "running", startedAt: Date.now() } : t),
    }));
  };

  const completeTask = (taskId: number, photoUrl?: string) => {
    updateVisit((v) => ({
      ...v,
      tasks: v.tasks.map((t) => {
        if (t.id !== taskId) return t;
        // Use real elapsed time: current time - task start time
        const dur = t.startedAt ? Math.floor((Date.now() - t.startedAt) / 1000) : 0;
        return { ...t, status: "completed", durationSec: dur, photoUrl: photoUrl ?? t.photoUrl };
      }),
    }));
  };

  const handleCamera = () => {
    setCameraOpen(true);
    setTimeout(() => {
      setCameraOpen(false);
      if (activeTaskForPhoto != null) {
        completeTask(activeTaskForPhoto, "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400");
        setActiveTaskForPhoto(null);
      }
    }, 1000);
  };

  // Auto-finish visit
  useEffect(() => {
    if (visit.status === "in_progress" && visit.tasks.every((t) => t.status === "completed")) {
      const totalSec = Math.floor((Date.now() - (visit.startedAt ?? Date.now())) / 1000);
      const nextIdx = visits.findIndex((v) => v.id === visitId) + 1;
      setVisits(visits.map((v, i) => {
        if (v.id === visitId) return { ...v, status: "completed", finishedAt: Date.now(), totalSec };
        if (i === nextIdx && v.status === "locked") return { ...v, status: "ready" };
        return v;
      }));
      setTimeout(onBack, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visit.tasks]);

  return (
    <div className="flex min-h-full flex-col bg-background pb-6">
      <div className="flex items-center justify-between px-5 pt-5">
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center"><ArrowLeft className="h-6 w-6 text-foreground" /></button>
        <VenadoLogo />
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70" />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between px-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">EJECUCIÓN DE TAREAS</h1>
          <p className="text-sm text-muted-foreground">{visit.clientName} ({visit.code})</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-primary-soft px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white"><Clock className="h-5 w-5 text-primary" /></div>
          <div>
            <div className="font-mono text-lg font-bold leading-tight text-primary">{fmtTime(elapsed)}</div>
            <div className="text-[10px] text-muted-foreground">Tiempo de visita</div>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-5 rounded-2xl bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">Progreso de tareas</span>
          <span className="text-muted-foreground">{completedCount} de 5 completadas</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {visit.tasks.map((t) => (
            <div key={t.id} className={`h-2 flex-1 rounded ${t.status === "completed" ? "bg-primary" : t.status === "running" ? "bg-primary/50" : "bg-border"}`} />
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3 px-5">
        {visit.tasks.map((t, i) => (
          <TaskRow
            key={t.id}
            task={t}
            index={i}
            now={now}
            onStart={() => startTask(t.id)}
            onPhoto={() => { setActiveTaskForPhoto(t.id); handleCamera(); }}
            onComplete={() => completeTask(t.id)}
            onOpenInventory={() => { setInventoryOpen(true); if (t.status === "pending") startTask(t.id); }}
          />
        ))}
      </div>

      <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
        <Lightbulb className="h-5 w-5 text-primary" />
        <div className="flex-1 text-xs">
          <div className="font-semibold text-foreground">Completa las 5 tareas para finalizar la visita</div>
          <div className="text-muted-foreground">El tiempo se registra automáticamente por tarea.</div>
        </div>
        <BarChart3 className="h-5 w-5 text-primary" />
      </div>

      <button
        onClick={() => { setActiveTaskForPhoto(null); handleCamera(); }}
        className="mx-5 mt-4 flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-white shadow-lg shadow-primary/30"
      >
        <Camera className="h-5 w-5" /> Tomar evidencia general (opcional)
      </button>

      {cameraOpen && <CameraMockup />}
      {inventoryOpen && (
        <InventorySheet
          onClose={() => setInventoryOpen(false)}
          onSave={() => { setInventoryOpen(false); completeTask(5); }}
        />
      )}
    </div>
  );
}

function TaskRow({ task, index, now, onStart, onPhoto, onComplete, onOpenInventory }: any) {
  const Icon = TASK_ICONS[index];
  const isCompleted = task.status === "completed";
  const isRunning = task.status === "running";
  const liveSec = isRunning && task.startedAt ? Math.floor((now - task.startedAt) / 1000) : task.durationSec;

  const handleAction = () => {
    if (task.id === 5) return onOpenInventory();
    // Photo tasks: must start first, then take photo
    if (task.requiresPhoto) {
      if (task.status === "pending") {
        // Step 1: Start the task
        onStart();
      } else if (task.status === "running") {
        // Step 2: Take photo (task is already running)
        onPhoto();
      }
    } else {
      // Non-photo tasks: start and then complete
      if (task.status === "pending") onStart();
      else if (!isCompleted) setTimeout(onComplete, 400);
    }
  };

  return (
    <div className="rounded-2xl bg-surface p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${isCompleted || isRunning ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{task.id}</div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft"><Icon className="h-6 w-6 text-primary" /></div>
        <div className="flex-1">
          <div className="font-bold text-sm text-foreground">{task.name}</div>
          <div className="text-xs text-muted-foreground">{task.description}</div>
        </div>
        <div className="text-right">
          {isCompleted ? (
            <>
              <div className="flex items-center justify-end gap-1 text-success"><Check className="h-4 w-4" /><span className="text-sm font-semibold">Completada</span></div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-lg bg-success/10 px-2 py-1 text-xs text-success"><Clock className="h-3 w-3" />{fmtMin(task.durationSec)}</div>
            </>
          ) : isRunning ? (
            <>
              <div className="text-sm font-semibold text-primary">En curso</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-lg bg-primary-soft px-2 py-1 text-xs font-mono text-primary"><Clock className="h-3 w-3" />{fmtMin(liveSec)}</div>
            </>
          ) : (
            <div className="flex items-center justify-end gap-1 text-muted-foreground"><Clock className="h-4 w-4" /><span className="text-sm">Pendiente</span></div>
          )}
        </div>
      </div>
      {!isCompleted && (
        <div className="mt-3 flex items-center gap-2">
          {task.requiresPhoto && (
            <div className="inline-flex items-center gap-1 rounded-lg bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
              <Camera className="h-3 w-3" /> Evidencia requerida
            </div>
          )}
          <button onClick={handleAction} className="ml-auto flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white">
            {task.id === 5
              ? "Abrir inventario"
              : task.requiresPhoto
                ? task.status === "pending"
                  ? <><Play className="h-3 w-3" /> Iniciar tarea</>
                  : <><Camera className="h-3 w-3" /> Tomar foto</>
                : <><Play className="h-3 w-3" /> {isRunning ? "Completar" : "Iniciar"}</>}
          </button>
        </div>
      )}
    </div>
  );
}

function CameraMockup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="text-center text-white">
        <div className="mx-auto h-48 w-48 animate-pulse rounded-3xl border-4 border-white/40" />
        <div className="mt-4 flex items-center justify-center gap-2"><Camera className="h-5 w-5" />Capturando evidencia…</div>
      </div>
    </div>
  );
}

const CATEGORIES = ["Salsas, culinarias, postres y cereales", "Panadería y pastelería", "Bebidas", "Cuidado personal y del hogar"];
const PRODUCTS: Record<string, string[]> = {
  "Bebidas": ["Frussion", "De la granja", "Casa del Camba"],
  "Salsas, culinarias, postres y cereales": ["Kris Mayonesa", "Maggi caldo", "Frutall mermelada"],
  "Panadería y pastelería": ["Pan Bimbo", "Tortillas Mission", "Galletas Oreo"],
  "Cuidado personal y del hogar": ["Ace detergente", "Jabón Lux", "Suavitel"],
};

function InventorySheet({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [cat, setCat] = useState("Bebidas");
  const products = PRODUCTS[cat];
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/40" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-surface p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border" />
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft"><ClipboardCheck className="h-6 w-6 text-primary" /></div>
          <div className="flex-1">
            <div className="text-lg font-bold text-foreground">Toma de inventario</div>
            <div className="text-sm text-muted-foreground">Anota lo que necesitas reponer durante tu visita.</div>
          </div>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>

        <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-medium ${cat === c ? "bg-primary text-white border-primary" : "border-border text-muted-foreground"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">{cat.split(",")[0]}</div>
        <div className="mt-2 space-y-2">
          {products.map((p, i) => (
            <ProductRow key={p} name={p} defaultQty={i === 0 ? 50 : 0} defaultChecked={i === 0} />
          ))}
        </div>

        <button onClick={onSave} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-white shadow-lg shadow-primary/30">
          <Check className="h-5 w-5" /> Guardar inventario
        </button>
      </div>
    </div>
  );
}

function ProductRow({ name, defaultQty, defaultChecked }: { name: string; defaultQty: number; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  const [qty, setQty] = useState(defaultQty);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5">
      <button onClick={() => setChecked(!checked)} className={`flex h-5 w-5 items-center justify-center rounded ${checked ? "bg-primary" : "border-2 border-border"}`}>
        {checked && <Check className="h-3 w-3 text-white" />}
      </button>
      <span className="flex-1 text-sm text-foreground">{name}</span>
      <input type="number" value={qty || ""} onChange={(e) => setQty(Number(e.target.value))} className="w-16 rounded border-b border-border bg-transparent text-right text-sm outline-none" />
      <span className="text-xs text-muted-foreground">qt.</span>
    </div>
  );
}
