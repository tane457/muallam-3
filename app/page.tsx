'use client';

import { useEffect, useRef } from 'react';
import LoveEffects from './components/LoveEffects';
import Firework from './components/Firework';

export default function Home() {
  const effectActive = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (effectActive.current) return;
    
    effectActive.current = true;
    const { createMessage, createHeart } = new LoveEffects();
    const { createFirework } = new Firework();
    
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(err);
    });
    
    if (buttonRef.current) {
      buttonRef.current.style.opacity = '0';
      buttonRef.current.style.pointerEvents = 'none';
    }
    
    const interval = setInterval(() => {
      for (let i = 0; i < 2; i++) {
        createMessage();
        createHeart();
        if (Math.random() > 0.7) { // %30 ihtimalle havai fişek
          createFirework();
        }
      }
    }, 200);

    timeoutRef.current = setTimeout(() => {
      clearInterval(interval);
      effectActive.current = false;
      
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.log(err);
        });
      }
      
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
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.log(err);
        });
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
