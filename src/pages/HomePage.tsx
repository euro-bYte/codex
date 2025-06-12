import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'
import { Link } from '@tanstack/react-router'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <p className="mb-4">
            This is your personalized home page where you can manage your
            insurance information.
          </p>

          <div className="mt-6">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Back to Landing Page
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
