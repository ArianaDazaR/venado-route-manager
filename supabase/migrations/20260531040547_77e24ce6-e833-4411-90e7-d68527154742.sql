
CREATE TABLE public.credenciales_accesos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text NOT NULL UNIQUE,
  password text NOT NULL,
  rol text NOT NULL CHECK (rol IN ('REPONEDOR','SUPERVISOR')),
  nombre_asignado text NOT NULL,
  activo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.credenciales_accesos TO anon, authenticated;
GRANT ALL ON public.credenciales_accesos TO service_role;

ALTER TABLE public.credenciales_accesos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read credenciales" ON public.credenciales_accesos
  FOR SELECT TO anon, authenticated USING (true);
