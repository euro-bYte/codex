import React, { useState } from 'react'
import Input from '../atoms/Input'
import { mockZipCodes } from '../../utils/mockData'
import { ZipCodeData } from '../../types'

interface ZipCodeSearchProps {
  onZipDataFound?: (zipData: any) => void
  initialZipValue?: string
}

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({
  onZipDataFound,
  initialZipValue = '',
}) => {
  const [searchZip, setSearchZip] = useState<string>(initialZipValue)
  const [zipData, setZipData] = useState<any>(null)
  const [zipError, setZipError] = useState<string>('')

  const handleZipSearch = () => {
    if (!searchZip || searchZip.trim().length !== 5) {
      setZipError('Please enter a valid 5-digit ZIP code')
      setZipData(null)
      if (onZipDataFound) onZipDataFound(null)
      return
    }

    const zipInfo = getZipCodeData(searchZip)
    if (zipInfo) {
      setZipData(zipInfo)
      setZipError('')
      if (onZipDataFound) onZipDataFound(zipInfo)
    } else {
      setZipData(null)
      setZipError('No data found for this ZIP code')
      if (onZipDataFound) onZipDataFound(null)
    }
  }

  const getZipCodeData = (zipCode: string): ZipCodeData | undefined => {
    return mockZipCodes.find((data) => data.zipCode === zipCode)
  }

  return (
    <div>
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
              <p className="text-lg font-medium">{zipData.insuranceCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ZipCodeSearch
