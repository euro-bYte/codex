import React from 'react'
import Button from '../atoms/Button'

type ButtonVariantStyles = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSizeStyles = 'sm' | 'md' | 'lg'

export interface ButtonItem {
  id: string
  label: string
  variant?: ButtonVariantStyles
  disabled?: boolean
  onClick?: () => void
}

interface ButtonGroupProps {
  buttons: ButtonItem[]
  size?: ButtonSizeStyles
  activeButtonId?: string
  isJoined?: boolean
  className?: string
  onChange?: (buttonId: string) => void
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  size = 'md',
  activeButtonId,
  isJoined = true,
  className = '',
  onChange,
}) => {
  if (!buttons || buttons.length === 0) {
    return null
  }

  const handleButtonClick = (buttonId: string) => {
    if (onChange) {
      onChange(buttonId)
    }
  }

  const getButtonVariant = (button: ButtonItem): ButtonVariantStyles => {
    if (button.variant) {
      return button.variant
    }
    return activeButtonId === button.id ? 'primary' : 'outline'
  }

  const joinedStyles = isJoined ? 'inline-flex' : 'inline-flex gap-2'

  // Special style for joined buttons
  const getButtonClassName = (index: number): string => {
    if (!isJoined) return ''

    if (index === 0) {
      return 'rounded-r-none border-r-0'
    } else if (index === buttons.length - 1) {
      return 'rounded-l-none border-l-0'
    } else {
      return 'rounded-none border-l-0 border-r-0'
    }
  }

  return (
    <div className={`${joinedStyles} ${className}`} role="group">
      {buttons.map((button, index) => (
        <Button
          key={button.id}
          variant={getButtonVariant(button)}
          size={size}
          disabled={button.disabled}
          onClick={() => {
            if (button.onClick) button.onClick()
            handleButtonClick(button.id)
          }}
          className={getButtonClassName(index)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}

export default ButtonGroup
