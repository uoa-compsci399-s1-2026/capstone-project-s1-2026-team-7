'use client'

import React, { useState } from 'react'

const navLinks = ['Research', 'Our Team', 'Studies', 'Collaborations', 'Media']

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-[#D9D9D9] bg-[#F7F7F7]">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-8 max-[860px]:px-4">
        <div className="flex shrink-0 items-center gap-4 max-[860px]:gap-3">
          <div className="flex items-center shrink-0">
            <img
              src="https://i0.wp.com/vhin.co.nz/wp-content/uploads/2025/08/UoA-Logo-Primary-RGB-Small.png?ssl=1"
              alt="University of Auckland logo"
              style={{ height: '32px', width: 'auto' }}
              className="object-contain"
            />
          </div>

          <div className="h-[36px] w-px bg-[#BFC4CC]" />

          <div className="flex items-center shrink-0">
            <img
              src="/HNU logo HD.png"
              alt="Human Nutrition Unit logo"
              style={{ height: '34px', width: 'auto' }}
              className="object-contain"
            />
          </div>
        </div>

        {!searchOpen && (
          <nav className="hidden min-[861px]:flex items-center gap-8 text-[#0C0C48]">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#0C0C48] text-[13px] font-medium transition hover:opacity-70"
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!searchOpen ? (
            <>
              <button
                aria-label="Change language"
                className="hidden min-[861px]:inline-flex h-[32px] items-center justify-center gap-2 rounded-full border border-[#C9CDD4] bg-white px-3 text-[12px] font-medium text-[#0C0C48] transition hover:bg-[#F2F4F7]"
              >
                <span className="text-[12px] leading-none">🇺🇸</span>
                <span>EN</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <button className="hidden min-[861px]:inline-flex h-[32px] w-[72px] items-center justify-center rounded-full bg-[#2F3FE6] text-[12px] font-medium text-white transition hover:opacity-90">
                Contact
              </button>

              <button
                onClick={() => {
                  setSearchOpen(true)
                  setMobileMenuOpen(false)
                }}
                aria-label="Open search"
                className="flex h-[32px] w-[45px] shrink-0 items-center justify-center rounded-full border border-[#6B6F76] transition hover:bg-[#ECECEC]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C0C48"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>

              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex min-[861px]:hidden h-[32px] w-[45px] shrink-0 items-center justify-center rounded-full border border-[#6B6F76] transition hover:bg-[#ECECEC]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C0C48"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-[38px] w-[280px] max-[860px]:w-[180px] items-center rounded-full border border-[#C9CDD4] bg-white px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C0C48"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                  autoFocus
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-[13px] text-[#18214D] outline-none placeholder:text-[#9AA1AC]"
                />
              </div>

              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#6B6F76] text-[#000000] transition hover:bg-[#ECECEC]"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {!searchOpen && mobileMenuOpen && (
        <div className="min-[861px]:hidden border-t border-[#D9D9D9] bg-[#F7F7F7] px-4 py-4">
          <div className="flex flex-col gap-3 text-[#000000]">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] font-medium text-[#0C0C48] transition hover:opacity-70"
              >
                {item}
              </a>
            ))}

            <div className="mt-2 flex items-center gap-2">
              <button
                aria-label="Change language"
                className="inline-flex h-[32px] items-center justify-center gap-2 rounded-full border border-[#C9CDD4] bg-white px-3 text-[12px] font-medium text-[#0C0C48] transition hover:bg-[#F2F4F7]"
              >
                <span className="text-[12px] leading-none">🇺🇸</span>
                <span>EN</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <button className="h-[32px] w-[72px] rounded-full bg-[#2F3FE6] text-[12px] font-medium text-white transition hover:opacity-90">
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
