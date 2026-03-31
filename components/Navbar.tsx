'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize from document class
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4">
        <div className="bg-surface/60 backdrop-blur-xl rounded-full mt-6 mx-auto max-w-fit px-6 py-2 border border-white/5 shadow-[0_20px_50px_rgba(0,102,230,0.08)] flex items-center gap-8">
          <Link
            href="/"
            className="font-headline font-bold text-xl tracking-tighter text-on-surface hover:scale-105 transition-transform duration-300 cursor-pointer whitespace-nowrap"
          >
            Karim Development
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-headline tracking-tight text-sm uppercase transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'font-bold text-primary'
                      : 'font-medium text-on-surface/60 hover:text-on-surface'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Theme toggle + Mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1 text-on-surface/60 hover:text-on-surface transition-all active:scale-95"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined">
                {isDark ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-on-surface/60 hover:text-on-surface transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-surface border-l border-white/5 flex flex-col pt-24 px-8 gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-headline text-2xl font-bold tracking-tighter uppercase transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-on-surface/50 hover:text-on-surface'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
