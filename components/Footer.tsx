import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest flex flex-col items-center justify-center w-full border-t border-white/5 py-16 px-8">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <Link
          href="/"
          className="mb-6 hover:opacity-80 transition-opacity duration-300"
        >
          <Image
            src="/logo_300x100_white.png"
            alt="Karim Development"
            width={180}
            height={60}
            className="object-contain"
          />
        </Link>

        <div className="flex gap-8 mb-8">
          <Link
            href="https://github.com/KarimAntar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase text-on-surface/40 hover:text-primary transition-colors duration-300"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/karimmamdouh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase text-on-surface/40 hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </Link>
          <Link
            href="https://facebook.com/Karim.Mamdou7"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widets uppercase text-on-surface/40 hover:text-primary transition-colors duration-300"
          >
            Facebook
          </Link>
          <Link
            href="mailto:karimamdou7@gmail.com"
            className="font-body text-xs tracking-widest uppercase text-on-surface/40 hover:text-primary transition-colors duration-300"
          >
            Email
          </Link>
        </div>

        <p className="font-body text-xs tracking-widest uppercase opacity-70 text-on-surface/60 text-center">
          &copy; {new Date().getFullYear()} Karim Development. Architectural Digital Excellence.
        </p>
      </div>
    </footer>
  );
}
