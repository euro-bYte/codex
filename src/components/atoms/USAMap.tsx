import React from 'react'
import { USAMap } from '@mirawision/usa-map-react'
import { StateCode } from '../../types'
import { CustomStateFill } from '../organisms/StateExplorer'

type USAMapProps = {
  onStateSelect: (state: StateCode) => void
  customStates: CustomStateFill
}

const USAMapComponent: React.FC<USAMapProps> = ({
  onStateSelect,
  customStates,
}) => {
  const mapSettings = {
    width: '100%',
    height: '100%',
  }
  // Handle state click event
  const handleStateClick = (event: string): void => {
    onStateSelect(event as StateCode)
  }

  const defaultState = {
    fill: '#E5E7EB', // Default color for unselected states
    stroke: '#9CA3AF', // Border color
    onClick: handleStateClick,
  }

  return (
    <USAMap
      defaultState={defaultState}
      customStates={customStates}
      mapSettings={mapSettings}
    />
  )
}

export default USAMapComponent
