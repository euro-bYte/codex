import React from 'react'
import { BadgeCheck, ChevronRight, Shield } from 'lucide-react'
import InsuranceForm from '../features/InsuranceForm'
import Card from '../atoms/Card'

interface ShareSectionProps {
  onSubmit: (data: any) => void
}

const ShareSection: React.FC<ShareSectionProps> = ({ onSubmit }) => {
  return (
    <section id="share" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Share Your Insurance Rate
          </h2>
          <p className="text-lg text-gray-700">
            Help others make informed decisions by anonymously sharing your
            insurance details. Your contribution matters!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">
                Submit Your Insurance Information
              </h3>
              <InsuranceForm onSubmit={onSubmit} />
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mt-1">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Why Share?</h4>
                  <p className="text-gray-600">
                    Your anonymous contribution helps create transparency in
                    insurance pricing and helps others make informed decisions.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span>Completely anonymous</span>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span>Help others save money</span>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span>Promote fair pricing</span>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span>Build community knowledge</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      Understanding Coverage Types
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      How to Lower Your Premium
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      Common Insurance Terms
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      Insurance FAQ
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShareSection
