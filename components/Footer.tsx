import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] dark:bg-[#0e0e0e] flex flex-col items-center justify-center w-full border-t border-white/5 py-16 px-8">
      <div className="font-headline font-black text-2xl tracking-tighter text-[#e5e2e1] mb-4">
        Karim Development
      </div>
      
      <div className="flex gap-8 mb-8">
        <Link
          href="https://github.com/KarimAntar"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs tracking-widest uppercase opacity-70 text-[#e5e2e1]/40 hover:text-[#0066e6] transition-colors duration-300"
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/karimmamdouh"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs tracking-widest uppercase opacity-70 text-[#e5e2e1]/40 hover:text-[#0066e6] transition-colors duration-300"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/KarimAntar/karim-development"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs tracking-widest uppercase opacity-70 text-[#e5e2e1]/40 hover:text-[#0066e6] transition-colors duration-300"
        >
          Source
        </Link>
      </div>

      <p className="font-body text-xs tracking-widest uppercase opacity-70 text-[#e5e2e1]/40 text-center">
        © {new Date().getFullYear()} Karim Development. Architectural Digital Excellence.
      </p>
    </footer>
  );
}
