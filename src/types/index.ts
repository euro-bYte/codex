export interface InsuranceData {
  id: string
  zipCode: string
  insuranceType: InsuranceType
  monthlyPremium: number
  yearlyPremium: number
  coverageAmount: number
  deductible: number
  provider: string
  createdAt: Date
}

export type InsuranceType = 'home' | 'renters'

export interface ZipCodeData {
  zipCode: string
  city: string
  state: string
  averagePremium: number
  insuranceCount: number
}
