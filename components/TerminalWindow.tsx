'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const lines = [
  "karim@dev-server:~$ ./engineer_reality.sh",
  "[INFO] Booting sequence initiated...",
  "[INFO] Optimizing cinematic assets...",
  "[INFO] Compiling next-gen platforms...",
  "[ OK ] Systems nominal at 100% capacity.",
  "[INFO] Awaiting user interaction...",
];

export default function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        currentLine++;
        setVisibleLines(currentLine);
      } else {
        clearInterval(interval);
      }
    }, 800); // 800ms per line
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100, y: 0 }}
      animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
      transition={{ 
        opacity: { duration: 1, ease: "easeOut", delay: 0.7 },
        x: { duration: 1, ease: "easeOut", delay: 0.7 },
        y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.7 }
      }}
      className="hidden lg:block absolute left-[-5%] xl:left-[5%] top-[55%] w-[400px] rounded-xl overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6),_0_0_40px_rgba(0,102,230,0.15)] z-10 pointer-events-none"
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto text-[11px] text-gray-400 font-mono font-bold tracking-widest text-center">karim@dev-server:~</div>
        <div className="w-[42px]" /> {/* Spacer */}
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 font-mono text-[13px] leading-8 text-[#4af626] h-[240px] flex flex-col">
        {lines.slice(0, visibleLines).map((line, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={idx === 0 ? "text-white mb-2" : "text-[#4af626]"}
          >
            {line.includes("[ OK ]") ? (
              <span><span className="text-[#00e676] font-bold">[ OK ]</span>{line.replace("[ OK ]", "")}</span>
            ) : line.includes("[INFO]") ? (
              <span><span className="text-[#29b6f6] font-bold">[INFO]</span>{line.replace("[INFO]", "")}</span>
            ) : line}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-[8px] h-[16px] bg-[#4af626] mt-2"
          />
        )}
      </div>
    </motion.div>
  );
}
