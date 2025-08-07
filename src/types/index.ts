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

export interface StateInsuranceStats {
  homeAverage: number
  rentersAverage: number
  totalAverage: number
  homeCount: number
  rentersCount: number
  totalCount: number
}

// USA State codes type
export type StateCode =
  | 'AL'
  | 'AK'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY'
  | 'DC'
