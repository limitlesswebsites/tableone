
export interface InvestorInterest {
  email: string;
  investment_amount: number;
  created_at: string;
  id: string;
}

export interface InvestorStatus {
  id: string;
  investor_email: string;
  reached_out: boolean;
  committed: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CombinedInvestorData = InvestorInterest & {
  status?: InvestorStatus;
  isEditing?: boolean;
  editedNotes?: string;
};

export type SortField = 'email' | 'investment_amount' | 'created_at';
export type SortOrder = 'asc' | 'desc';
