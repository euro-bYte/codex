import { InsuranceData, ZipCodeData } from '../types'

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
    createdAt: new Date(2023, 10, 15),
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
    createdAt: new Date(2023, 11, 5),
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
    createdAt: new Date(2023, 9, 20),
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
    createdAt: new Date(2024, 0, 10),
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
    createdAt: new Date(2023, 11, 28),
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
    createdAt: new Date(2024, 1, 5),
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
    createdAt: new Date(2023, 10, 10),
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
    createdAt: new Date(2023, 11, 20),
  },
]

export const mockZipCodes: ZipCodeData[] = [
  // California
  {
    zipCode: '90210',
    city: 'Beverly Hills',
    state: 'CA',
    averagePremium: 129.6,
    insuranceCount: 6,
  },
  {
    zipCode: '94016',
    city: 'San Francisco',
    state: 'CA',
    averagePremium: 145.8,
    insuranceCount: 8,
  },
  // New York
  {
    zipCode: '10001',
    city: 'New York',
    state: 'NY',
    averagePremium: 107.5,
    insuranceCount: 2,
  },
  {
    zipCode: '14604',
    city: 'Rochester',
    state: 'NY',
    averagePremium: 95.3,
    insuranceCount: 4,
  },
  // Texas
  {
    zipCode: '75001',
    city: 'Dallas',
    state: 'TX',
    averagePremium: 110.2,
    insuranceCount: 5,
  },
  {
    zipCode: '77001',
    city: 'Houston',
    state: 'TX',
    averagePremium: 115.7,
    insuranceCount: 7,
  },
  // Florida
  {
    zipCode: '33101',
    city: 'Miami',
    state: 'FL',
    averagePremium: 165.3,
    insuranceCount: 9,
  },
  {
    zipCode: '32801',
    city: 'Orlando',
    state: 'FL',
    averagePremium: 142.5,
    insuranceCount: 6,
  },
  // Illinois
  {
    zipCode: '60601',
    city: 'Chicago',
    state: 'IL',
    averagePremium: 118.4,
    insuranceCount: 7,
  },
  // Pennsylvania
  {
    zipCode: '19019',
    city: 'Philadelphia',
    state: 'PA',
    averagePremium: 105.8,
    insuranceCount: 5,
  },
  // Ohio
  {
    zipCode: '44101',
    city: 'Cleveland',
    state: 'OH',
    averagePremium: 89.5,
    insuranceCount: 4,
  },
  // Georgia
  {
    zipCode: '30301',
    city: 'Atlanta',
    state: 'GA',
    averagePremium: 98.7,
    insuranceCount: 6,
  },
  // North Carolina
  {
    zipCode: '28201',
    city: 'Charlotte',
    state: 'NC',
    averagePremium: 94.2,
    insuranceCount: 3,
  },
  // Michigan
  {
    zipCode: '48201',
    city: 'Detroit',
    state: 'MI',
    averagePremium: 128.3,
    insuranceCount: 5,
  },
  // New Jersey
  {
    zipCode: '07101',
    city: 'Newark',
    state: 'NJ',
    averagePremium: 135.7,
    insuranceCount: 4,
  },
  // Virginia
  {
    zipCode: '23218',
    city: 'Richmond',
    state: 'VA',
    averagePremium: 102.5,
    insuranceCount: 3,
  },
  // Washington
  {
    zipCode: '98101',
    city: 'Seattle',
    state: 'WA',
    averagePremium: 125.8,
    insuranceCount: 6,
  },
  // Arizona
  {
    zipCode: '85001',
    city: 'Phoenix',
    state: 'AZ',
    averagePremium: 108.9,
    insuranceCount: 4,
  },
  // Massachusetts
  {
    zipCode: '02108',
    city: 'Boston',
    state: 'MA',
    averagePremium: 145.2,
    insuranceCount: 6,
  },
  // Tennessee
  {
    zipCode: '37201',
    city: 'Nashville',
    state: 'TN',
    averagePremium: 92.4,
    insuranceCount: 3,
  },
  // Indiana
  {
    zipCode: '46201',
    city: 'Indianapolis',
    state: 'IN',
    averagePremium: 88.6,
    insuranceCount: 4,
  },
  // Missouri
  {
    zipCode: '63101',
    city: 'St. Louis',
    state: 'MO',
    averagePremium: 95.7,
    insuranceCount: 3,
  },
  // Maryland
  {
    zipCode: '21201',
    city: 'Baltimore',
    state: 'MD',
    averagePremium: 112.8,
    insuranceCount: 5,
  },
  // Wisconsin
  {
    zipCode: '53201',
    city: 'Milwaukee',
    state: 'WI',
    averagePremium: 87.3,
    insuranceCount: 4,
  },
  // Minnesota
  {
    zipCode: '55401',
    city: 'Minneapolis',
    state: 'MN',
    averagePremium: 93.5,
    insuranceCount: 5,
  },
  // Colorado
  {
    zipCode: '80201',
    city: 'Denver',
    state: 'CO',
    averagePremium: 115.9,
    insuranceCount: 6,
  },
  // Alabama
  {
    zipCode: '35201',
    city: 'Birmingham',
    state: 'AL',
    averagePremium: 83.2,
    insuranceCount: 3,
  },
  // South Carolina
  {
    zipCode: '29201',
    city: 'Columbia',
    state: 'SC',
    averagePremium: 86.5,
    insuranceCount: 2,
  },
  // Louisiana
  {
    zipCode: '70112',
    city: 'New Orleans',
    state: 'LA',
    averagePremium: 155.6,
    insuranceCount: 7,
  },
  // Kentucky
  {
    zipCode: '40201',
    city: 'Louisville',
    state: 'KY',
    averagePremium: 89.8,
    insuranceCount: 3,
  },
  // Oregon
  {
    zipCode: '97201',
    city: 'Portland',
    state: 'OR',
    averagePremium: 105.4,
    insuranceCount: 5,
  },
  // Oklahoma
  {
    zipCode: '73101',
    city: 'Oklahoma City',
    state: 'OK',
    averagePremium: 91.3,
    insuranceCount: 4,
  },
  // Connecticut
  {
    zipCode: '06101',
    city: 'Hartford',
    state: 'CT',
    averagePremium: 122.7,
    insuranceCount: 3,
  },
  // Iowa
  {
    zipCode: '50301',
    city: 'Des Moines',
    state: 'IA',
    averagePremium: 82.5,
    insuranceCount: 2,
  },
  // Mississippi
  {
    zipCode: '39201',
    city: 'Jackson',
    state: 'MS',
    averagePremium: 84.6,
    insuranceCount: 2,
  },
  // Arkansas
  {
    zipCode: '72201',
    city: 'Little Rock',
    state: 'AR',
    averagePremium: 85.3,
    insuranceCount: 3,
  },
  // Kansas
  {
    zipCode: '66101',
    city: 'Kansas City',
    state: 'KS',
    averagePremium: 87.9,
    insuranceCount: 4,
  },
  // Utah
  {
    zipCode: '84101',
    city: 'Salt Lake City',
    state: 'UT',
    averagePremium: 94.8,
    insuranceCount: 4,
  },
  // Nevada
  {
    zipCode: '89101',
    city: 'Las Vegas',
    state: 'NV',
    averagePremium: 118.7,
    insuranceCount: 5,
  },
  // New Mexico
  {
    zipCode: '87101',
    city: 'Albuquerque',
    state: 'NM',
    averagePremium: 92.3,
    insuranceCount: 3,
  },
  // West Virginia
  {
    zipCode: '25301',
    city: 'Charleston',
    state: 'WV',
    averagePremium: 79.6,
    insuranceCount: 2,
  },
  // Nebraska
  {
    zipCode: '68101',
    city: 'Omaha',
    state: 'NE',
    averagePremium: 84.5,
    insuranceCount: 3,
  },
  // Idaho
  {
    zipCode: '83701',
    city: 'Boise',
    state: 'ID',
    averagePremium: 89.7,
    insuranceCount: 2,
  },
  // Hawaii
  {
    zipCode: '96801',
    city: 'Honolulu',
    state: 'HI',
    averagePremium: 165.8,
    insuranceCount: 4,
  },
  // Maine
  {
    zipCode: '04101',
    city: 'Portland',
    state: 'ME',
    averagePremium: 96.3,
    insuranceCount: 2,
  },
  // New Hampshire
  {
    zipCode: '03101',
    city: 'Manchester',
    state: 'NH',
    averagePremium: 102.4,
    insuranceCount: 3,
  },
  // Rhode Island
  {
    zipCode: '02901',
    city: 'Providence',
    state: 'RI',
    averagePremium: 116.9,
    insuranceCount: 2,
  },
  // Montana
  {
    zipCode: '59601',
    city: 'Helena',
    state: 'MT',
    averagePremium: 88.2,
    insuranceCount: 2,
  },
  // Delaware
  {
    zipCode: '19801',
    city: 'Wilmington',
    state: 'DE',
    averagePremium: 106.5,
    insuranceCount: 2,
  },
  // South Dakota
  {
    zipCode: '57101',
    city: 'Sioux Falls',
    state: 'SD',
    averagePremium: 80.9,
    insuranceCount: 2,
  },
  // North Dakota
  {
    zipCode: '58501',
    city: 'Bismarck',
    state: 'ND',
    averagePremium: 77.5,
    insuranceCount: 2,
  },
  // Alaska
  {
    zipCode: '99501',
    city: 'Anchorage',
    state: 'AK',
    averagePremium: 148.3,
    insuranceCount: 3,
  },
  // Vermont
  {
    zipCode: '05401',
    city: 'Burlington',
    state: 'VT',
    averagePremium: 97.2,
    insuranceCount: 2,
  },
  // Wyoming
  {
    zipCode: '82001',
    city: 'Cheyenne',
    state: 'WY',
    averagePremium: 82.1,
    insuranceCount: 1,
  },
  // District of Columbia
  {
    zipCode: '20001',
    city: 'Washington',
    state: 'DC',
    averagePremium: 156.3,
    insuranceCount: 5,
  },
]

export const saveInsurance = (insurance: InsuranceData): void => {
  // In a real app, this would save to a database
  console.log('Saving insurance data:', insurance)
}
