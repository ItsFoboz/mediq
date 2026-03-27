import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Calendar, Users, User, Settings, LogOut, Bell, ChevronRight } from 'lucide-react'

const navItems = [
  { to: '/pro', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/pro/calendar', label: 'Calendar', icon: Calendar },
  { to: '/pro/patients', label: 'Patients', icon: Users },
  { to: '/pro/profile', label: 'My Profile', icon: User },
  { to: '/pro/settings', label: 'Settings', icon: Settings },
]

export default function ProLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A6BCC] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-serif font-bold text-lg text-white">MEDIQ</span>
            <span className="text-xs text-[#1A6BCC] font-semibold bg-[#1A6BCC]/20 px-1.5 py-0.5 rounded">PRO</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1A6BCC] text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all w-full">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[#0F172A]">Doctor Portal</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-[#64748B] hover:text-[#0F172A] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 bg-[#1A6BCC] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                D
              </div>
              <div className="text-sm">
                <p className="font-medium text-[#0F172A]">Dr. Demo</p>
                <p className="text-[#94A3B8] text-xs">General Practitioner</p>
              </div>
              <ChevronRight size={14} className="text-[#94A3B8]" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
