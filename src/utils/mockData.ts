import { InsuranceData, ZipCodeData } from '../types';

export const mockInsuranceData: InsuranceData[] = [
  {
    id: '1',
    zipCode: '90210',
    insuranceType: 'home',
    monthlyPremium: 125,
    yearlyPremium: 1500,
    coverageAmount: 450000,
    deductible: 1000,
    provider: 'State Farm',
    createdAt: new Date(2023, 10, 15)
  },
  {
    id: '2',
    zipCode: '90210',
    insuranceType: 'home',
    monthlyPremium: 135,
    yearlyPremium: 1620,
    coverageAmount: 500000,
    deductible: 1500,
    provider: 'Allstate',
    createdAt: new Date(2023, 11, 5)
  },
  {
    id: '3',
    zipCode: '90210',
    insuranceType: 'renters',
    monthlyPremium: 22,
    yearlyPremium: 264,
    coverageAmount: 50000,
    deductible: 500,
    provider: 'Progressive',
    createdAt: new Date(2023, 9, 20)
  },
  {
    id: '4',
    zipCode: '90210',
    insuranceType: 'renters',
    monthlyPremium: 18,
    yearlyPremium: 216,
    coverageAmount: 40000,
    deductible: 250,
    provider: 'Lemonade',
    createdAt: new Date(2024, 0, 10)
  },
  {
    id: '5',
    zipCode: '90210',
    insuranceType: 'home',
    monthlyPremium: 140,
    yearlyPremium: 1680,
    coverageAmount: 525000,
    deductible: 2000,
    provider: 'Liberty Mutual',
    createdAt: new Date(2023, 11, 28)
  },
  {
    id: '6',
    zipCode: '90210',
    insuranceType: 'home',
    monthlyPremium: 130,
    yearlyPremium: 1560,
    coverageAmount: 475000,
    deductible: 1000,
    provider: 'Farmers',
    createdAt: new Date(2024, 1, 5)
  },
  // New York (10001)
  {
    id: '7',
    zipCode: '10001',
    insuranceType: 'home',
    monthlyPremium: 180,
    yearlyPremium: 2160,
    coverageAmount: 600000,
    deductible: 1500,
    provider: 'State Farm',
    createdAt: new Date(2023, 10, 10)
  },
  {
    id: '8',
    zipCode: '10001',
    insuranceType: 'renters',
    monthlyPremium: 35,
    yearlyPremium: 420,
    coverageAmount: 60000,
    deductible: 500,
    provider: 'Geico',
    createdAt: new Date(2023, 11, 20)
  }
];

export const mockZipCodes: ZipCodeData[] = [
  {
    zipCode: '90210',
    city: 'Beverly Hills',
    state: 'CA',
    averagePremium: 129.6,
    insuranceCount: 6
  },
  {
    zipCode: '10001',
    city: 'New York',
    state: 'NY',
    averagePremium: 107.5,
    insuranceCount: 2
  }
];

export const getInsuranceByZipCode = (zipCode: string): InsuranceData[] => {
  return mockInsuranceData.filter(insurance => insurance.zipCode === zipCode);
};

export const getZipCodeData = (zipCode: string): ZipCodeData | undefined => {
  return mockZipCodes.find(data => data.zipCode === zipCode);
};

export const saveInsurance = (insurance: InsuranceData): void => {
  // In a real app, this would save to a database
  console.log('Saving insurance data:', insurance);
};