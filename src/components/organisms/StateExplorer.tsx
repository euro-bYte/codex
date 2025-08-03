import React, { useMemo, useState } from 'react'
import USAMapAtom from '../atoms/USAMap'
import { StateCode } from '../../types'
import { stateZipCodes, stateNames } from '../../utils/stateData'
import {
  mockInsuranceData,
  mockZipCodes,
  getZipCodeData,
} from '../../utils/mockData'
import Card from '../atoms/Card'
import Input from '../atoms/Input'

export type CustomStateFill = {
  [key in StateCode]?: { fill: string; stroke: string }
}

interface StateInsuranceStats {
  homeAverage: number
  rentersAverage: number
  totalAverage: number
  homeCount: number
  rentersCount: number
  totalCount: number
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

const StateExplorer: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateCode | null>(null)
  const [searchZip, setSearchZip] = useState<string>('')
  const [zipData, setZipData] = useState<any>(null)
  const [zipError, setZipError] = useState<string>('')

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

  const stateInsuranceStats = useMemo<StateInsuranceStats | null>(() => {
    if (!selectedState) return null
    return getStateInsuranceAverages(selectedState)
  }, [selectedState])

  const handleStateSelect = (stateCode: StateCode): void => {
    setSelectedState(stateCode === selectedState ? null : stateCode)
    // Reset zip search when selecting a new state
    setZipData(null)
    setZipError('')
  }

  const handleZipSearch = () => {
    if (!searchZip || searchZip.trim().length !== 5) {
      setZipError('Please enter a valid 5-digit ZIP code')
      setZipData(null)
      return
    }

    const zipInfo = getZipCodeData(searchZip)
    if (zipInfo) {
      setZipData(zipInfo)
      setZipError('')
    } else {
      setZipData(null)
      setZipError('No data found for this ZIP code')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Select a State</h2>
          <USAMapAtom
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
          <h2 className="text-xl font-semibold mb-4">State Information</h2>

          {selectedState ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: '#4f46e5' }}
                />
                <h3 className="text-lg font-medium">
                  {stateNames[selectedState]} ({selectedState})
                </h3>
              </div>

              {/* Insurance Premium Stats */}
              {stateInsuranceStats && stateInsuranceStats.totalCount > 0 && (
                <div className="mb-6">
                  <p className="font-medium mb-2">Insurance Averages:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Home Insurance</p>
                        <p className="text-lg font-medium">
                          ${stateInsuranceStats.homeAverage.toFixed(2)}/mo
                        </p>
                        <p className="text-xs text-gray-500">
                          {stateInsuranceStats.homeCount} policies
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Renters Insurance
                        </p>
                        <p className="text-lg font-medium">
                          ${stateInsuranceStats.rentersAverage.toFixed(2)}/mo
                        </p>
                        <p className="text-xs text-gray-500">
                          {stateInsuranceStats.rentersCount} policies
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-500">Average Premium</p>
                      <p className="text-xl font-medium">
                        ${stateInsuranceStats.totalAverage.toFixed(2)}/mo
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <p className="font-medium">ZIP Code Ranges:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {stateZipCodes[selectedState].map((zipRange, index) => (
                    <li key={index} className="text-gray-700">
                      {zipRange}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ZIP Code Search */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">ZIP Code Search</h3>
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Input
                      label="Enter ZIP Code"
                      placeholder="e.g. 90210"
                      value={searchZip}
                      onChange={(e) => setSearchZip(e.target.value)}
                      error={zipError}
                      maxLength={5}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md h-[42px] transition-colors"
                      onClick={handleZipSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>

                {zipData && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-md font-medium">
                      {zipData.city}, {zipData.state} ({zipData.zipCode})
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Average Premium</p>
                        <p className="text-lg font-medium">
                          ${zipData.averagePremium.toFixed(2)}/mo
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Policies</p>
                        <p className="text-lg font-medium">
                          {zipData.insuranceCount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-4">
                  These ZIP code ranges are approximate. For specific ZIP code
                  information, use the search above.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>Select a state to view information</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default StateExplorer
