ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_code text UNIQUE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cod';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_area text;
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'placed';
CREATE INDEX IF NOT EXISTS orders_code_phone_idx ON public.orders(order_code, phone);