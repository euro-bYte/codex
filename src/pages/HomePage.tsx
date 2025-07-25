import Header from './sections/Header'
import Footer from './sections/Footer'
import StateExplorer from '../components/organisms/StateExplorer'
import ButtonGroup, { ButtonItem } from '../components/molecules/ButtonGroup'
import YourInsurance from '../components/organisms/YourInsurance'
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
        label: 'Explore Rates',
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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {activeId === 'btn-1'
                ? 'Your Insurance Policies'
                : 'Explore States & ZIP Codes'}
            </h2>
            <ButtonGroup
              buttons={buttons}
              size={'md'}
              isJoined={true}
              activeButtonId={activeId}
              onChange={handleChange}
              className="shadow-sm"
            />
          </div>
          {activeId === 'btn-1' ? <YourInsurance /> : <StateExplorer />}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
