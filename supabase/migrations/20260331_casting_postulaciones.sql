-- Tabla para postulaciones de casting (Ser Modelo para Artear)
create table if not exists public.casting_postulaciones (
  id bigserial primary key,
  nombre text not null,
  apellido text not null,
  correo text not null,
  whatsapp text not null,
  instagram text not null,
  foto_path text not null,
  foto_url text not null,
  estado text not null default 'pendiente',
  created_at timestamptz not null default now()
);

alter table public.casting_postulaciones enable row level security;

-- Permite enviar postulaciones desde la web pública.
drop policy if exists "casting_insert_anon" on public.casting_postulaciones;
create policy "casting_insert_anon"
on public.casting_postulaciones
for insert
to anon
with check (true);

-- Permite listar postulaciones desde el panel admin (usa cliente público).
drop policy if exists "casting_select_anon" on public.casting_postulaciones;
create policy "casting_select_anon"
on public.casting_postulaciones
for select
to anon
using (true);

-- Permite actualizar estado desde el panel admin (usa cliente público con login en frontend).
drop policy if exists "casting_update_anon" on public.casting_postulaciones;
create policy "casting_update_anon"
on public.casting_postulaciones
for update
to anon
using (true)
with check (true);

-- Bucket para fotos JPG del casting.
insert into storage.buckets (id, name, public)
values ('casting-modelos', 'casting-modelos', true)
on conflict (id) do nothing;

-- Permite subir fotos desde la web pública al bucket de casting.
drop policy if exists "casting_storage_insert_anon" on storage.objects;
create policy "casting_storage_insert_anon"
on storage.objects
for insert
to anon
with check (bucket_id = 'casting-modelos');

-- Permite leer fotos desde la web/admin.
drop policy if exists "casting_storage_select_anon" on storage.objects;
create policy "casting_storage_select_anon"
on storage.objects
for select
to anon
using (bucket_id = 'casting-modelos');
