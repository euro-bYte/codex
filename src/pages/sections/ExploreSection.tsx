import React, { useState } from 'react'
import { Filter, Map, BarChart3 } from 'lucide-react'
import ZipCodeSearch from '../features/ZipCodeSearch'
import ComparisonTable from '../features/ComparisonTable'
import InsuranceCard from '../features/InsuranceCard'
import Button from '../../components/atoms/Button'
import { InsuranceData } from '../../types'

interface ExploreSectionProps {
  insuranceData: InsuranceData[]
  onSearch: (zipCode: string) => void
  currentZipCode: string
}

const ExploreSection: React.FC<ExploreSectionProps> = ({
  insuranceData,
  onSearch,
  currentZipCode,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [sortBy, setSortBy] = useState<string>('monthlyPremium')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [insuranceType, setInsuranceType] = useState<string>('all')

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  // Filter by insurance type
  const filteredData =
    insuranceType === 'all'
      ? insuranceData
      : insuranceData.filter((item) => item.insuranceType === insuranceType)

  // Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'provider') {
      return sortOrder === 'asc'
        ? a.provider.localeCompare(b.provider)
        : b.provider.localeCompare(a.provider)
    } else {
      // @ts-expect-error
      const aValue = a[sortBy]
      // @ts-expect-error
      const bValue = b[sortBy]

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }
  })

  // Calculate average premium
  const avgPremium =
    filteredData.length > 0
      ? filteredData.reduce((sum, item) => sum + item.monthlyPremium, 0) /
        filteredData.length
      : 0

  return (
    <section id="explore" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Insurance Rates
          </h2>
          <p className="text-lg text-gray-700">
            Compare anonymously shared insurance rates in your area to make
            informed decisions about your coverage.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <ZipCodeSearch onSearch={onSearch} />
        </div>

        {currentZipCode && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <Map className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">
                    Results for ZIP:{' '}
                    <span className="text-blue-600">{currentZipCode}</span>
                  </h3>
                </div>
                <p className="text-gray-600 mt-1">
                  Showing {filteredData.length} insurance rates • Average
                  premium:{' '}
                  <span className="font-medium">
                    ${avgPremium.toFixed(2)}/month
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    className={`px-3 py-1.5 text-sm ${
                      viewMode === 'cards'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm ${
                      viewMode === 'table'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </button>
                </div>

                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    className={`px-3 py-1.5 text-sm ${
                      insuranceType === 'all'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setInsuranceType('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm ${
                      insuranceType === 'home'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setInsuranceType('home')}
                  >
                    Home
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm ${
                      insuranceType === 'renters'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setInsuranceType('renters')}
                  >
                    Renters
                  </button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  More Filters
                </Button>
              </div>
            </div>

            {filteredData.length > 0 ? (
              <>
                {viewMode === 'cards' ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sortedData.map((insurance) => (
                      <InsuranceCard key={insurance.id} insurance={insurance} />
                    ))}
                  </div>
                ) : (
                  <ComparisonTable
                    insuranceData={sortedData}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                )}

                <div className="mt-8 text-center">
                  <Button variant="outline">Load More Rates</Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-gray-800 mb-2">
                  No insurance data found
                </h4>
                <p className="text-gray-600 mb-6">
                  We don't have any insurance data for this zip code yet. Be the
                  first to share!
                </p>
                <Button>Share Your Insurance Details</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ExploreSection
