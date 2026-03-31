'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // ── Matrix rain (slowed down: only renders every 4th frame ≈ 15fps) ──────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);
    let frameCount = 0;

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.06)' : 'rgba(248, 250, 252, 0.06)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0066e6';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      frameCount++;
      if (frameCount % 4 === 0) draw(); // only draw every 4th frame → ~15 fps
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── Contact form submit ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setSubmitMessage('Message transmitted successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Transmission failed. Please try again or email directly.');
    }
  };

  return (
    <main className="relative overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-surface">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" style={{ opacity: 0.4 }} />

        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen pt-24 pb-12 relative z-10">
          {/* Left — Image */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full aspect-square max-w-[450px] lg:max-w-none">
              <div className="absolute inset-0 bg-surface-container-high/20 backdrop-blur-md rounded-xl border border-white/5 glow-ring z-10 transform -rotate-3 transition-transform duration-700 group-hover:rotate-0" />
              <div className="absolute inset-0 z-20 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?ixlib=rb-4.1.0&auto=format&fit=crop&h=800&w=687"
                  alt="Karim Antar — Full Stack Developer workspace"
                  fill
                  className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -right-6 z-30 bg-surface-container-highest/80 backdrop-blur-xl p-4 border border-white/10 rounded-lg shadow-xl hidden sm:block">
                <div className="font-label text-[10px] tracking-[0.2em] uppercase text-primary mb-1">Status</div>
                <div className="font-headline font-bold text-sm text-on-surface">SYSTEMS_ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="lg:col-span-7 z-30 order-1 lg:order-2">
            <div className="flex flex-col space-y-8">
              <header>
                <span className="inline-block font-label text-sm tracking-[0.3em] uppercase text-primary mb-4 border-l-2 border-primary pl-4">
                  Karim Development
                </span>
                <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-on-surface leading-[0.9] text-glow mb-8">
                  Crafting Digital <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary-fixed-dim">
                    Excellence
                  </span>
                </h1>
              </header>
              <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed opacity-80">
                Engineering excellence in every line of code. Building scalable, high-performance
                architectures that bridge the gap between abstract innovation and human-centric design.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  className="group relative px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold tracking-tight rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(0,102,230,0.3)] inline-block"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="#projects"
                  className="px-8 py-4 border border-outline-variant/30 text-on-surface font-headline font-bold tracking-tight rounded-lg hover:bg-white/5 hover:border-outline-variant transition-all duration-300 active:scale-95 inline-block"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer z-30">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </a>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <motion.section 
        id="about" 
        className="relative pt-32 pb-32 overflow-hidden bg-surface"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
            <div className="lg:col-span-8">
              <span className="font-label text-primary tracking-[0.2em] uppercase text-xs mb-6 block">The Architect Behind the Code</span>
              <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-12">
                About <span className="text-stroke">Me</span>
              </h2>
              <p className="font-body text-xl text-on-surface-variant leading-relaxed max-w-3xl">
                I&apos;m Karim Antar, a passionate web developer dedicated to crafting digital structures
                that balance aesthetic elegance with functional performance. My full-stack approach ensures
                every pixel is backed by robust, scalable architecture.
              </p>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-3xl mt-6 opacity-70">
                With 8+ years of experience and 50+ projects delivered, spanning React, Next.js, Node.js,
                Python, and modern cloud infrastructure. Based in Cairo, Egypt — working globally.
              </p>
            </div>
            <div className="lg:col-span-4 relative group">
              <div className="absolute -inset-4 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-[4/5] bg-surface-container overflow-hidden rounded-lg border border-white/5">
                <Image
                  src="/me.jpg"
                  alt="Karim Antar — Full Stack Developer"
                  fill
                  className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
            </div>
          </div>

          {/* Stats Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">timeline</span>
              </div>
              <h3 className="font-headline text-6xl font-bold text-primary tracking-tighter mb-2">8+</h3>
              <p className="font-label text-on-surface/60 tracking-widest uppercase text-sm">Years Experience</p>
              <div className="mt-6 h-px bg-gradient-to-r from-primary/50 to-transparent w-24" />
              <p className="mt-4 text-on-surface-variant text-sm leading-relaxed">Refining the craft through a decade of digital evolution.</p>
            </div>
            <div className="md:col-span-3 bg-surface-container-highest p-10 rounded-xl relative overflow-hidden group border border-white/5">
              <h3 className="font-headline text-6xl font-bold text-on-surface tracking-tighter mb-2">50+</h3>
              <p className="font-label text-on-surface/60 tracking-widest uppercase text-sm">Projects Completed</p>
            </div>
            <div className="md:col-span-5 glass-card p-10 rounded-xl relative overflow-hidden group border border-white/5 flex flex-col justify-center">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl" />
              <div className="flex items-baseline gap-4 mb-4">
                <h3 className="font-headline text-6xl font-bold text-tertiary tracking-tighter">10+</h3>
                <p className="font-label text-on-surface/60 tracking-widest uppercase text-sm">Technologies</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['TypeScript', 'React', 'Node.js', 'Next.js', 'Python', 'Docker'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] uppercase tracking-widest rounded-full font-label border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">Capabilities</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                Architectural
              </span>{' '}
              Excellence
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
              We don&apos;t just build websites. We engineer high-performance digital environments using industry-leading technical stacks.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <div className="text-4xl font-headline font-light text-outline-variant/30 leading-none">03 / SOLUTIONS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low rounded-xl border border-white/5 p-8 lg:p-12 min-h-[400px] flex flex-col justify-between hover:bg-surface-container transition-colors duration-500">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
                </div>
                <span className="font-label text-[10px] tracking-widest uppercase py-1 px-3 bg-surface-variant text-on-surface-variant rounded-full">Primary Offering</span>
              </div>
              <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4">Web Development</h3>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-md">
                Engineering immersive web experiences with React and Next.js. Type-safety through TypeScript and atomic design principles for scalable visual systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {['Next.js 15', 'React Server Components', 'TypeScript'].map((t) => (
                <span key={t} className="font-label text-[10px] tracking-widest uppercase py-1.5 px-3 bg-surface-container-highest border border-outline-variant/20 rounded">{t}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 group bg-surface-container-lowest rounded-xl border border-white/5 p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-500">
            <div>
              <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center border border-tertiary/20 mb-6">
                <span className="material-symbols-outlined text-tertiary">smartphone</span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 leading-tight">Mobile Solutions</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">Cross-platform excellence. Progressive Web Apps and responsive interfaces that feel native to any device.</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <ul className="space-y-3">
                {['Responsive Architecture', 'PWA Integration', 'Touch-first UX'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-on-surface/70">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-5 group relative overflow-hidden bg-surface-container-high rounded-xl border border-white/5 p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">hub</span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">API Development</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Robust backend architecture focused on data integrity and lightning-fast response times. RESTful or GraphQL schemas.
              </p>
              <div className="mt-8 font-mono text-xs text-outline leading-tight">
                <span className="text-primary">GET</span> /api/v1/structure<br />
                <span className="text-tertiary">status:</span> 200 OK
              </div>
            </div>
          </div>
          <div className="md:col-span-7 bg-primary-container rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-tertiary-container opacity-50" />
            <div className="relative z-10 flex-1">
              <h3 className="font-headline text-3xl font-bold text-on-primary-container leading-tight mb-4">Ready to start your technical blueprint?</h3>
              <p className="font-body text-on-primary-container/80 text-sm">Consult to define your project architecture and technical requirements.</p>
            </div>
            <div className="relative z-10">
              <a href="#contact" className="inline-block bg-on-primary-container text-primary-container px-8 py-4 rounded-lg font-headline font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95 cursor-pointer">
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative pt-32 pb-32 overflow-hidden bg-surface-container-lowest">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6">
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Portfolio Exhibition</span>
              <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                Architectural <br />
                <span className="text-stroke">Digital Works.</span>
              </h2>
            </div>
            <p className="text-on-surface-variant font-body leading-relaxed text-sm max-w-xs text-right hidden md:block">
              High-performance applications where engineering meets cinematic aesthetics.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
            {/* BloodBond */}
            <article className="md:col-span-12 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative order-2 lg:order-1">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-container relative">
                    <Image src="/bloodbond.png" alt="BloodBond Project" fill className="object-cover transition-all duration-700 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container/60 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
                  <span className="font-label text-xs tracking-widest text-primary mb-2">01 / HEALTH-TECH</span>
                  <h3 className="font-headline text-4xl md:text-5xl font-bold mb-6 tracking-tight">BloodBond</h3>
                  <p className="font-body text-lg text-on-surface-variant mb-8 leading-relaxed">
                    A mission-critical platform revolutionizing blood donation logistics. Real-time tracking, donor matching algorithms, and automated emergency alerts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {['React', 'Node.js', 'MongoDB'].map((tag) => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant font-label text-[10px] tracking-wider uppercase">{tag}</span>
                    ))}
                  </div>
                  <Link href="https://bloodbond.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold rounded shadow-[0_0_20px_rgba(0,102,230,0.2)] hover:shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all group/btn w-fit">
                    Live Project
                    <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* NS Financial */}
            <article className="md:col-start-1 md:col-span-5 group">
              <div className="relative mb-8">
                <div className="aspect-square overflow-hidden rounded-xl bg-surface-container relative">
                  <Image src="/nsfinancialservice.png" alt="NS Financial Services" fill className="object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                </div>
              </div>
              <span className="font-label text-xs tracking-widest text-primary mb-2 block">02 / FINTECH</span>
              <h3 className="font-headline text-3xl font-bold mb-4 tracking-tight">NS Financial Services</h3>
              <p className="font-body text-on-surface-variant mb-6 leading-relaxed">Professional financial services platform offering investment, loans, and financial planning solutions.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Next.js', 'TypeScript', 'Tailwind CSS'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant font-label text-[10px] tracking-wider uppercase">{tag}</span>
                ))}
              </div>
              <Link href="https://www.nsfinancialservice.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold rounded shadow-[0_0_20px_rgba(0,102,230,0.2)] hover:shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all group/btn w-fit">
                Live Project
                <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </article>

            {/* Real Estate */}
            <article className="md:col-start-7 md:col-span-6 md:mt-24 group">
              <div className="relative mb-8">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container relative">
                  <Image src="/realestate.png" alt="Real Estate Platform" fill className="object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                </div>
              </div>
              <span className="font-label text-xs tracking-widest text-primary mb-2 block">03 / REAL ESTATE</span>
              <h3 className="font-headline text-3xl font-bold mb-4 tracking-tight">Real Estate Platform</h3>
              <p className="font-body text-on-surface-variant mb-6 leading-relaxed">Modern listings platform with advanced search, property management, and interactive map integration.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['React', 'Firebase', 'Material-UI'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant font-label text-[10px] tracking-wider uppercase">{tag}</span>
                ))}
              </div>
              <Link href="https://real-estate-project-sepia.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold rounded shadow-[0_0_20px_rgba(0,102,230,0.2)] hover:shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all group/btn w-fit">
                Live Project
                <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </article>
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex flex-col md:flex-row w-full">
        {/* Left Panel: Immersive Visual */}
        <div className="relative w-full md:w-5/12 min-h-[409px] md:min-h-screen flex flex-col justify-end p-8 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>
            <img 
              className="w-full h-full object-cover" 
              alt="High-end, cinematic, abstract technology background" 
              src="/contact-bg.png"
            />
          </div>
          <div className="relative z-20 space-y-6 max-w-md">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none [text-shadow:0_0_20px_rgba(176,198,255,0.3)]">
              Let's Build <br />The Future.
            </h1>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed">
              Elevating digital presence through architectural precision and high-end engineering.
            </p>
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                </div>
                <span className="font-label text-sm tracking-widest uppercase">Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-sm">call</span>
                </div>
                <span className="font-label text-sm tracking-widest uppercase">+20 106 624 1997</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-sm">mail</span>
                </div>
                <span className="font-label text-sm tracking-widest uppercase">karimamdou7@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-4 pt-8">
              {[
                  { href: 'https://github.com/KarimAntar', icon: 'code', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/karimmamdouh', icon: 'public', label: 'LinkedIn' },
                  { href: 'https://facebook.com/Karim.Mamdou7', icon: 'link', label: 'Facebook' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary-container hover:border-primary-container transition-all duration-300 group">
                  <span className="material-symbols-outlined text-on-surface group-hover:text-on-primary-container">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="w-full md:w-7/12 flex items-center justify-center p-8 md:p-24 bg-surface-container-lowest">
          <div className="w-full max-w-xl">
            <div className="mb-12">
              <span className="font-label text-xs tracking-[0.3em] text-primary uppercase block mb-4">Inquiry</span>
              <h2 className="font-headline text-3xl font-bold tracking-tight">Send a Connection Request</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative group">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant mb-2 block">Full Name</label>
                <input 
                  type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/30 font-body outline-none" 
                  placeholder="John Doe" 
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-focus-within:w-full transition-all duration-500"></div>
              </div>
              
              <div className="relative group">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant mb-2 block">Email Address</label>
                <input 
                  type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/30 font-body outline-none" 
                  placeholder="john@example.com" 
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-focus-within:w-full transition-all duration-500"></div>
              </div>
              
              <div className="relative group">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant mb-2 block">Your Message</label>
                <textarea 
                  rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/30 font-body resize-none outline-none" 
                  placeholder="Describe your vision..." 
                ></textarea>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-focus-within:w-full transition-all duration-500"></div>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-body">✓ {submitMessage}</div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-body">✗ {submitMessage}</div>
              )}

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-8">
                <p className="text-xs text-on-surface-variant font-body max-w-xs">
                  By clicking send, you agree to our privacy policy and the processing of your data.
                </p>
                <button 
                  type="submit" disabled={submitStatus === 'loading'}
                  className="w-full sm:w-auto px-10 py-5 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold uppercase tracking-widest text-xs rounded-lg hover:shadow-[0_0_20px_rgba(0,102,230,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </motion.section>

    </main>
  );
}
