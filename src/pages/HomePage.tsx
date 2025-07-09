import { Link } from '@tanstack/react-router'

import Header from './sections/Header'
import Footer from './sections/Footer'
import StateExplorer from '../components/molecules/StateExplorer'
import ButtonGroup, { ButtonItem } from '../components/molecules/ButtonGroup'
import { useState } from 'react'

function HomePage() {
  const [activeId, setActiveId] = useState<string>('btn-1')

  // Generate a specific number of buttons
  const generateButtons = (): ButtonItem[] => {
    return [
      {
        id: 'btn-1',
        label: 'Your Insurance',
      },
      {
        id: 'btn-2',
        label: 'Explore',
      },
    ]
  }

  const buttons = generateButtons()

  const handleChange = (buttonId: string) => {
    setActiveId(buttonId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="p-6">
            <div className="mb-2">
              <ButtonGroup
                buttons={buttons}
                size={'lg'}
                isJoined={true}
                activeButtonId={activeId}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Explore States & ZIP Codes
          </h2>
          <StateExplorer />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
