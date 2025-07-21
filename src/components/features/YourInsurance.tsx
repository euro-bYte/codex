import React from 'react'
import Card from '../atoms/Card'
import Button from '../atoms/Button'
import { InsuranceData } from '../../types'

interface YourInsuranceProps {
  userInsurances?: InsuranceData[]
}

const YourInsurance: React.FC<YourInsuranceProps> = ({
  userInsurances = [],
}) => {
  // Mock data if no insurance data is provided
  const mockInsurances: InsuranceData[] = [
    {
      id: '1',
      zipCode: '90210',
      insuranceType: 'home',
      monthlyPremium: 125,
      yearlyPremium: 1500,
      coverageAmount: 350000,
      deductible: 1000,
      provider: 'SafeGuard Insurance',
      createdAt: new Date('2025-03-15'),
    },
    {
      id: '2',
      zipCode: '90210',
      insuranceType: 'renters',
      monthlyPremium: 45,
      yearlyPremium: 540,
      coverageAmount: 50000,
      deductible: 500,
      provider: 'Urban Shield Co.',
      createdAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    },
  ]

  const insurances = userInsurances.length > 0 ? userInsurances : mockInsurances

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Your Insurance Policies</h3>
        <Button variant="outline" size="sm">
          Add New Policy
        </Button>
      </div>

      {insurances.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500 mb-4">
            You don't have any insurance policies yet.
          </p>
          <Button>Add Your First Policy</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {insurances.map((insurance) => (
            <Card key={insurance.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold">
                      {insurance.provider}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                      {insurance.insuranceType}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    ZIP Code: {insurance.zipCode}
                  </p>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Premium</p>
                      <p className="font-medium">
                        {formatCurrency(insurance.monthlyPremium)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Yearly Premium</p>
                      <p className="font-medium">
                        {formatCurrency(insurance.yearlyPremium)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coverage Amount</p>
                      <p className="font-medium">
                        {formatCurrency(insurance.coverageAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deductible</p>
                      <p className="font-medium">
                        {formatCurrency(insurance.deductible)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-500">Added on</p>
                  <p className="text-sm">{formatDate(insurance.createdAt)}</p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Compare Your Rates
        </h4>
        <p className="text-sm text-gray-600">
          See how your insurance rates compare to others in your area. This can
          help you negotiate better rates with your provider.
        </p>
        <Button variant="ghost" size="sm" className="mt-2">
          Compare Now
        </Button>
      </div>
    </div>
  )
}

export default YourInsurance
