'use client';

import React, { useRef } from 'react';

const htmlCodeLines = [
  '<span class="text-[#c678dd]">const</span> <span class="text-[#61afef]">engineerDigitalExcellence</span> = <span class="text-[#c678dd]">async</span> (',
  '  <span class="text-[#e06c75]">idea</span>: <span class="text-[#e5c07b]">Idea</span>,',
  '  <span class="text-[#e06c75]">stack</span>: <span class="text-[#e5c07b]">TechStack</span>',
  '): <span class="text-[#e5c07b]">Promise</span>&lt;<span class="text-[#e5c07b]">Reality</span>&gt; =&gt; {',
  '  <span class="text-[#c678dd]">try</span> {',
  '    <span class="text-[#c678dd]">const</span> <span class="text-[#e06c75]">arch</span> = <span class="text-[#c678dd]">await</span> <span class="text-[#e5c07b]">Architect</span>.<span class="text-[#61afef]">design</span>(<span class="text-[#e06c75]">idea</span>);',
  '    <span class="text-[#c678dd]">const</span> <span class="text-[#e06c75]">app</span> = <span class="text-[#c678dd]">await</span> <span class="text-[#e5c07b]">Builder</span>.<span class="text-[#61afef]">construct</span>(<span class="text-[#e06c75]">arch</span>, <span class="text-[#e06c75]">stack</span>);',
  '    ',
  '    <span class="text-[#e06c75]">app</span>.<span class="text-[#61afef]">optimize</span>({ <span class="text-[#e06c75]">perf</span>: <span class="text-[#98c379] font-bold">\'max\'</span> });',
  '    ',
  '    <span class="text-[#c678dd]">return</span> <span class="text-[#e06c75]">app</span>.<span class="text-[#61afef]">deploy</span>();',
  '  } <span class="text-[#c678dd]">catch</span> (<span class="text-[#e06c75]">err</span>) {',
  '    <span class="text-[#c678dd]">throw</span> <span class="text-[#c678dd]">new</span> <span class="text-[#e5c07b]">Error</span>(<span class="text-[#98c379] italic">\'Fallback.\'</span>);',
  '  }',
  '};'
];

export default function LinkedInCover() {
  const coverRef = useRef<HTMLDivElement>(null);

  const downloadCover = async () => {
    const canvas = document.createElement('canvas');
    // Retina-ready LinkedIn dimensions (1584x396 * 2)
    canvas.width = 3168;
    canvas.height = 792;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 2; // Coordinate scale relative to the LinkedIn base size (1584x396)

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
      ctx.fillStyle = '#131313';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bg = await loadImage('/contact-bg.png');
      ctx.globalAlpha = 0.4;
      // Draw background to cover the wider 4:1 area
      const bgScale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
      const bgW = bg.width * bgScale;
      const bgH = bg.height * bgScale;
      ctx.drawImage(bg, (canvas.width - bgW) / 2, (canvas.height - bgH) / 2, bgW, bgH);
      ctx.globalAlpha = 1.0;

      // 2. Side Mask (Gradient from left)
      const sideGrad = ctx.createLinearGradient(0, 0, 1000 * scale, 0);
      sideGrad.addColorStop(0, 'rgba(19, 19, 19, 1.0)');
      sideGrad.addColorStop(0.6, 'rgba(19, 19, 19, 0.8)');
      sideGrad.addColorStop(1, 'rgba(19, 19, 19, 0.0)');
      ctx.fillStyle = sideGrad;
      ctx.fillRect(0, 0, 1000 * scale, canvas.height);

      // 3. Central Glow
      const glowGrad = ctx.createRadialGradient(
        792 * scale, 198 * scale, 0,
        792 * scale, 198 * scale, 600 * scale
      );
      glowGrad.addColorStop(0, 'rgba(176, 198, 255, 0.1)');
      glowGrad.addColorStop(1, 'rgba(176, 198, 255, 0.0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Content - Shifted for the wider 1584 width
      const startX = 600 * scale;
      const centerY = 198 * scale;

      // Logo + Name
      const logo = await loadImage('/logo160x160.png');
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0, 102, 230, 0.5)';
      ctx.drawImage(logo, startX, centerY - 80 * scale, 64 * scale, 64 * scale);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#e5e2e1';
      ctx.font = `bold ${40 * scale}px "Space Grotesk", sans-serif`;
      ctx.fillText('Karim ', startX + 85 * scale, centerY - 38 * scale);

      const karimWidth = ctx.measureText('Karim ').width;
      ctx.fillStyle = '#c2c6d7';
      ctx.font = `300 ${40 * scale}px "Space Grotesk", sans-serif`;
      ctx.fillText('Development', startX + 85 * scale + karimWidth, centerY - 38 * scale);

      // Subtitle
      ctx.fillStyle = '#c2c6d7';
      ctx.font = `300 ${18 * scale}px "Manrope", sans-serif`;
      ctx.fillText('Engineering Digital Excellence with Architectural Precision', startX, centerY);

      // URL Badge
      const badgeX = startX;
      const badgeY = centerY + 35 * scale;
      const badgeW = 260 * scale;
      const badgeH = 44 * scale;

      ctx.fillStyle = 'rgba(176, 198, 255, 0.05)';
      ctx.strokeStyle = 'rgba(176, 198, 255, 0.2)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 22 * scale);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#b0c6ff';
      ctx.font = `bold ${16 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('https://karims.dev', badgeX + badgeW / 2, badgeY + 28 * scale);
      ctx.textAlign = 'left';

      // 5. IDE Mockup (Placed further right)
      ctx.save();
      ctx.translate(1250 * scale, 198 * scale);
      ctx.rotate(-1.5 * Math.PI / 180);

      const ideW = 340 * scale;
      const ideH = 240 * scale;
      const ideX = -ideW / 2;
      const ideY = -ideH / 2;

      // Deep Shadow
      ctx.shadowBlur = 60;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.roundRect(ideX, ideY, ideW, ideH, 14 * scale);
      ctx.fill();
      ctx.shadowBlur = 0;

      // IDE Box
      ctx.fillStyle = '#1e1e1e';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(ideX, ideY, ideW, ideH, 14 * scale);
      ctx.fill();
      ctx.stroke();

      // Window Header
      ctx.fillStyle = '#2d2d2d';
      ctx.beginPath();
      ctx.roundRect(ideX, ideY, ideW, 40 * scale, [14 * scale, 14 * scale, 0, 0]);
      ctx.fill();

      // Mac Buttons
      ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(ideX + 25 * scale + (i * 18 * scale), ideY + 20 * scale, 6 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = `italic ${11 * scale}px monospace`;
      ctx.fillText('linkedin_header.ts', ideX + ideW / 2 - 50 * scale, ideY + 25 * scale);

      // Syntax Highlighted Code
      ctx.font = `${11 * scale}px "Fira Code", monospace`;
      const codeEntries = [
        ['const ', '#c678dd', 'engineer', '#61afef', ' = ', '#abb2bf', 'async', '#c678dd'],
        ['  try {', '#abb2bf'],
        ['    const ', '#c678dd', 'arch', '#e06c75', ' = ', '#abb2bf', 'await', '#c678dd', ' design();', '#abb2bf'],
        ['    const ', '#c678dd', 'app', '#e06c75', ' = ', '#abb2bf', 'await', '#c678dd', ' build(arch);', '#abb2bf'],
        ['    ', '#abb2bf'],
        ['    app.deploy();', '#abb2bf'],
        ['  } catch (e) { ... }', '#abb2bf']
      ];

      codeEntries.forEach((line, i) => {
        let xOff = ideX + 20 * scale;
        for (let j = 0; j < line.length; j += 2) {
          ctx.fillStyle = line[j + 1];
          ctx.fillText(line[j], xOff, ideY + 75 * scale + (i * 20 * scale));
          xOff += ctx.measureText(line[j]).width;
        }
      });

      ctx.restore();

      // DOWNLOAD
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = 'Karim_LinkedIn_Cover.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to capture LinkedIn cover:', err);
      alert('Asset generation failed. Ensure your browser supports Canvas2D and images are loaded.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-12 text-center space-y-2">
        <h2 className="text-white text-2xl font-headline font-bold">LinkedIn Asset Generator</h2>
        <p className="text-white/40 text-sm">Preview matches personal profile dimensions (1584x396)</p>
      </div>

      {/* 1584x396 scaled down to fit screen (e.g. 792x198 or similar) */}
      <div 
        ref={coverRef}
        className="w-full max-w-[1200px] aspect-[4/1] bg-[#131313] relative overflow-hidden flex items-center justify-center shadow-2xl border border-white/5"
      >
        {/* BG Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#131313] via-[#131313]/90 to-transparent" />
          <img 
            src="/contact-bg.png" 
            alt="background" 
            className="w-full h-full object-cover opacity-40 ml-[20%]" 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(176,198,255,0.05),transparent)] z-10" />
        </div>

        {/* Content Container - Shifted right to avoid Profile Picture */}
        <div className="relative z-20 w-full h-full flex items-center justify-between px-16 pl-[42%]">
          
          {/* Left Panel */}
          <div className="flex flex-col gap-1 max-w-lg">
            <div className="flex items-center gap-4 mb-4">
               <img src="/logo160x160.png" className="w-16 h-16 drop-shadow-blue" />
               <h1 className="text-4xl font-headline font-bold text-[#e5e2e1]">
                  Karim <span className="font-light text-[#c2c6d7]">Development</span>
               </h1>
            </div>
            
            <p className="text-lg font-light text-[#c2c6d7] mb-6">
               Engineering Digital Excellence with Architectural Precision
            </p>

            <div className="bg-primary/5 border border-primary/20 px-6 py-2 rounded-full self-start">
               <span className="font-mono text-sm tracking-[0.2em] font-bold text-primary">HTTPS://KARIMS.DEV</span>
            </div>
          </div>

          {/* Right Panel (IDE Mockup) */}
          <div className="w-[30%] aspect-[4/3] bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl transform rotate-[-1.5deg] hidden lg:block overflow-hidden">
             <div className="h-8 bg-[#2d2d2d] flex items-center px-4 gap-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="text-[10px] text-white/20 ml-auto font-mono">linkedin.ts</span>
             </div>
             <div className="p-4 font-mono text-[9px] text-white/40 leading-relaxed">
                <div className="text-purple-400">const <span className="text-blue-400">engineer</span> = async () ={">"} {"{"}</div>
                <div className="pl-4 italic">// Architecture first</div>
                <div className="pl-4">await design();</div>
                <div className="pl-4">return build();</div>
                <div>{"}"}</div>
             </div>
          </div>

        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <a 
          href="/"
          className="px-8 py-4 border border-white/10 text-white/60 font-headline font-bold tracking-widest uppercase rounded-full hover:bg-white/5 transition-all"
        >
          Back
        </a>
        <button
          onClick={downloadCover}
          className="px-10 py-4 bg-primary text-on-primary font-headline font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/30 active:scale-95 cursor-pointer"
        >
          Download 1584x396 PNG
        </button>
      </div>

      <style jsx>{`
        .drop-shadow-blue {
          filter: drop-shadow(0 0 20px rgba(0, 102, 230, 0.4));
        }
      `}</style>
    </div>
  );
}
