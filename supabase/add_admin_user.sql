
-- This is a script to create a new admin user and add them to the admin_roles table
-- First, create the user if they don't exist
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@mosaicgrove.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
)
ON CONFLICT (email) DO NOTHING;

-- Then, add the admin role if it doesn't exist
INSERT INTO public.admin_roles (user_id, role)
SELECT id, 'super-admin'::text
FROM auth.users
WHERE email = 'admin@mosaicgrove.com'
ON CONFLICT (user_id) DO NOTHING;
