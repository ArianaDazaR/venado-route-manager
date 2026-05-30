export function VenadoLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-9 w-9" fill="currentColor">
        <path d="M8 8 L32 56 L56 8 L48 8 L32 40 L16 8 Z" />
        <path d="M24 14 Q22 8 18 6 L20 12 L16 10 L22 16 Q24 20 28 22 L28 30 Q30 32 32 32 Q34 32 36 30 L36 22 Q40 20 42 16 L48 10 L44 12 L46 6 Q42 8 40 14 L36 18 L36 14 L32 12 L28 14 L28 18 Z" opacity="0.9" />
        <circle cx="29" cy="24" r="1.2" fill="white" />
        <circle cx="35" cy="24" r="1.2" fill="white" />
      </svg>
      {showText && (
        <div className="leading-none">
          <div className="text-[18px] font-extrabold tracking-tight text-foreground">VENADO</div>
          <div className="text-[10px] font-bold tracking-[0.35em] text-primary">ROUTE</div>
        </div>
      )}
    </div>
  );
}
