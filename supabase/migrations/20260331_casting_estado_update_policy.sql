-- Habilita actualizacion de estado de postulaciones de casting desde admin.
drop policy if exists "casting_update_anon" on public.casting_postulaciones;
create policy "casting_update_anon"
on public.casting_postulaciones
for update
to anon
using (true)
with check (true);
