'use client';

import React, { useRef } from 'react';

const htmlCodeLines = [
  '<span class="text-[#c678dd]">const</span> <span class="text-[#61afef]">engineerDigitalExcellence</span> = <span class="text-[#c678dd]">async</span> (',
  '  <span class="text-[#e06c75]">idea</span>: <span class="text-[#e5c07b]">Idea</span>,',
  '  <span class="text-[#e06c75]">stack</span>: <span class="text-[#e5c07b]">TechStack</span>',
  '): <span class="text-[#e5c07b]">Promise</span>&lt;<span class="text-[#e5c07b]">Reality</span>&gt; =&gt; {',
  '  <span class="text-[#c678dd]">try</span> {',
  '    <span class="text-[#c678dd]">const</span> <span class="text-[#e06c75]">architecture</span> = <span class="text-[#c678dd]">await</span> <span class="text-[#e5c07b]">Architect</span>.<span class="text-[#61afef]">design</span>(<span class="text-[#e06c75]">idea</span>);',
  '    <span class="text-[#c678dd]">const</span> <span class="text-[#e06c75]">platform</span> = <span class="text-[#c678dd]">await</span> <span class="text-[#e5c07b]">Builder</span>.<span class="text-[#61afef]">construct</span>(<span class="text-[#e06c75]">architecture</span>, <span class="text-[#e06c75]">stack</span>);',
  '    ',
  '    <span class="text-[#e06c75]">platform</span>.<span class="text-[#61afef]">optimize</span>({ <span class="text-[#e06c75]">performance</span>: <span class="text-[#98c379] font-bold">\'max\'</span> });',
  '    ',
  '    <span class="text-[#c678dd]">return</span> <span class="text-[#e06c75]">platform</span>.<span class="text-[#61afef]">deploy</span>();',
  '  } <span class="text-[#c678dd]">catch</span> (<span class="text-[#e06c75]">error</span>) {',
  '    <span class="text-[#c678dd]">throw</span> <span class="text-[#c678dd]">new</span> <span class="text-[#e5c07b]">Error</span>(<span class="text-[#98c379] italic">\'Fallback.\'</span>);',
  '  }',
  '};'
];

export default function FacebookCover() {
  const coverRef = useRef<HTMLDivElement>(null);

  const downloadCover = async () => {
    const canvas = document.createElement('canvas');
    // High res output (1640x720) for 2x pixel ratio
    canvas.width = 1640;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 2; // Everything drawn at 2x

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    try {
      // 1. Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bg = await loadImage('/contact-bg.png');
      ctx.globalAlpha = 0.5;
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;

      // 2. Gradients
      const sideGrad = ctx.createLinearGradient(0, 0, 800 * scale, 0);
      sideGrad.addColorStop(0, 'rgba(10, 10, 10, 1.0)');
      sideGrad.addColorStop(0.5, 'rgba(10, 10, 10, 0.8)');
      sideGrad.addColorStop(1, 'rgba(10, 10, 10, 0.0)');
      ctx.fillStyle = sideGrad;
      ctx.fillRect(0, 0, 800 * scale, canvas.height);

      // 3. Horizon Glow
      const glowGrad = ctx.createRadialGradient(
        400 * scale, 360 * scale, 0,
        400 * scale, 360 * scale, 400 * scale
      );
      glowGrad.addColorStop(0, 'rgba(176, 198, 255, 0.15)');
      glowGrad.addColorStop(1, 'rgba(176, 198, 255, 0.0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Content drawing
      const startX = 90 * scale;
      const startY = 140 * scale;

      // Logo
      const logo = await loadImage('/logo160x160.png');
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 102, 230, 0.5)';
      ctx.drawImage(logo, startX, startY, 48 * scale, 48 * scale);
      ctx.shadowBlur = 0;

      // Text: Karim Development
      ctx.fillStyle = '#e5e2e1';
      ctx.font = `bold ${32 * scale}px "Space Grotesk", sans-serif`;
      ctx.fillText('Karim ', startX + 60 * scale, startY + 36 * scale);

      const karimWidth = ctx.measureText('Karim ').width;
      ctx.fillStyle = '#c2c6d7';
      ctx.font = `300 ${32 * scale}px "Space Grotesk", sans-serif`;
      ctx.fillText('Development', startX + 60 * scale + karimWidth, startY + 36 * scale);

      // Subtitle
      ctx.fillStyle = '#c2c6d7';
      ctx.font = `300 ${14 * scale}px "Manrope", sans-serif`;
      ctx.fillText('We build ideas into Digital Reality', startX, startY + 70 * scale);

      // URL Badge
      const badgeX = startX;
      const badgeY = startY + 95 * scale;
      const badgeW = 220 * scale;
      const badgeH = 40 * scale;

      ctx.fillStyle = 'rgba(176, 198, 255, 0.1)';
      ctx.strokeStyle = 'rgba(176, 198, 255, 0.2)';
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 20 * scale);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#b0c6ff';
      ctx.font = `bold ${15 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('https://karims.dev', badgeX + badgeW / 2, badgeY + 25 * scale);
      ctx.textAlign = 'left';

      // 5. IDE Mockup (Right Side)
      ctx.save();
      ctx.translate(560 * scale, 180 * scale);
      ctx.rotate(-2 * Math.PI / 180);

      const ideW = 300 * scale;
      const ideH = 220 * scale;
      const ideX = -ideW / 2;
      const ideY = -ideH / 2;

      // Shadow
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.roundRect(ideX, ideY, ideW, ideH, 12 * scale);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Box
      ctx.fillStyle = '#1e1e1e';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(ideX, ideY, ideW, ideH, 12 * scale);
      ctx.fill();
      ctx.stroke();

      // Header
      ctx.fillStyle = '#2d2d2d';
      ctx.beginPath();
      ctx.roundRect(ideX, ideY, ideW, 35 * scale, [12 * scale, 12 * scale, 0, 0]);
      ctx.fill();

      // Buttons
      ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(ideX + 20 * scale + (i * 15 * scale), ideY + 17 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = `500 ${10 * scale}px monospace`;
      ctx.fillText('architecture.ts', ideX + ideW / 2 - 40 * scale, ideY + 22 * scale);

      // Code text (simplified coloring)
      ctx.font = `${10 * scale}px monospace`;
      const codeLines = [
        ['const ', '#c678dd', 'engineerDigitalExcellence', '#61afef', ' = ', '#abb2bf', 'async', '#c678dd'],
        ['  try {', '#abb2bf'],
        ['    const ', '#c678dd', 'arch', '#e06c75', ' = ', '#abb2bf', 'await', '#c678dd', ' Architect.design(idea);', '#abb2bf'],
        ['    const ', '#c678dd', 'app', '#e06c75', ' = ', '#abb2bf', 'await', '#c678dd', ' Builder.construct(arch);', '#abb2bf'],
        ['    ', '#abb2bf'],
        ['    app.optimize({ perf: ', '#abb2bf', "'max'", '#98c379'],
        ['    ', '#abb2bf'],
        ['    return app.deploy();', '#abb2bf'],
        ['  } catch (e) { ... }', '#abb2bf']
      ];

      codeLines.forEach((line, i) => {
        let xOffset = ideX + 15 * scale;
        for (let j = 0; j < line.length; j += 2) {
          ctx.fillStyle = line[j + 1];
          ctx.fillText(line[j], xOffset, ideY + 60 * scale + (i * 16 * scale));
          xOffset += ctx.measureText(line[j]).width;
        }
      });

      ctx.restore();

      // DOWNLOAD
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'Karim_Facebook_Cover.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to capture cover:', err);
      alert('Error generating asset. Please ensure all shared resources are accessible.');
    }
  };

  return (
    <div className="min-h-screen bg-[#000] flex flex-col items-center justify-center p-8">

      {/* 820x360 Exactly */}
      <div
        ref={coverRef}
        className="w-[820px] h-[360px] bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center font-sans shadow-2xl rounded-none border-none ring-0"
      >
        {/* Background from footer */}
        <div className="absolute inset-0 z-0">
          {/* Explicit hex linear gradient bypassing oklab */}
          <div
            className="absolute inset-0 z-10"
            style={{ backgroundImage: 'linear-gradient(to right, rgba(19,19,19,1), rgba(19,19,19,0.8), transparent)' }}
          />
          <img
            className="w-full h-full object-cover opacity-50"
            alt="background"
            src="/contact-bg.png"
            crossOrigin="anonymous"
          />
          {/* Cinematic Horizon Glow */}
          <div
            className="absolute bottom-[-10%] left-0 w-[80%] h-[150px] blur-[80px] rounded-[50%] pointer-events-none z-10"
            style={{ backgroundColor: 'rgba(176, 198, 255, 0.2)' }}
          />
        </div>

        {/* Safe Area 640x312 */}
        <div className="w-[640px] h-[312px] relative z-20 flex items-center justify-between">

          {/* Left Side: Text and Logo */}
          <div className="flex flex-col justify-center max-w-[300px]">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/logo160x160.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
                style={{ filter: 'drop-shadow(0 0 15px rgba(0,102,230,0.5))' }}
                crossOrigin="anonymous"
              />
              <h1
                className="text-3xl font-headline font-bold tracking-tighter mt-1"
                style={{ color: '#e5e2e1' }}
              >
                Karim <span className="font-light" style={{ color: '#c2c6d7' }}>Development</span>
              </h1>
            </div>

            <p className="text-sm font-body font-light mb-8 leading-relaxed" style={{ color: '#c2c6d7' }}>
              We build ideas into{' '}
              <span
                className="font-serif italic font-light"
                style={{
                  backgroundImage: 'linear-gradient(to right, #b0c6ff, #5cd5f6)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(0,102,230,0.3))'
                }}
              >
                Digital Reality
              </span>
            </p>

            <div
              className="inline-block px-5 py-2.5 rounded-full self-start"
              style={{
                backgroundColor: 'rgba(176, 198, 255, 0.1)',
                border: '1px solid rgba(176, 198, 255, 0.2)',
                boxShadow: '0 0 20px rgba(0,102,230,0.1)'
              }}
            >
              <span className="font-mono text-[15px] tracking-widest font-bold" style={{ color: '#b0c6ff' }}>
                https://karims.dev
              </span>
            </div>
          </div>

          {/* Right Side: Static IDE Mockup */}
          <div className="w-[320px] rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),_0_0_30px_rgba(0,102,230,0.2)] transform rotate-[-2deg]">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d2d] border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-[10px] text-white/40 font-mono font-medium tracking-wider">architecture.ts</div>
              <div className="w-8"></div>
            </div>
            {/* Code Body */}
            <div className="p-4 font-mono text-[10px] leading-[1.6] text-[#abb2bf]">
              <pre className="whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: htmlCodeLines.join('\n') }} />
              </pre>
            </div>
          </div>

        </div>
      </div>

      <button
        onClick={downloadCover}
        className="mt-12 px-8 py-4 bg-primary text-on-primary font-headline font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-all shadow-lg shadow-primary/30 cursor-pointer"
      >
        Download Full-Size PNG
      </button>

    </div>
  );
}
