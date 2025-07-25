import React from 'react'
import Modal from '../atoms/Modal'
import InsuranceForm from '../organisms/InsuranceForm'
import { InsuranceData } from '../../types'

interface AddPolicyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (policy: Omit<InsuranceData, 'id' | 'createdAt'>) => void
  initialZipCode?: string
}

const AddPolicyModal: React.FC<AddPolicyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialZipCode = '',
}) => {
  const handleSubmit = (formData: any) => {
    // Convert string values to appropriate types
    const newPolicy = {
      zipCode: formData.zipCode,
      insuranceType: formData.insuranceType,
      monthlyPremium: parseFloat(formData.monthlyPremium),
      yearlyPremium: parseFloat(formData.yearlyPremium),
      coverageAmount: parseFloat(formData.coverageAmount),
      deductible: parseFloat(formData.deductible),
      provider: formData.provider,
      // The ID and createdAt will be added by the backend/parent component
    }

    onSave(newPolicy)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Insurance Policy"
      size="lg"
    >
      <InsuranceForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        initialData={{ zipCode: initialZipCode }}
      />
    </Modal>
  )
}

export default AddPolicyModal
