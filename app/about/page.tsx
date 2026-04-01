'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { techStack } from '@/lib/tech-data';

export default function About() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-surface text-on-surface">
      {/* Ambient orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-8">
            <span className="font-label text-primary tracking-[0.2em] uppercase text-xs mb-6 block">
              The Architect Behind the Code
            </span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
              About <span className="text-stroke">Me</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-3xl">
              I&apos;m Karim Antar, a passionate web developer dedicated to crafting digital structures
              that balance aesthetic elegance with functional performance. My full-stack approach to every
              project ensures that every pixel is backed by robust, scalable architecture.
            </p>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-3xl mt-6 opacity-70">
              With 8+ years of experience and 50+ projects delivered, I bring a comprehensive skill set
              spanning React, Next.js, Node.js, Python, and modern cloud infrastructure. Based in Cairo,
              Egypt — working globally.
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

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 lg:col-span-4 bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">timeline</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline text-6xl lg:text-7xl font-bold text-primary tracking-tighter mb-2">8+</h3>
              <p className="font-label text-on-surface/60 tracking-widest uppercase text-sm">Years Experience</p>
              <div className="mt-8 h-px bg-gradient-to-r from-primary/50 to-transparent w-24" />
              <p className="mt-4 text-on-surface-variant text-sm leading-relaxed">
                Refining the craft through a decade of digital evolution and architectural challenges.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-3 bg-surface-container-highest p-10 rounded-xl relative overflow-hidden group border border-white/5">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-headline text-6xl lg:text-7xl font-bold text-on-surface tracking-tighter mb-2">50+</h3>
                <p className="font-label text-on-surface/60 tracking-widest uppercase text-sm">Projects Completed</p>
              </div>
              <div className="mt-12 flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs">terminal</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs text-on-primary">code</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs text-on-tertiary">deployed_code</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 glass-card p-10 rounded-xl relative overflow-hidden group border border-white/5 flex flex-col justify-center">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-baseline gap-4 mb-4">
                <h3 className="font-headline text-6xl lg:text-7xl font-bold text-tertiary tracking-tighter">25+</h3>
                <p className="font-label text-on-surface/60 tracking-widest uppercase text-sm">Technologies</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {techStack.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-surface-variant/40 hover:bg-surface-variant transition-colors text-on-surface-variant text-[10px] uppercase tracking-widest rounded-lg font-label border border-white/5 shadow-sm group/tech"
                  >
                    <tech.icon 
                      style={{ color: tech.color }} 
                      className="text-sm transition-transform duration-300 group-hover/tech:scale-110" 
                    />
                    <span className="font-semibold">{tech.name}</span>
                  </motion.div>
                ))}
                <div className="px-3 py-1.5 text-on-surface-variant/40 text-[10px] uppercase tracking-widest rounded-lg font-label border border-dashed border-white/10 flex items-center justify-center">
                  ..and more
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote + Terminal */}
        <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/30" />
              <blockquote className="pl-12">
                <p className="font-headline text-3xl md:text-4xl font-light italic text-on-surface leading-tight">
                  &quot;Design is not just what it looks like and feels like. Design is how it works under high pressure.&quot;
                </p>
                <cite className="mt-8 block font-label text-sm tracking-widest text-primary uppercase">
                  — Architectural Philosophy
                </cite>
              </blockquote>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-surface-container-lowest p-1 rounded-lg border border-white/5 aspect-video overflow-hidden">
              <div className="bg-surface p-8 h-full rounded-md flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-error/40" />
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <div className="w-2 h-2 rounded-full bg-tertiary/40" />
                  </div>
                  <span className="font-label text-[10px] opacity-40 uppercase tracking-widest">system_status: optimal</span>
                </div>
                <div className="font-mono text-xs opacity-50 space-y-1">
                  <p className="text-primary">&gt; initializing_identity_module...</p>
                  <p>&gt; loading skill_sets [127.0.0.1]</p>
                  <p>&gt; parsing architect_vision.css</p>
                  <p className="text-tertiary">&gt; status: ready_to_build</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
