import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FileUpload from '../atoms/FileUpload';
import { InsuranceType } from '../../types';

interface InsuranceFormData {
  insuranceType: InsuranceType;
  provider: string;
  zipCode: string;
  monthlyPremium: string;
  yearlyPremium: string;
  coverageAmount: string;
  deductible: string;
  policyDocument: File | null;
}

interface InsuranceFormProps {
  onSubmit: (data: InsuranceFormData) => void;
  onCancel: () => void;
  initialData?: Partial<InsuranceFormData>;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<InsuranceFormData>({
    insuranceType: initialData.insuranceType || 'home',
    provider: initialData.provider || '',
    zipCode: initialData.zipCode || '',
    monthlyPremium: initialData.monthlyPremium?.toString() || '',
    yearlyPremium: initialData.yearlyPremium?.toString() || '',
    coverageAmount: initialData.coverageAmount?.toString() || '',
    deductible: initialData.deductible?.toString() || '',
    policyDocument: initialData.policyDocument || null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InsuranceFormData, string>>>({});
  const [isAutoCalculate, setIsAutoCalculate] = useState(true);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InsuranceFormData, string>> = {};
    
    if (!formData.provider.trim()) {
      newErrors.provider = 'Provider is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Enter a valid ZIP code (e.g., 90210 or 90210-1234)';
    }
    
    if (!formData.monthlyPremium) {
      newErrors.monthlyPremium = 'Monthly premium is required';
    } else if (isNaN(parseFloat(formData.monthlyPremium)) || parseFloat(formData.monthlyPremium) <= 0) {
      newErrors.monthlyPremium = 'Monthly premium must be a positive number';
    }
    
    if (!isAutoCalculate) {
      if (!formData.yearlyPremium) {
        newErrors.yearlyPremium = 'Yearly premium is required';
      } else if (isNaN(parseFloat(formData.yearlyPremium)) || parseFloat(formData.yearlyPremium) <= 0) {
        newErrors.yearlyPremium = 'Yearly premium must be a positive number';
      }
    }
    
    if (!formData.coverageAmount) {
      newErrors.coverageAmount = 'Coverage amount is required';
    } else if (isNaN(parseFloat(formData.coverageAmount)) || parseFloat(formData.coverageAmount) <= 0) {
      newErrors.coverageAmount = 'Coverage amount must be a positive number';
    }
    
    if (!formData.deductible) {
      newErrors.deductible = 'Deductible is required';
    } else if (isNaN(parseFloat(formData.deductible)) || parseFloat(formData.deductible) < 0) {
      newErrors.deductible = 'Deductible must be a non-negative number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      
      // Auto-calculate yearly premium from monthly (multiply by 12)
      if (name === 'monthlyPremium' && isAutoCalculate) {
        const monthly = parseFloat(value);
        if (!isNaN(monthly)) {
          updatedData.yearlyPremium = (monthly * 12).toString();
        } else {
          updatedData.yearlyPremium = '';
        }
      }
      
      // Auto-calculate monthly premium from yearly (divide by 12)
      if (name === 'yearlyPremium' && !isAutoCalculate) {
        const yearly = parseFloat(value);
        if (!isNaN(yearly)) {
          updatedData.monthlyPremium = (yearly / 12).toFixed(2);
        } else {
          updatedData.monthlyPremium = '';
        }
      }
      
      return updatedData;
    });
  };

  const handleFileSelect = (file: File) => {
    setFormData(prev => ({
      ...prev,
      policyDocument: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        monthlyPremium: formData.monthlyPremium,
        yearlyPremium: formData.yearlyPremium,
        coverageAmount: formData.coverageAmount,
        deductible: formData.deductible,
      });
    }
  };

  const toggleCalculationMode = () => {
    setIsAutoCalculate(prev => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Insurance Type
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="insuranceType"
              value="home"
              checked={formData.insuranceType === 'home'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Home Insurance</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="insuranceType"
              value="renters"
              checked={formData.insuranceType === 'renters'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Renters Insurance</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Insurance Provider"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          placeholder="e.g., State Farm, Allstate"
          error={errors.provider}
          required
        />
        
        <Input
          label="ZIP Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="e.g., 90210"
          error={errors.zipCode}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Monthly Premium"
            name="monthlyPremium"
            type="number"
            min="0"
            step="0.01"
            value={formData.monthlyPremium}
            onChange={handleChange}
            placeholder="e.g., 125.00"
            error={errors.monthlyPremium}
            required
          />
        </div>
        
        <div>
          <Input
            label="Yearly Premium"
            name="yearlyPremium"
            type="number"
            min="0"
            step="0.01"
            value={formData.yearlyPremium}
            onChange={handleChange}
            placeholder="e.g., 1500.00"
            error={errors.yearlyPremium}
            disabled={isAutoCalculate}
            required={!isAutoCalculate}
          />
          <div className="mt-1">
            <label className="inline-flex items-center text-xs text-gray-500">
              <input
                type="checkbox"
                checked={isAutoCalculate}
                onChange={toggleCalculationMode}
                className="h-3 w-3 text-blue-600 focus:ring-blue-500 mr-1"
              />
              Auto-calculate yearly premium (monthly × 12)
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Coverage Amount"
          name="coverageAmount"
          type="number"
          min="0"
          step="1000"
          value={formData.coverageAmount}
          onChange={handleChange}
          placeholder="e.g., 350000"
          error={errors.coverageAmount}
          required
        />
        
        <Input
          label="Deductible"
          name="deductible"
          type="number"
          min="0"
          step="100"
          value={formData.deductible}
          onChange={handleChange}
          placeholder="e.g., 1000"
          error={errors.deductible}
          required
        />
      </div>

      <div className="mt-6">
        <FileUpload
          label="Policy Document"
          helperText="Upload your Certificate of Insurance (COI) or policy document (PDF, JPG, PNG)"
          onFileSelect={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={10}
          selectedFile={formData.policyDocument}
        />
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
        >
          Save Policy
        </Button>
      </div>
    </form>
  );
};

export default InsuranceForm;
