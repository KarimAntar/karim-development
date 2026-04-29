'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm **KarimAI**, your guide to Karim Development. Ask me anything about services, projects, or how to get in touch! 👋",
  timestamp: new Date(),
};

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-tertiary text-xs">$1</code>')
    .replace(/\n/g, '<br />');
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setIsStreaming(true);

    const historyForApi = [...messages, userMsg]
      .filter(m => m.id !== 'welcome')
      .map(({ role, content }) => ({ role, content }));

    abortRef.current = new AbortController();

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error('API error');

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMsg]);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content ?? '';
            if (delta) {
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId ? { ...m, content: m.content + delta } : m
                )
              );
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again or reach out at karimamdou7@gmail.com.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsStreaming(false);
      setIsTyping(false);
    }
  }, [input, isStreaming, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    abortRef.current?.abort();
    setIsOpen(false);
  };

  const SUGGESTIONS = ['What services do you offer?', 'Tell me about BloodBond', 'How do I contact Karim?'];

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] max-w-[400px] flex flex-col"
            style={{ maxHeight: 'calc(100vh - 7rem)' }}
          >
            <div
              className="flex flex-col rounded-2xl overflow-hidden border border-white/10"
              style={{
                background: 'rgba(19, 19, 19, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 0 60px rgba(0,102,230,0.15), 0 24px 48px rgba(0,0,0,0.5)',
                maxHeight: 'calc(100vh - 7rem)',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/3 shrink-0">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10">
                    <Image src="/logo_new.png" alt="KarimAI" width={36} height={36} className="object-cover" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#131313]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline text-sm font-semibold text-on-surface tracking-tight">KarimAI</p>
                  <p className="font-label text-[10px] text-emerald-400 tracking-widest uppercase">Online · Ask me anything</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white/8 hover:text-on-surface transition-all duration-200"
                  aria-label="Close chat"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 scrollbar-thin">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 shrink-0 mt-0.5">
                        <Image src="/logo_new.png" alt="KarimAI" width={28} height={28} className="object-cover" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-on-primary rounded-tr-sm'
                          : 'bg-white/6 text-on-surface border border-white/6 rounded-tl-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <span dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) || '&nbsp;' }} />
                      ) : (
                        msg.content
                      )}
                      {msg.role === 'assistant' && msg.content === '' && (
                        <span className="inline-block w-1.5 h-4 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 flex-row">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 shrink-0 mt-0.5">
                      <Image src="/logo_new.png" alt="KarimAI" width={28} height={28} className="object-cover" />
                    </div>
                    <div className="bg-white/6 border border-white/6 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions (only when no user messages yet) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); setTimeout(sendMessage, 0); }}
                      className="text-[10px] font-label tracking-wide uppercase px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 shrink-0 border-t border-white/6 mt-1">
                <div className="flex items-end gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 focus-within:border-primary/40 transition-all duration-300">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={e => {
                      setInput(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about services, projects..."
                    className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none outline-none font-body leading-relaxed"
                    style={{ maxHeight: '100px' }}
                    disabled={isStreaming}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isStreaming}
                    className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0 hover:bg-primary/80 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      send
                    </span>
                  </button>
                </div>
                <p className="text-center text-[9px] text-on-surface-variant/30 font-label tracking-widest mt-2 uppercase">
                  Powered by Karim Development
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ──────────────────────────────────────────────────── */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[9999]">
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 pointer-events-none" />
        )}
        <motion.button
          id="chatbot-toggle"
          onClick={() => setIsOpen(v => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,102,230,0.4)] transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #0066e6, #5cd5f6)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-white text-2xl"
              >
                close
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-white text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                chat
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread dot */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#131313] flex items-center justify-center">
              <span className="text-[8px] font-bold text-black">1</span>
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
