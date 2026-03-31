import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  return (
    <main className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-tertiary-container/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">
              Portfolio Exhibition
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-on-background">
              Architectural <br />
              <span className="text-stroke">Digital Works.</span>
            </h1>
          </div>
          <div className="max-w-xs text-right hidden md:block">
            <p className="text-on-surface-variant font-body leading-relaxed text-sm">
              A curated selection of high-performance applications where engineering meets cinematic aesthetics.
            </p>
          </div>
        </header>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-12">
          {/* BloodBond — Featured Large */}
          <article className="md:col-span-12 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative order-2 lg:order-1">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-container-lowest relative">
                  <Image
                    src="/bloodbond.png"
                    alt="BloodBond Project"
                    fill
                    className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden md:block p-6 glass-card rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">health_and_safety</span>
                    </div>
                    <div>
                      <p className="font-headline font-bold text-sm">Live System</p>
                      <p className="text-xs text-on-surface-variant">Active deployment</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
                <span className="font-label text-xs tracking-widest text-primary mb-2">01 / HEALTH-TECH</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 tracking-tight">BloodBond</h2>
                <p className="font-body text-lg text-on-surface-variant mb-8 leading-relaxed">
                  A mission-critical platform revolutionizing blood donation logistics. Real-time tracking,
                  donor matching algorithms, and automated emergency alerts.
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {['React', 'Node.js', 'MongoDB'].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant font-label text-[10px] tracking-wider uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="https://bloodbond.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold rounded shadow-[0_0_20px_rgba(0,102,230,0.2)] hover:shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all group/btn w-fit"
                >
                  Live Project
                  <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </article>

          {/* NS Financial */}
          <article className="md:col-start-1 md:col-span-5 group">
            <div className="relative mb-8">
              <div className="aspect-square overflow-hidden rounded-xl bg-surface-container-low relative">
                <Image
                  src="/nsfinancialservice.png"
                  alt="NS Financial Services"
                  fill
                  className="object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                />
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
            </div>
            <span className="font-label text-xs tracking-widest text-primary mb-2 block">02 / FINTECH</span>
            <h2 className="font-headline text-3xl font-bold mb-4 tracking-tight">NS Financial Services</h2>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
              Professional financial services website offering comprehensive solutions for investment,
              loans, and financial planning.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Next.js', 'TypeScript', 'Tailwind CSS'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant font-label text-[10px] tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="https://www.nsfinancialservice.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold rounded shadow-[0_0_20px_rgba(0,102,230,0.2)] hover:shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all group/btn w-fit"
            >
              Live Project
              <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </article>

          {/* Real Estate */}
          <article className="md:col-start-7 md:col-span-6 mt-0 md:mt-32 group">
            <div className="relative mb-8">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low relative">
                <Image
                  src="/realestate.png"
                  alt="Real Estate Platform"
                  fill
                  className="object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                />
              </div>
              <div className="absolute inset-0 bg-tertiary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
            </div>
            <span className="font-label text-xs tracking-widest text-primary mb-2 block">03 / REAL ESTATE</span>
            <h2 className="font-headline text-3xl font-bold mb-4 tracking-tight">Real Estate Platform</h2>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
              Modern real estate listings platform with advanced search, property management, and
              interactive map integration.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['React', 'Firebase', 'Material-UI'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant font-label text-[10px] tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="https://real-estate-project-sepia.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold rounded shadow-[0_0_20px_rgba(0,102,230,0.2)] hover:shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all group/btn w-fit"
            >
              Live Project
              <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </article>
        </div>

        {/* CTA */}
        <section className="mt-48 py-24 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
            <span className="font-headline text-[15rem] font-bold tracking-tighter select-none">BUILD</span>
          </div>
          <div className="max-w-4xl relative z-10">
            <h3 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Ready to architect your <span className="text-primary">vision?</span>
            </h3>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/contact"
                className="px-10 py-5 bg-primary-container text-white font-headline font-bold rounded uppercase tracking-widest text-sm hover:brightness-110 transition-all inline-block"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
