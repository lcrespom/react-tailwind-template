import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
