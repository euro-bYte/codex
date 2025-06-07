import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { InsuranceData } from '../../types';

interface ComparisonTableProps {
  insuranceData: InsuranceData[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  insuranceData, 
  sortBy,
  sortOrder,
  onSort
}) => {
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return <Minus className="h-4 w-4 text-gray-300" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-blue-600" />
      : <ArrowDown className="h-4 w-4 text-blue-600" />;
  };

  const handleSort = (field: string) => {
    onSort(field);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              onClick={() => handleSort('insuranceType')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center">
                <span>Type</span>
                <span className="ml-2">{getSortIcon('insuranceType')}</span>
              </div>
            </th>
            <th 
              onClick={() => handleSort('provider')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center">
                <span>Provider</span>
                <span className="ml-2">{getSortIcon('provider')}</span>
              </div>
            </th>
            <th 
              onClick={() => handleSort('monthlyPremium')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center">
                <span>Monthly Premium</span>
                <span className="ml-2">{getSortIcon('monthlyPremium')}</span>
              </div>
            </th>
            <th 
              onClick={() => handleSort('coverageAmount')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center">
                <span>Coverage</span>
                <span className="ml-2">{getSortIcon('coverageAmount')}</span>
              </div>
            </th>
            <th 
              onClick={() => handleSort('deductible')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center">
                <span>Deductible</span>
                <span className="ml-2">{getSortIcon('deductible')}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {insuranceData.length > 0 ? (
            insuranceData.map((insurance) => (
              <tr key={insurance.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    insurance.insuranceType === 'home' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {insurance.insuranceType === 'home' ? 'Home' : 'Renters'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{insurance.provider}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">${insurance.monthlyPremium.toFixed(2)}</div>
                  <div className="text-gray-500 text-xs">${insurance.yearlyPremium.toFixed(2)}/year</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">${insurance.coverageAmount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">${insurance.deductible.toLocaleString()}</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                No insurance data found for this zip code
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;