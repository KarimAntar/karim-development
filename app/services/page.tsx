import Link from 'next/link';

export default function Services() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      {/* Header */}
      <section className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
            Capabilities
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            Digital{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
              Architectural
            </span>{' '}
            Excellence
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
            We don&apos;t just build websites. We engineer high-performance digital environments using
            industry-leading technical stacks.
          </p>
        </div>
        <div className="hidden lg:block text-right">
          <div className="text-4xl font-headline font-light text-outline-variant/30 leading-none">
            03 / SOLUTIONS
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
        {/* Web Development — Large */}
        <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low rounded-xl border border-white/5 p-8 lg:p-12 min-h-[450px] flex flex-col justify-between hover:bg-surface-container transition-colors duration-500">
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700 bg-cover bg-center"
            style={{ backgroundImage: "url('https://picsum.photos/seed/code/800/600')" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  code
                </span>
              </div>
              <span className="font-label text-[10px] tracking-widest uppercase py-1 px-3 bg-surface-variant text-on-surface-variant rounded-full">
                Primary Offering
              </span>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Web Development</h2>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-md">
              Engineering immersive web experiences with React and Next.js. We prioritize type-safety
              through TypeScript and atomic design principles for scalable visual systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8 relative z-10">
            <span className="font-label text-[10px] tracking-widest uppercase py-1.5 px-3 bg-surface-container-highest border border-outline-variant/20 rounded">
              Next.js 15
            </span>
            <span className="font-label text-[10px] tracking-widest uppercase py-1.5 px-3 bg-surface-container-highest border border-outline-variant/20 rounded">
              React Server Components
            </span>
            <span className="font-label text-[10px] tracking-widest uppercase py-1.5 px-3 bg-surface-container-highest border border-outline-variant/20 rounded">
              TypeScript
            </span>
          </div>
        </div>

        {/* Mobile Solutions */}
        <div className="md:col-span-4 group bg-surface-container-lowest rounded-xl border border-white/5 p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-500">
          <div>
            <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center border border-tertiary/20 mb-6">
              <span className="material-symbols-outlined text-tertiary">smartphone</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 leading-tight">Mobile Solutions</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Cross-platform excellence. Progressive Web Apps and responsive interfaces that feel native
              to any device size or operating system.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-on-surface/70">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                Responsive Architecture
              </li>
              <li className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-on-surface/70">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                PWA Integration
              </li>
              <li className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-on-surface/70">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                Touch-first UX
              </li>
            </ul>
          </div>
        </div>

        {/* API Development */}
        <div className="md:col-span-5 group relative overflow-hidden bg-surface-container-high rounded-xl border border-white/5 p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">hub</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4">API Development</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Robust backend architecture focused on data integrity and lightning-fast response times.
              Whether it&apos;s RESTful patterns or complex GraphQL schemas.
            </p>
          </div>
          <div className="mt-8 flex gap-4 relative z-10">
            <div className="text-xs font-mono text-outline leading-tight">
              <span className="text-primary">GET</span> /api/v1/structure
              <br />
              <span className="text-tertiary">status:</span> 200 OK
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="md:col-span-7 bg-primary-container rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-tertiary-container opacity-50" />
          <div className="relative z-10 flex-1">
            <h2 className="font-headline text-3xl font-bold text-on-primary-container leading-tight mb-4">
              Ready to start your technical blueprint?
            </h2>
            <p className="font-body text-on-primary-container/80 text-sm">
              Consult with our team to define your project architecture and technical requirements.
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/contact"
              className="inline-block bg-on-primary-container text-primary-container px-8 py-4 rounded-lg font-headline font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Architectural Principles */}
      <section className="mt-32">
        <div className="mb-12">
          <h3 className="font-headline text-3xl font-bold mb-2">Architectural Principles</h3>
          <div className="w-24 h-1 bg-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="text-4xl font-headline font-black text-outline-variant/20 block">01</span>
            <h4 className="font-headline text-xl font-bold">Performance First</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Optimization is not an afterthought. Every line of code is measured for its impact on Core
              Web Vitals and user perception.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-4xl font-headline font-black text-outline-variant/20 block">02</span>
            <h4 className="font-headline text-xl font-bold">Type Safety</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Reducing runtime errors through strict TypeScript implementations and rigorous end-to-end
              testing protocols.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-4xl font-headline font-black text-outline-variant/20 block">03</span>
            <h4 className="font-headline text-xl font-bold">Scalable Design</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Building components that grow with your business. We design systems, not just pages, using
              atomic methodology.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
