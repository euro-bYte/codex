import React from 'react'
import { Shield, DollarSign, Home, Info } from 'lucide-react'
import Card from '../../components/atoms/Card'
import Badge from '../../components/atoms/Badge'
import { InsuranceData } from '../../types'

interface InsuranceCardProps {
  insurance: InsuranceData
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ insurance }) => {
  const formattedDate = new Date(insurance.createdAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  )

  return (
    <Card className="hover:translate-y-[-4px] transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <Badge
          variant={insurance.insuranceType === 'home' ? 'primary' : 'secondary'}
        >
          {insurance.insuranceType === 'home' ? 'Home' : 'Renters'} Insurance
        </Badge>
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </div>

      <div className="flex items-center mb-4">
        <Shield className="h-6 w-6 text-blue-600 mr-2" />
        <span className="font-semibold text-lg">{insurance.provider}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-gray-500 mb-1">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-xs">Monthly Premium</span>
          </div>
          <div className="font-bold text-lg">
            ${insurance.monthlyPremium.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-gray-500 mb-1">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-xs">Yearly Premium</span>
          </div>
          <div className="font-bold text-lg">
            ${insurance.yearlyPremium.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="flex items-center text-gray-600">
            <Home className="h-4 w-4 mr-2" />
            <span>Coverage Amount</span>
          </div>
          <span className="font-medium">
            ${insurance.coverageAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center text-gray-600">
            <Info className="h-4 w-4 mr-2" />
            <span>Deductible</span>
          </div>
          <span className="font-medium">
            ${insurance.deductible.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center text-gray-600">
            <Info className="h-4 w-4 mr-2" />
            <span>Location</span>
          </div>
          <span className="font-medium">ZIP: {insurance.zipCode}</span>
        </div>
      </div>
    </Card>
  )
}

export default InsuranceCard
