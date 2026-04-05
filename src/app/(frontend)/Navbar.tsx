'use client'

import React, { useState } from 'react'

const navLinks = ['Research', 'Our Team', 'Studies', 'Collaborations', 'Media']

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="w-full border-b border-[#D9D9D9] bg-[#F7F7F7]">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-8">
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center shrink-0">
            <img
              src="https://i0.wp.com/vhin.co.nz/wp-content/uploads/2025/08/UoA-Logo-Primary-RGB-Small.png?ssl=1"
              alt="University of Auckland logo"
              style={{ height: '32px', width: 'auto' }}
              className="object-contain"
            />
          </div>

          <div className="h-[36px] w-px bg-[#BFC4CC]" />

          <div className="flex h-[34px] w-[62px] items-center justify-center border-[3px] border-[#00558C] text-[16px] font-bold text-[#00558C]">
            HNU
          </div>
        </div>

        {!searchOpen && (
          <nav className="hidden md:flex items-center gap-8 text-[#0C0C48]">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] font-medium hover:opacity-70 transition"
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!searchOpen ? (
            <>
              <button className="h-[32px] w-[72px] rounded-full bg-[#2F3FE6] text-[12px] font-medium text-white hover:opacity-90 transition">
                Contact
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="flex h-[32px] w-[45px] shrink-0 items-center justify-center rounded-full border border-[#6B6F76] hover:bg-[#ECECEC] transition"
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
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-[38px] w-[280px] items-center rounded-full border border-[#C9CDD4] bg-white px-4">
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
                  placeholder="Search..."
                  className="w-full bg-transparent text-[13px] text-[#18214D] outline-none placeholder:text-[#9AA1AC]"
                />
              </div>

              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#6B6F76] text-[#000000] hover:bg-[#ECECEC] transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
