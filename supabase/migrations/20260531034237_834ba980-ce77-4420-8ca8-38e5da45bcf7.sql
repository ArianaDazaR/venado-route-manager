
CREATE TABLE public.clientes_trade_lp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nro integer,
  mercado_zona text,
  categoria_pareto text,
  codigo_fijo_venado bigint,
  id_cliente_lovable text UNIQUE NOT NULL,
  latitud double precision,
  longitud double precision,
  supervisor text,
  reponedor text,
  tiempo_visita_minutos integer,
  lunes smallint DEFAULT 0,
  martes smallint DEFAULT 0,
  miercoles smallint DEFAULT 0,
  jueves smallint DEFAULT 0,
  viernes smallint DEFAULT 0,
  sabado smallint DEFAULT 0,
  semanal integer,
  mensual integer,
  volumen_compra_bs numeric,
  material_pop_asignado text,
  marca_foco_venta text,
  estado_cumplimiento text DEFAULT 'Pendiente'
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clientes_trade_lp TO anon, authenticated;
GRANT ALL ON public.clientes_trade_lp TO service_role;

ALTER TABLE public.clientes_trade_lp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read clientes" ON public.clientes_trade_lp FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public update estado" ON public.clientes_trade_lp FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public insert clientes" ON public.clientes_trade_lp FOR INSERT TO anon, authenticated WITH CHECK (true);
