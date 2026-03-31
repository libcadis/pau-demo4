-- Atomic checkout RPC for shop orders.
-- Applies stock updates and creates the sale in one transaction.

create or replace function public.checkout_tienda(
  p_cliente_nombre text,
  p_cliente_telefono text,
  p_items jsonb
)
returns table (
  venta_id bigint,
  total numeric,
  detalle jsonb
)
language plpgsql
security definer
set search_path = public
as $$
declare
  item jsonb;
  v_producto_id bigint;
  v_cantidad integer;
  v_nombre text;
  v_stock integer;
  v_precio_final numeric;
  v_total numeric := 0;
  v_detalle jsonb := '[]'::jsonb;
  v_venta_id bigint;
begin
  if coalesce(trim(p_cliente_nombre), '') = '' or coalesce(trim(p_cliente_telefono), '') = '' then
    raise exception 'DATOS_CLIENTE_INVALIDOS';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'CARRITO_VACIO';
  end if;

  -- First pass: lock and validate stock for all items.
  for item in select value from jsonb_array_elements(p_items) loop
    v_producto_id := (item->>'id')::bigint;
    v_cantidad := (item->>'cantidad')::integer;

    if v_producto_id is null or v_cantidad is null or v_cantidad <= 0 then
      raise exception 'ITEM_INVALIDO';
    end if;

    select
      p.nombre,
      p.stock,
      (p.precio - (p.precio * coalesce(p.descuento, 0) / 100.0))::numeric
    into v_nombre, v_stock, v_precio_final
    from public.productos p
    where p.id = v_producto_id
      and p.activo = true
    for update;

    if not found then
      raise exception 'PRODUCTO_NO_ENCONTRADO:%', v_producto_id;
    end if;

    if v_stock < v_cantidad then
      raise exception 'STOCK_INSUFICIENTE:%', v_producto_id;
    end if;
  end loop;

  -- Second pass: perform updates and build immutable sale detail.
  for item in select value from jsonb_array_elements(p_items) loop
    v_producto_id := (item->>'id')::bigint;
    v_cantidad := (item->>'cantidad')::integer;

    select
      p.nombre,
      p.stock,
      (p.precio - (p.precio * coalesce(p.descuento, 0) / 100.0))::numeric
    into v_nombre, v_stock, v_precio_final
    from public.productos p
    where p.id = v_producto_id
      and p.activo = true
    for update;

    if v_stock < v_cantidad then
      raise exception 'STOCK_INSUFICIENTE:%', v_producto_id;
    end if;

    update public.productos
    set stock = stock - v_cantidad
    where id = v_producto_id;

    v_total := v_total + (v_precio_final * v_cantidad);
    v_detalle := v_detalle || jsonb_build_array(jsonb_build_object(
      'id', v_producto_id,
      'nombre', v_nombre,
      'precio', v_precio_final,
      'cantidad', v_cantidad
    ));
  end loop;

  insert into public.ventas (
    detalle,
    total,
    cliente_nombre,
    cliente_telefono,
    estado
  )
  values (
    v_detalle,
    v_total,
    p_cliente_nombre,
    p_cliente_telefono,
    'pendiente'
  )
  returning id into v_venta_id;

  return query
  select v_venta_id, v_total, v_detalle;
end;
$$;

grant execute on function public.checkout_tienda(text, text, jsonb) to anon;
grant execute on function public.checkout_tienda(text, text, jsonb) to authenticated;
