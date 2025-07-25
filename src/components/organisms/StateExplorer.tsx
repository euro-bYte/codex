import React, { useMemo, useState } from 'react'
import USAMapAtom from '../atoms/USAMap'
import { StateCode } from '../../types'
import { stateZipCodes, stateNames } from '../../utils/stateData'
import Card from '../atoms/Card'

export type CustomStateFill = {
  [key in StateCode]?: { fill: string; stroke: string }
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

  const handleStateSelect = (stateCode: StateCode): void => {
    // TODO: add the logic to fetch ZIP code ranges for the selected state
    setSelectedState(stateCode === selectedState ? null : stateCode)
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
            Click on a state to view its ZIP code ranges
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

              <div className="space-y-2">
                <p className="font-medium">ZIP Code Ranges:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {stateZipCodes[selectedState].map((zipRange, index) => (
                    <li key={index} className="text-gray-700">
                      {zipRange}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  These ZIP code ranges are approximate. For specific ZIP code
                  information, please use the search functionality.
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
