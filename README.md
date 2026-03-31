<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install` 
2. Run the app:
   `npm run dev`

## Supabase setup for Tienda checkout

To enable atomic stock updates + sale creation from the shop checkout, run this SQL migration in your Supabase project:

1. Open SQL Editor in Supabase.
2. Execute the contents of `supabase/migrations/20260331_checkout_tienda_rpc.sql`.
3. Verify the function exists: `public.checkout_tienda(text, text, jsonb)`.

## Supabase setup for Casting (Ser Modelo)

To save model applications (name, contact, Instagram and JPG photo) and show them in admin:

1. Open SQL Editor in Supabase.
2. Execute the contents of `supabase/migrations/20260331_casting_postulaciones.sql`.
3. Execute the contents of `supabase/migrations/20260331_casting_estado_update_policy.sql`.
4. Verify table exists: `public.casting_postulaciones`.
5. Verify bucket exists: `casting-modelos` (public).
6. Verify update policy exists: `casting_update_anon`.
