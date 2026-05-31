/*
  # Add Bulk User Credentials

  1. Purpose
    Insert 100 placeholder reponedor users (RV-0001 to RV-0100) and 100 supervisor users (SV-0001 to SV-0100).
  
  2. Credentials
    - Reponedores: ID format RV-XXXX, password: '1234'
    - Supervisores: ID format SV-XXXX, password: '4321'
  
  3. Security Notes
    - These are default placeholder passwords for development/demo purposes
    - All users are set to 'activo = true' by default
    - Names are auto-generated as "Reponedor XXXX" and "Supervisor XXXX"
  
  4. Important Considerations
    - Uses ON CONFLICT DO NOTHING to prevent duplicate inserts
    - Uses uuid_generate_v4() for primary keys
*/

-- Insert 100 reponedores (RV-0001 to RV-0100)
INSERT INTO credenciales_accesos (codigo, password, rol, nombre_asignado, activo)
SELECT 
  'RV-' || LPAD(i::text, 4, '0'),
  '1234',
  'REPONEDOR',
  'Reponedor ' || LPAD(i::text, 4, '0'),
  true
FROM generate_series(1, 100) AS i
ON CONFLICT (codigo) DO NOTHING;

-- Insert 100 supervisores (SV-0001 to SV-0100)
INSERT INTO credenciales_accesos (codigo, password, rol, nombre_asignado, activo)
SELECT 
  'SV-' || LPAD(i::text, 4, '0'),
  '4321',
  'SUPERVISOR',
  'Supervisor ' || LPAD(i::text, 4, '0'),
  true
FROM generate_series(1, 100) AS i
ON CONFLICT (codigo) DO NOTHING;
