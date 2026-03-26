import React from 'react'
import { Link } from 'react-router-dom'

// ─── Logo ─────────────────────────────────────────────────────────────────────

const FooterLogo: React.FC = () => (
  <Link
    to="/"
    className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg w-fit"
    aria-label="MEDIQ – home"
  >
    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1A6BCC]" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
        <rect x="7.5" y="2" width="3" height="14" rx="1.5" />
        <rect x="2" y="7.5" width="14" height="3" rx="1.5" />
      </svg>
    </span>
    <span className="font-serif font-bold text-xl text-white tracking-tight leading-none">
      MEDIQ
    </span>
  </Link>
)

// ─── Social icons ─────────────────────────────────────────────────────────────

const TwitterIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

// ─── Footer link group ────────────────────────────────────────────────────────

interface FooterLink {
  label: string
  to: string
  external?: boolean
}

interface FooterColumnProps {
  heading: string
  links: FooterLink[]
}

const FooterColumn: React.FC<FooterColumnProps> = ({ heading, links }) => (
  <div>
    <h3 className="text-white text-sm font-semibold font-sans mb-4">{heading}</h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.to}>
          {link.external ? (
            <a
              href={link.to}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-white text-sm font-sans transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              to={link.to}
              className="text-[#94A3B8] hover:text-white text-sm font-sans transition-colors"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
)

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  const forPatients: FooterLink[] = [
    { label: 'Find Doctors', to: '/doctors' },
    { label: 'Browse Specialties', to: '/specialties' },
    { label: 'Symptom Checker', to: '/symptoms' },
    { label: 'Expat Guide', to: '/guide' },
    { label: 'MEDIQ Plus', to: '/plus' },
  ]

  const forDoctors: FooterLink[] = [
    { label: 'Join as a Doctor', to: '/pro/join' },
    { label: 'Doctor Login', to: '/pro/login' },
    { label: 'Pricing', to: '/pro/pricing' },
    { label: 'Support', to: '/pro/support' },
  ]

  const resources: FooterLink[] = [
    { label: 'FAQ', to: '/faq' },
    { label: 'Blog', to: '/blog' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <footer className="bg-[#0F172A]" aria-label="Site footer">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 – Brand */}
          <div className="col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="mt-3 text-[#94A3B8] text-sm font-sans leading-relaxed">
              Bulgarian healthcare, finally in English.
            </p>
            <p className="mt-2 text-[#64748B] text-xs font-sans leading-relaxed">
              MEDIQ connects English-speaking expats and tourists with qualified, English-speaking
              doctors across Bulgaria.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com/mediqbg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MEDIQ on X (Twitter)"
                className="
                  w-9 h-9 flex items-center justify-center rounded-lg
                  text-[#64748B] hover:text-white hover:bg-white/10
                  transition-colors
                "
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com/company/mediqbg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MEDIQ on LinkedIn"
                className="
                  w-9 h-9 flex items-center justify-center rounded-lg
                  text-[#64748B] hover:text-white hover:bg-white/10
                  transition-colors
                "
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Col 2 – For Patients */}
          <FooterColumn heading="For Patients" links={forPatients} />

          {/* Col 3 – For Doctors */}
          <FooterColumn heading="For Doctors" links={forDoctors} />

          {/* Col 4 – Resources */}
          <FooterColumn heading="Resources" links={resources} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#64748B]">
            <span>© {year} MEDIQ. All rights reserved.</span>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* GDPR badge */}
              <span className="
                inline-flex items-center gap-1.5 px-2.5 py-1
                rounded-full bg-white/5 border border-white/10
                text-[#94A3B8]
              ">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="6" r="5" />
                  <path d="M4 6l1.5 1.5L8 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                GDPR Compliant
              </span>

              <span>Made for expats in Bulgaria 🇧🇬</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
