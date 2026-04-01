'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Code2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/facebook-cover' || pathname === '/linkedin-cover') return null;

  return (
    <footer className="bg-surface-container-lowest flex flex-col items-center justify-center w-full border-t border-outline-variant/10 py-16 px-8 overflow-hidden">
      <div className="mb-6">
        <Image 
          src="/logo_300x100_white.png" 
          alt="Karim Development Logo" 
          width={150} 
          height={50} 
          className="opacity-90 hover:opacity-100 transition-opacity invert dark:invert-0"
        />
      </div>
      
      <div className="flex gap-8 mb-8">
        <Link
          href="https://github.com/KarimAntar"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 text-on-surface/50 hover:text-primary transition-colors duration-300"
          aria-label="GitHub Profile"
        >
          <Github className="w-6 h-6" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/karimmamdouh"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 text-on-surface/50 hover:text-primary transition-colors duration-300"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-6 h-6" />
        </Link>
        <Link
          href="https://github.com/KarimAntar/karim-development"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 text-on-surface/50 hover:text-primary transition-colors duration-300"
          aria-label="Source Code"
        >
          <Code2 className="w-6 h-6" />
        </Link>
      </div>

      <p className="font-body text-[10px] tracking-widest uppercase opacity-60 text-on-surface/40 text-center max-w-[280px] sm:max-w-none">
        © {new Date().getFullYear()} Karim Development. Architectural Digital Excellence.
      </p>
    </footer>
  );
}
