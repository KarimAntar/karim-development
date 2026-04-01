'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Code2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    // Observe changes to the html class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  if (pathname === '/facebook-cover' || pathname === '/linkedin-cover') return null;

  return (
    <footer className="bg-surface-container-lowest flex flex-col items-center justify-center w-full border-t border-outline-variant/10 py-16 px-8 overflow-hidden">
      <div className="mb-6 relative h-[50px] w-[200px]">
        <Image 
          src={isDark ? "/logo_300x100_white.png" : "/logo_300x100_black.png"}
          alt="Karim Development Logo" 
          fill
          className="object-contain opacity-90 hover:opacity-100 transition-opacity"
          priority
        />
      </div>
      
      <div className="flex gap-8 mb-8">
        <Link
          href="https://github.com/KarimAntar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface/70 hover:text-primary transition-colors duration-300"
          aria-label="GitHub Profile"
        >
          <Github className="w-6 h-6" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/karimmamdouh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface/70 hover:text-primary transition-colors duration-300"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-6 h-6" />
        </Link>
        <Link
          href="https://github.com/KarimAntar/karim-development"
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface/70 hover:text-primary transition-colors duration-300"
          aria-label="Source Code"
        >
          <Code2 className="w-6 h-6" />
        </Link>
      </div>

      <p className="font-label text-[10px] tracking-widest uppercase text-on-surface/70 mt-8">
        © {new Date().getFullYear()} Karim Development. Architectural Digital Excellence.
      </p>
    </footer>
  );
}
