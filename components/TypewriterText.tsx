'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react'; // or framer-motion based on the project

export default function TypewriterText({ items }: { items: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const currentString = items[currentIndex];
    let typingSpeed = 60; // Normal typing speed

    if (isDeleting) {
      typingSpeed = 30; // Faster deleting
    }

    if (!isDeleting && displayText === currentString) {
      // Pause securely when word is fully typed
      typingSpeed = 3000;
      setIsDeleting(true);
    } else if (isDeleting && displayText === '') {
      // Pick a random next sentence
      setIsDeleting(false);
      setCurrentIndex((prev) => {
        if (items.length <= 1) return 0;
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * items.length);
        } while (nextIndex === prev);
        return nextIndex;
      });
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return currentString.substring(0, prev.length - 1);
        } else {
          return currentString.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, items]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-tertiary-fixed-dim align-middle ml-[2px]"
      />
    </span>
  );
}
