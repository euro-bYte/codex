import React from 'react'
import { TrendingUp, Shield, Eye, Users, Lock, BarChart3 } from 'lucide-react'

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Use InsurCompare
          </h2>
          <p className="text-lg text-gray-700">
            Our platform provides transparent, anonymous insurance rate
            comparisons to help you find the best coverage for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-center bg-blue-100 h-14 w-14 rounded-lg mb-4">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Anonymity</h3>
            <p className="text-gray-600">
              Share your insurance information without revealing your identity.
              We never collect personal identifiers.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-center bg-blue-100 h-14 w-14 rounded-lg mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rate Comparisons</h3>
            <p className="text-gray-600">
              See how your insurance rates stack up against others in your area
              with detailed side-by-side comparisons.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-center bg-blue-100 h-14 w-14 rounded-lg mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Insurance Insights</h3>
            <p className="text-gray-600">
              Get helpful tips and insights on what factors affect your
              insurance premiums and how to optimize your coverage.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-center bg-blue-100 h-14 w-14 rounded-lg mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Powered</h3>
            <p className="text-gray-600">
              Our data comes from users like you, creating a powerful community
              resource that grows more valuable over time.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-center bg-blue-100 h-14 w-14 rounded-lg mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Your data is handled with the highest security standards. We
              employ advanced encryption and protection protocols.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-center bg-blue-100 h-14 w-14 rounded-lg mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Data</h3>
            <p className="text-gray-600">
              Understand insurance trends through easy-to-read charts and visual
              representations of rate data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
