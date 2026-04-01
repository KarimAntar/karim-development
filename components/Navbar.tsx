'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (pathname === '/facebook-cover') return null;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Initialize from document class
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains('dark'));
  }, []);

  // Track active section on home page via scroll
  useEffect(() => {
    if (!isHome) return;
    const sections = ['home', 'about', 'services', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const toggleTheme = () => {
    const html = document.documentElement;
    const goingDark = !html.classList.contains('dark');
    if (goingDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    setIsDark(goingDark);
  };

  const navLinks = [
    { name: 'Home',     id: 'home',     path: '/' },
    { name: 'About',    id: 'about',    path: '/about' },
    { name: 'Services', id: 'services', path: '/services' },
    { name: 'Projects', id: 'projects', path: '/projects' },
    { name: 'Contact',  id: 'contact',  path: '/contact' },
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (!isHome) return; // let Next.js navigate normally
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4">
        <div className="bg-surface/60 backdrop-blur-xl rounded-full mt-6 mx-auto max-w-fit px-6 py-2 border border-white/5 shadow-[0_20px_50px_rgba(0,102,230,0.08)] flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer whitespace-nowrap">
            <Image src="/logo160x160.png" alt="Karim Development Logo" width={32} height={32} className="rounded-sm" />
            <span className="font-headline font-bold text-xl tracking-tighter text-on-surface">Karim Development</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = isHome ? activeSection === link.id : pathname === link.path;
              return (
                <a
                  key={link.name}
                  href={isHome ? `#${link.id}` : link.path}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`font-headline tracking-tight text-sm uppercase transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isActive
                      ? 'font-bold text-primary'
                      : 'font-medium text-on-surface/60 hover:text-on-surface'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Theme toggle + Mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-1 text-on-surface/60 hover:text-primary transition-all active:scale-95 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isDark ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-on-surface/60 hover:text-on-surface transition-colors p-1 cursor-pointer"
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-surface border-l border-white/5 flex flex-col pt-24 px-8 gap-6">
            {navLinks.map((link) => {
              const isActive = isHome ? activeSection === link.id : pathname === link.path;
              return (
                <a
                  key={link.name}
                  href={isHome ? `#${link.id}` : link.path}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`font-headline text-2xl font-bold tracking-tighter uppercase transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-primary' : 'text-on-surface/50 hover:text-on-surface'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
