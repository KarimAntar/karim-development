'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0066e6';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" style={{ opacity: 0.4 }} />

      <section className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen pt-24 pb-12 relative z-10">
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
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container font-headline font-bold tracking-tight rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(0,102,230,0.3)] inline-block"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 border border-outline-variant/30 text-on-surface font-headline font-bold tracking-tight rounded-lg hover:bg-white/5 hover:border-outline-variant transition-all duration-300 active:scale-95 inline-block"
              >
                View Projects
              </Link>
            </div>

            <div className="pt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">terminal</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">database</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">cloud</span>
                </div>
              </div>
              <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase border-l border-white/10 pl-6">
                Full-Stack <br /> Architecture
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer z-30">
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </main>
  );
}
