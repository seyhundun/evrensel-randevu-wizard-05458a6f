CREATE TABLE public.idata_tracking_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'info',
  message TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.idata_tracking_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to idata_tracking_logs" ON public.idata_tracking_logs FOR ALL USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.idata_tracking_logs;