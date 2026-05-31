import { useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight, Shield, Wifi, HelpCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { VenadoLogo } from "./VenadoLogo";
import { Instructions } from "./Instructions";

export function Login() {
  const [help, setHelp] = useState(false);
  if (help) return <Instructions onBack={() => setHelp(false)} />;
  return <LoginForm onHelp={() => setHelp(true)} />;
}

function LoginForm({ onHelp }: { onHelp: () => void }) {
  const { login } = useStore();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const role = await login(id.trim(), pwd);
    if (!role) setErr("Credenciales incorrectas. Verifica tu ID y contraseña.");
  };

  return (
    <div className="relative flex min-h-full flex-col bg-background px-6 pb-10 pt-10">
      <button
        onClick={onHelp}
        aria-label="Instrucciones de uso"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary shadow-sm active:scale-95"
      >
        <HelpCircle className="h-6 w-6" />
      </button>
      <div className="flex flex-col items-center">
        <VenadoLogo className="text-primary scale-[1.3]" />
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px w-6 bg-border" />
          Optimización inteligente de cobertura
          <div className="h-px w-6 bg-border" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold text-primary">¡Bienvenido!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ingresa tus credenciales para acceder<br />a la plataforma.
        </p>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-bold tracking-wider text-foreground">ID DE COLABORADOR</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-primary/30 bg-surface px-4 py-3.5">
            <User className="h-5 w-5 text-primary" />
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Ej: RV-1234"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold tracking-wider text-foreground">CONTRASEÑA</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-primary/30 bg-surface px-4 py-3.5">
            <Lock className="h-5 w-5 text-primary" />
            <input
              type={show ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setShow(!show)} className="text-primary">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <span
              onClick={() => setRemember(!remember)}
              className={`flex h-5 w-5 items-center justify-center rounded-md ${remember ? "bg-primary" : "border-2 border-border"}`}
            >
              {remember && <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 6l3 3 5-6" /></svg>}
            </span>
            <span className="text-foreground">Recordar mi ID</span>
          </label>
          <button type="button" className="font-medium text-primary">¿Olvidaste tu contraseña?</button>
        </div>

        {err && <div className="rounded-xl bg-destructive/10 px-4 py-2 text-xs text-destructive">{err}</div>}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-base font-bold tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-[0.98]"
        >
          INGRESAR <ArrowRight className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-6 flex gap-3 rounded-2xl bg-primary-soft p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="font-bold text-primary">Acceso seguro</div>
          <div className="text-xs text-muted-foreground">
            Cada usuario visualizará únicamente las herramientas correspondientes a su rol.
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
        <Wifi className="h-5 w-5 text-primary" />
        <span>Funciona en línea y sincroniza automáticamente cuando existe conexión.</span>
      </div>

      <div className="mt-auto pt-8">
        <div className="-mx-6 -mb-10 rounded-t-[3rem] bg-primary px-6 pb-6 pt-5 text-center">
          <div className="flex items-center justify-center gap-2 text-primary-foreground">
            <VenadoLogo showText={false} className="text-white" />
            <div className="text-left leading-tight">
              <div className="text-sm font-bold">Grupo Venado</div>
              <div className="text-xs opacity-80">Juntos llegamos más lejos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
