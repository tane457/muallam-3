'use client';

import { useEffect, useRef } from 'react';
import LoveEffects from './components/LoveEffects';

export default function Home() {
  const effectActive = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (effectActive.current) return;
    
    effectActive.current = true;
    const { createMessage, createHeart } = LoveEffects();
    
    if (buttonRef.current) {
      buttonRef.current.style.opacity = '0';
      buttonRef.current.style.pointerEvents = 'none';
    }
    
    const interval = setInterval(() => {
      for (let i = 0; i < 2; i++) {
        createMessage();
        createHeart();
      }
    }, 200);

    timeoutRef.current = setTimeout(() => {
      clearInterval(interval);
      effectActive.current = false;
      if (buttonRef.current) {
        buttonRef.current.style.opacity = '1';
        buttonRef.current.style.pointerEvents = 'auto';
      }
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button 
        ref={buttonRef}
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      >
        Dokun
      </button>
    </div>
  );
}
