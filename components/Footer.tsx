'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Code2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/facebook-cover') return null;

  return (
    <footer className="bg-[#0e0e0e] flex flex-col items-center justify-center w-full border-t border-white/5 py-16 px-8">
      <div className="mb-6">
        <Image 
          src="/logo_300x100_white.png" 
          alt="Karim Development Logo" 
          width={150} 
          height={50} 
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>
      
      <div className="flex gap-8 mb-8">
        <Link
          href="https://github.com/KarimAntar"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 text-[#e5e2e1]/50 hover:text-[#0066e6] transition-colors duration-300"
          aria-label="GitHub Profile"
        >
          <Github className="w-6 h-6" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/karimmamdouh"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 text-[#e5e2e1]/50 hover:text-[#0066e6] transition-colors duration-300"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-6 h-6" />
        </Link>
        <Link
          href="https://github.com/KarimAntar/karim-development"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 text-[#e5e2e1]/50 hover:text-[#0066e6] transition-colors duration-300"
          aria-label="Source Code"
        >
          <Code2 className="w-6 h-6" />
        </Link>
      </div>

      <p className="font-body text-xs tracking-widest uppercase opacity-70 text-[#e5e2e1]/40 text-center">
        © {new Date().getFullYear()} Karim Development. Architectural Digital Excellence.
      </p>
    </footer>
  );
}
