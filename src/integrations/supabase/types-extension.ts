
// This file extends the auto-generated Supabase types with custom types
// for tables that haven't been added to the auto-generated types yet

export interface InvestorStatusRow {
  id: string;
  investor_email: string;
  reached_out: boolean;
  committed: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
