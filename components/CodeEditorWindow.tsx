'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const codeSnippet = `const engineerDigitalExcellence = async (
  idea: Idea,
  stack: TechStack
): Promise<Reality> => {
  try {
    const architecture = await Architect.design(idea);
    const platform = await Builder.construct(architecture, stack);
    
    platform.optimize({ performance: 'maximum' });
    platform.applyCinematicUI();
    
    return platform.deploy();
  } catch (error) {
    throw new Error('Fallback to standard is not an option.');
  }
};

// Initializing the future...
await engineerDigitalExcellence(yourIdea, modernWeb);`;

const highlightCode = (text: string) => {
  // Escape HTML to prevent <Reality> from being parsed as a DOM node
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html
    // Strings
    .replace(/('[^']*'|"[^"]*")/g, '<span class="text-[#98c379]">$1</span>')
    // Comments
    .replace(/(\/\/.*)/g, '<span class="text-[#5c6370] italic">$1</span>')
    // Keywords
    .replace(/\b(const|let|var|async|await|try|catch|return|throw|new)\b/g, '<span class="text-[#c678dd]">$1</span>')
    // Functions
    .replace(/\b(engineerDigitalExcellence|design|construct|optimize|applyCinematicUI|deploy)\b(?=\s*\()/g, '<span class="text-[#61afef]">$1</span>')
    // Types & Classes
    .replace(/\b(Idea|TechStack|Reality|Promise|Error|Architect|Builder)\b/g, '<span class="text-[#e5c07b]">$1</span>')
    // Object Properties
    .replace(/\b(performance)\b(?=:)/g, '<span class="text-[#e06c75]">$1</span>')
    // Variables/Arguments
    .replace(/\b(idea|stack|architecture|platform|error|yourIdea|modernWeb)\b/g, '<span class="text-[#e06c75]">$1</span>');
  
  return { __html: html };
};

export default function CodeEditorWindow() {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) clearInterval(interval);
    }, 25); // typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100, rotateY: -15, rotateX: 10 }}
      animate={{ opacity: 1, x: 0, rotateY: -20, rotateX: 10 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="hidden lg:block absolute right-[-5%] xl:right-[5%] top-[15%] w-[500px] rounded-xl overflow-hidden bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6),_0_0_40px_rgba(0,102,230,0.2)] z-10 pointer-events-none"
    >
      {/* Mac OS Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d]/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]" />
        </div>
        <div className="text-xs text-white/40 font-mono font-medium tracking-wider">architecture.ts</div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>
      
      {/* Code Body */}
      <div className="p-6 font-mono text-[14px] leading-relaxed text-[#abb2bf] overflow-hidden h-[340px]">
        <pre className="whitespace-pre-wrap">
          <code dangerouslySetInnerHTML={highlightCode(displayedText)} />
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-[8px] h-[16px] bg-[#528bff] ml-1 align-middle translate-y-[-2px]"
          />
        </pre>
      </div>
    </motion.div>
  );
}
