import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Sun, Moon, Menu } from 'lucide-react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <label className="swap swap-rotate" aria-label="Toggle theme">
      <input
        type="checkbox"
        checked={isDark}
        onChange={e => setIsDark(e.target.checked)}
      />
      <Sun className="swap-off h-6 w-6" />
      <Moon className="swap-on h-6 w-6" />
    </label>
  )
}

export interface NavLink {
  to: string
  label: string
}

interface NavbarProps {
  links: NavLink[]
}

export function Navbar({ links }: NavbarProps) {
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-10 mt-3 w-52 rounded-box bg-base-200 p-2 shadow"
          >
            {links.map(link => (
              <li key={link.to}>
                <Link to={link.to} activeProps={{ className: 'menu-active' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Recur
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} activeProps={{ className: 'menu-active' }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  )
}
