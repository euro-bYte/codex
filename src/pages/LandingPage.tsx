import { useState } from 'react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import HeroSection from '../components/sections/HeroSection';
import ShareSection from '../components/sections/ShareSection';
import ExploreSection from '../components/sections/ExploreSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import { mockInsuranceData, saveInsurance } from '../utils/mockData';
import { InsuranceData } from '../types';
import { Link } from '@tanstack/react-router';

function LandingPage() {
  const [currentZipCode, setCurrentZipCode] = useState<string>('90210');
  const [insuranceData, setInsuranceData] = useState<InsuranceData[]>(
    mockInsuranceData.filter(insurance => insurance.zipCode === currentZipCode)
  );

  const handleSearch = (zipCode: string) => {
    setCurrentZipCode(zipCode);
    const filteredData = mockInsuranceData.filter(insurance => insurance.zipCode === zipCode);
    setInsuranceData(filteredData);
    
    // Scroll to explore section
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitInsurance = (data: InsuranceData) => {
    saveInsurance(data);
    
    // Update state if the submitted insurance matches the current zip code
    if (data.zipCode === currentZipCode) {
      setInsuranceData(prevData => [...prevData, data]);
    }
    
    // Show success message or modal (in a real app)
    alert('Thank you for sharing your insurance information!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} />
        <FeaturesSection />
        <ShareSection onSubmit={handleSubmitInsurance} />
        <ExploreSection 
          insuranceData={insuranceData} 
          onSearch={handleSearch}
          currentZipCode={currentZipCode}
        />
        <div className="text-center py-4">
          <Link to="/home" className="text-blue-600 hover:text-blue-800 underline">
            Go to Home Page
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default LandingPage;