'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

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
    <main className="relative pt-32 pb-24 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-tertiary-container/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Info */}
          <div className="lg:col-span-5">
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">
              Connection Protocol
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-on-background mb-6">
              Let&apos;s Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                The Future.
              </span>
            </h1>
            <p className="font-body text-lg text-on-surface-variant mb-12 leading-relaxed max-w-md">
              Initiate a secure connection to discuss architectural blueprints, technical requirements,
              or digital transformation strategies.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">mail</span>
                </div>
                <div>
                  <p className="font-label text-xs tracking-widest text-on-surface-variant uppercase mb-1">Direct Line</p>
                  <a
                    href="mailto:karimamdou7@gmail.com"
                    className="font-headline text-xl font-bold hover:text-primary transition-colors"
                  >
                    karimamdou7@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">call</span>
                </div>
                <div>
                  <p className="font-label text-xs tracking-widest text-on-surface-variant uppercase mb-1">Phone</p>
                  <a
                    href="tel:+201066241997"
                    className="font-headline text-xl font-bold hover:text-primary transition-colors"
                  >
                    +20 106 624 1997
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                </div>
                <div>
                  <p className="font-label text-xs tracking-widest text-on-surface-variant uppercase mb-1">Base of Operations</p>
                  <p className="font-headline text-xl font-bold">Cairo, Egypt</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-12">
              <a
                href="https://github.com/KarimAntar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                aria-label="GitHub"
              >
                <span className="material-symbols-outlined text-sm">code</span>
              </a>
              <a
                href="https://www.linkedin.com/in/karimmamdouh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <span className="material-symbols-outlined text-sm">work</span>
              </a>
              <a
                href="https://facebook.com/Karim.Mamdou7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                aria-label="Facebook"
              >
                <span className="material-symbols-outlined text-sm">group</span>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-primary" />

              <div className="mb-8 flex justify-between items-center">
                <h2 className="font-headline text-2xl font-bold">Send a Connection Request</h2>
                <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Status: Online
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label text-xs tracking-widest text-on-surface-variant uppercase">
                      Identification
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs tracking-widest text-on-surface-variant uppercase">
                      Return Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs tracking-widest text-on-surface-variant uppercase">
                    Data Payload
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your technical requirements or project..."
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30 resize-none"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-body">
                    ✓ {submitMessage}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-body">
                    ✗ {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full py-4 bg-primary-container text-on-primary-container font-headline font-bold rounded-lg uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Transmit Data
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
