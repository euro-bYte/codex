// Interface for a plan feature, based on the 'plan_features' table.
export interface IPlanFeature {
  feature_id: number;
  feature_name: string;
  description?: string;
}