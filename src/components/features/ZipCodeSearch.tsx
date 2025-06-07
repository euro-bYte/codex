import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ZipCodeSearchProps {
  onSearch: (zipCode: string) => void;
}

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({ onSearch }) => {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode) {
      setError('Please enter a zip code');
      return;
    }
    
    if (!/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }
    
    setError('');
    onSearch(zipCode);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-grow">
        <Input
          placeholder="Enter zip code to compare rates"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
            if (error) setError('');
          }}
          className="w-full h-12"
          error={error}
        />
      </div>
      <Button type="submit" className="h-12 px-6 whitespace-nowrap">
        <Search className="h-5 w-5 mr-2" />
        Find Rates
      </Button>
    </form>
  );
};

export default ZipCodeSearch;