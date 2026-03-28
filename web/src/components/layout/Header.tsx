import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuthStore } from '@/store/authStore'

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Find a Doctor', to: '/doctors' },
  { label: 'Specialties', to: '/specialties' },
  { label: 'Expat Guide', to: '/guide' },
  { label: 'MEDIQ Plus', to: '/plus' },
]

// ─── Logo ─────────────────────────────────────────────────────────────────────

const Logo: React.FC = () => (
  <Link
    to="/"
    className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50 rounded-lg"
    aria-label="MEDIQ – home"
  >
    {/* Plus/cross icon */}
    <span
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1A6BCC]"
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
        <rect x="7.5" y="2" width="3" height="14" rx="1.5" />
        <rect x="2" y="7.5" width="14" height="3" rx="1.5" />
      </svg>
    </span>
    <span className="leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--accent-primary)', fontWeight: 400, letterSpacing: '-0.02em' }}>
      MEDIQ
    </span>
  </Link>
)

// ─── User initials avatar ─────────────────────────────────────────────────────

function getInitials(name?: string, email?: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return parts[0].slice(0, 2).toUpperCase()
  }
  if (email) return email.slice(0, 2).toUpperCase()
  return 'U'
}

// ─── UserDropdown ─────────────────────────────────────────────────────────────

const UserDropdown: React.FC = () => {
  const { user, signOut } = useAuthStore()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  if (!user) return null

  const initials = getInitials(user.name, user.email)

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Open user menu"
        className="
          flex items-center gap-2 px-2 py-1.5 rounded-lg
          hover:bg-[#F7F9FC] transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50
        "
      >
        <span className="
          w-8 h-8 rounded-full bg-[#1A6BCC] text-white
          flex items-center justify-center
          text-sm font-semibold font-sans select-none
          flex-shrink-0
        ">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name ?? 'User avatar'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </span>
        <span className="hidden md:block text-sm font-medium text-[#0F172A] max-w-[120px] truncate">
          {user.name ?? user.email}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`text-[#64748B] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M2 4l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-full mt-2 w-52
            bg-white rounded-xl shadow-lg border border-[#E2E8F0]
            py-1 z-50 overflow-hidden
          "
          role="menu"
        >
          <div className="px-4 py-2.5 border-b border-[#E2E8F0]">
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {user.name ?? 'My Account'}
            </p>
            <p className="text-xs text-[#94A3B8] truncate mt-0.5">{user.email}</p>
          </div>

          {[
            { label: 'My Profile', to: '/profile' },
            { label: 'My Appointments', to: '/appointments' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="
                block px-4 py-2.5 text-sm text-[#0F172A]
                hover:bg-[#F7F9FC] transition-colors
              "
            >
              {item.label}
            </Link>
          ))}

          <div className="border-t border-[#E2E8F0] mt-1 pt-1">
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false)
                signOut()
              }}
              className="
                w-full text-left px-4 py-2.5 text-sm text-[#DC2626]
                hover:bg-red-50 transition-colors
              "
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { isAuthenticated, signOut } = useAuthStore()

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide panel */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-full max-w-xs
          bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="
              w-9 h-9 flex items-center justify-center
              rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F7F9FC]
              transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 2l14 14M16 2L2 16" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`
                      block px-4 py-3 rounded-lg text-sm font-medium
                      transition-colors duration-150
                      ${active
                        ? 'bg-[#EBF3FF] text-[#1A6BCC]'
                        : 'text-[#0F172A] hover:bg-[#F7F9FC]'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Auth buttons */}
        <div className="px-4 py-5 border-t border-[#E2E8F0] space-y-3">
          {isAuthenticated ? (
            <Button
              variant="danger"
              size="lg"
              fullWidth
              onClick={signOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/sign-in" className="block">
                <Button variant="secondary" size="lg" fullWidth>
                  Sign In
                </Button>
              </Link>
              <Link to="/get-started" className="block">
                <Button variant="primary" size="lg" fullWidth>
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

const Header: React.FC = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-[12px] border-b border-[#E2E8F0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const active =
                  location.pathname === item.to ||
                  location.pathname.startsWith(item.to + '/')
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      relative px-3 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50
                      ${active
                        ? 'text-[#1A6BCC] bg-[#EBF3FF] rounded-lg'
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F7F9FC]'
                      }
                    `}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1A6BCC] rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <>
                  <Link to="/sign-in">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/get-started">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="
                md:hidden w-9 h-9 flex items-center justify-center
                rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F7F9FC]
                transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50
              "
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 5h16M2 10h16M2 15h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div id="mobile-nav">
        <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </>
  )
}

export default Header
