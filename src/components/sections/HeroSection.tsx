import React from 'react';
import { Search, Shield, Lock } from 'lucide-react';
import ZipCodeSearch from '../features/ZipCodeSearch';

interface HeroSectionProps {
  onSearch: (zipCode: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <section id="home" className="relative pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-white z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Compare Insurance Rates
              <span className="text-blue-600"> Anonymously</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Share your home or renters insurance information anonymously and see how your rates compare to others in your area.
            </p>

            <div className="mb-8">
              <ZipCodeSearch onSearch={onSearch} />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-blue-100 rounded-full h-10 w-10 mr-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">100% Anonymous</p>
                  <p className="text-sm text-gray-600">No personal data required</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center bg-blue-100 rounded-full h-10 w-10 mr-3">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Secure Sharing</p>
                  <p className="text-sm text-gray-600">Your data is protected</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-400 rounded-full opacity-20 filter blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500 rounded-full opacity-20 filter blur-xl"></div>

              <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-lg mb-6 inline-block">
                  Average in 90210
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Home Insurance</p>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold">$125/mo</div>
                      <div className="text-green-600 text-sm">5% below average</div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Renters Insurance</p>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold">$22/mo</div>
                      <div className="text-red-600 text-sm">7% above average</div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-gray-500">Based on</span>
                      </div>
                      <span className="font-medium">143 anonymous submissions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;