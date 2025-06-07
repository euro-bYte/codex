import { 
  Router,
  Route,
  createBrowserHistory,
  createRootRouteWithContext
} from '@tanstack/react-router'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'

const browserHistory = createBrowserHistory()

// Define your root route
const rootRoute = createRootRouteWithContext<{}>()()

// Define child routes
const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomePage
})

// Create and export the router
const routeTree = rootRoute.addChildren([landingRoute, homeRoute])
const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  history: browserHistory
})

// Register the router for typings
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }