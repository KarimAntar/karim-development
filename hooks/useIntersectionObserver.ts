import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (elements.length) {
      observer.current = new IntersectionObserver((ioEntries) => {
        setEntries(ioEntries);
      }, options);

      elements.forEach(element => {
        observer.current?.observe(element);
      });
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elements, options]);

  return [observer.current, setElements, entries] as const;
};
