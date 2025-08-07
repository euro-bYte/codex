import React, { useMemo, useState } from 'react'
import USAMap from '../atoms/USAMap'
import { StateCode, StateInsuranceStats } from '../../types'
import { stateNames } from '../../utils/stateData'
import { mockInsuranceData, mockZipCodes } from '../../utils/mockData'
import Card from '../atoms/Card'
import ZipCodeSearch from '../molecules/ZipCodeSearch'
import InsuranceStats from '../molecules/InsuranceStats'

export type CustomStateFill = {
  [key in StateCode]?: { fill: string; stroke: string }
}

// Helper function to calculate insurance averages by state
const getStateInsuranceAverages = (
  stateCode: StateCode
): StateInsuranceStats => {
  // Find ZIP codes in the state
  const stateZips = mockZipCodes.filter((zip) => zip.state === stateCode)

  // Get all insurance data for those ZIP codes
  const stateInsurance = mockInsuranceData.filter((insurance) =>
    stateZips.some((zip) => zip.zipCode === insurance.zipCode)
  )

  const homeInsurance = stateInsurance.filter(
    (ins) => ins.insuranceType === 'home'
  )
  const rentersInsurance = stateInsurance.filter(
    (ins) => ins.insuranceType === 'renters'
  )

  const homeTotal = homeInsurance.reduce(
    (sum, ins) => sum + ins.monthlyPremium,
    0
  )
  const rentersTotal = rentersInsurance.reduce(
    (sum, ins) => sum + ins.monthlyPremium,
    0
  )

  return {
    homeAverage:
      homeInsurance.length > 0 ? homeTotal / homeInsurance.length : 0,
    rentersAverage:
      rentersInsurance.length > 0 ? rentersTotal / rentersInsurance.length : 0,
    totalAverage:
      stateInsurance.length > 0
        ? (homeTotal + rentersTotal) / stateInsurance.length
        : 0,
    homeCount: homeInsurance.length,
    rentersCount: rentersInsurance.length,
    totalCount: stateInsurance.length,
  }
}

// Helper function to calculate national insurance averages
const getNationalInsuranceAverages = (): StateInsuranceStats => {
  const homeInsurance = mockInsuranceData.filter(
    (ins) => ins.insuranceType === 'home'
  )
  const rentersInsurance = mockInsuranceData.filter(
    (ins) => ins.insuranceType === 'renters'
  )

  const homeTotal = homeInsurance.reduce(
    (sum, ins) => sum + ins.monthlyPremium,
    0
  )
  const rentersTotal = rentersInsurance.reduce(
    (sum, ins) => sum + ins.monthlyPremium,
    0
  )

  return {
    homeAverage:
      homeInsurance.length > 0 ? homeTotal / homeInsurance.length : 0,
    rentersAverage:
      rentersInsurance.length > 0 ? rentersTotal / rentersInsurance.length : 0,
    totalAverage:
      mockInsuranceData.length > 0
        ? (homeTotal + rentersTotal) / mockInsuranceData.length
        : 0,
    homeCount: homeInsurance.length,
    rentersCount: rentersInsurance.length,
    totalCount: mockInsuranceData.length,
  }
}

const StateExplorer: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateCode | null>(null)

  const customStates = useMemo<CustomStateFill>(() => {
    const stateFill: CustomStateFill = {}

    if (selectedState) {
      stateFill[selectedState] = {
        fill: '#4f46e5', // Color for the selected state
        stroke: '#ffffff', // Border color for the selected state
      }
    }

    return stateFill
  }, [selectedState])

  const nationalInsuranceStats = useMemo<StateInsuranceStats>(() => {
    return getNationalInsuranceAverages()
  }, [])

  const stateInsuranceStats = useMemo<StateInsuranceStats | null>(() => {
    if (!selectedState) return null
    return getStateInsuranceAverages(selectedState)
  }, [selectedState])

  const handleStateSelect = (stateCode: StateCode): void => {
    setSelectedState(stateCode === selectedState ? null : stateCode)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Select a State</h2>
          <USAMap
            onStateSelect={handleStateSelect}
            customStates={customStates}
          />
          <p className="text-sm text-gray-500 mt-2">
            Click on a state to view its ZIP code ranges and insurance averages
          </p>
        </Card>
      </div>

      <div>
        <Card className="p-4 h-full">
          <h2 className="text-xl font-semibold mb-4">
            {selectedState ? 'State Information' : 'National Information'}
          </h2>

          {selectedState ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: '#4f46e5' }}
                  />
                  <h3 className="text-lg font-medium">
                    {stateNames[selectedState]} ({selectedState})
                  </h3>
                </div>
              </div>

              {/* Insurance Premium Stats */}
              {stateInsuranceStats && stateInsuranceStats.totalCount > 0 && (
                <InsuranceStats stats={stateInsuranceStats} />
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-blue-200" />
                <h3 className="text-lg font-medium">National Averages</h3>
              </div>

              {/* National Insurance Premium Stats */}
              <InsuranceStats
                stats={nationalInsuranceStats}
                isNational={true}
              />

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Select a state on the map to see state-specific insurance data
                  and ZIP code ranges.
                </p>
              </div>
            </div>
          )}
          {/* ZIP Code Search */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <ZipCodeSearch />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StateExplorer
