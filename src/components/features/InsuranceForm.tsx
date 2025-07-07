import React, { useState } from 'react'
import { ChevronsDown, UploadCloud } from 'lucide-react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

interface InsuranceFormProps {
  onSubmit: (data: any) => void
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    zipCode: '',
    insuranceType: 'home',
    monthlyPremium: '',
    coverageAmount: '',
    deductible: '',
    provider: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.zipCode) {
      newErrors.zipCode = 'Zip code is required'
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit zip code'
    }

    if (!formData.monthlyPremium) {
      newErrors.monthlyPremium = 'Monthly premium is required'
    } else if (
      isNaN(Number(formData.monthlyPremium)) ||
      Number(formData.monthlyPremium) <= 0
    ) {
      newErrors.monthlyPremium = 'Please enter a valid monthly premium amount'
    }

    if (!formData.coverageAmount) {
      newErrors.coverageAmount = 'Coverage amount is required'
    } else if (
      isNaN(Number(formData.coverageAmount)) ||
      Number(formData.coverageAmount) <= 0
    ) {
      newErrors.coverageAmount = 'Please enter a valid coverage amount'
    }

    if (!formData.deductible) {
      newErrors.deductible = 'Deductible is required'
    } else if (
      isNaN(Number(formData.deductible)) ||
      Number(formData.deductible) < 0
    ) {
      newErrors.deductible = 'Please enter a valid deductible amount'
    }

    if (!formData.provider) {
      newErrors.provider = 'Insurance provider is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        ...formData,
        monthlyPremium: Number(formData.monthlyPremium),
        yearlyPremium: Number(formData.monthlyPremium) * 12,
        coverageAmount: Number(formData.coverageAmount),
        deductible: Number(formData.deductible),
        createdAt: new Date(),
        id: Date.now().toString(),
      })

      // Clear form
      setFormData({
        zipCode: '',
        insuranceType: 'home',
        monthlyPremium: '',
        coverageAmount: '',
        deductible: '',
        provider: '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Zip Code"
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Enter your 5-digit zip code"
          maxLength={5}
          error={errors.zipCode}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Type
          </label>
          <div className="relative">
            <select
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
              className="appearance-none w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="home">Home Insurance</option>
              <option value="renters">Renters Insurance</option>
            </select>
            <ChevronsDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <Input
          label="Monthly Premium ($)"
          type="number"
          name="monthlyPremium"
          value={formData.monthlyPremium}
          onChange={handleChange}
          placeholder="Enter your monthly premium"
          min="0"
          step="0.01"
          error={errors.monthlyPremium}
        />

        <Input
          label="Coverage Amount ($)"
          type="number"
          name="coverageAmount"
          value={formData.coverageAmount}
          onChange={handleChange}
          placeholder="Enter your coverage amount"
          min="0"
          error={errors.coverageAmount}
        />

        <Input
          label="Deductible ($)"
          type="number"
          name="deductible"
          value={formData.deductible}
          onChange={handleChange}
          placeholder="Enter your deductible amount"
          min="0"
          error={errors.deductible}
        />

        <Input
          label="Insurance Provider"
          type="text"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          placeholder="Enter your insurance provider"
          error={errors.provider}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full">
          <UploadCloud className="mr-2 h-5 w-5" />
          Submit Insurance Information
        </Button>
        <p className="mt-3 text-xs text-center text-gray-500">
          Your information is shared anonymously. We never display personal
          identifiers.
        </p>
      </div>
    </form>
  )
}

export default InsuranceForm
