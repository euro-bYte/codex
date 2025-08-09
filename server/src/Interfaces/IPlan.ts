// Interface for a specific insurance plan, based on the 'insurance_plans' table.
export interface IPlan {
  plan_id: number;
  provider_id: number;
  plan_name: string;
  plan_type: string;
  description?: string;
  monthly_premium: number;
  deductible?: number;
  policy_term_months?: number;
  created_at: Date;
  updated_at: Date;
}