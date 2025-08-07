import React from 'react'
import { StateInsuranceStats } from '../../types'

interface InsuranceStatsProps {
  stats: StateInsuranceStats
  isNational?: boolean
}

const InsuranceStats: React.FC<InsuranceStatsProps> = ({
  stats,
  isNational = false,
}) => {
  return (
    <div className="mb-6">
      <p className="font-medium mb-2">Insurance Averages:</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-500">Home Insurance</p>
            <p className="text-lg font-medium">
              ${stats.homeAverage.toFixed(2)}/mo
            </p>
            <p className="text-xs text-gray-500">{stats.homeCount} policies</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Renters Insurance</p>
            <p className="text-lg font-medium">
              ${stats.rentersAverage.toFixed(2)}/mo
            </p>
            <p className="text-xs text-gray-500">
              {stats.rentersCount} policies
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">Average Premium</p>
          <p className="text-xl font-medium">
            ${stats.totalAverage.toFixed(2)}/mo
          </p>

          {isNational && (
            <p className="text-xs text-gray-500 mt-1">
              Based on data from {stats.totalCount} policies across multiple ZIP
              codes
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InsuranceStats
