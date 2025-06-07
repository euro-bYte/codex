export interface InsuranceData {
  id: string;
  zipCode: string;
  insuranceType: 'home' | 'renters';
  monthlyPremium: number;
  yearlyPremium: number;
  coverageAmount: number;
  deductible: number;
  provider: string;
  createdAt: Date;
}

export interface ZipCodeData {
  zipCode: string;
  city: string;
  state: string;
  averagePremium: number;
  insuranceCount: number;
}