
ALTER TABLE public.investment_interests REPLICA IDENTITY FULL;

-- Enable realtime for the investment_interests table
ALTER publication supabase_realtime ADD TABLE investment_interests;
