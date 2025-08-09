// Interface for an insurance provider, based on the 'insurance_providers' table.
export interface IProvider {
  provider_id: number;
  name: string;
  website?: string;
  contact_email?: string;
  phone_number?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}