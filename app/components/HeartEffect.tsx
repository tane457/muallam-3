'use client';

interface Heart {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export default function HeartEffect() {
  const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff007f', '#ff69b4'];
  const hearts: Heart[] = [];

  const createHeart = (x: number, y: number) => {
    const heart = document.createElement('div');
    const size = Math.random() * 20 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = Math.random() * 360;

    heart.className = 'absolute';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = color;
    heart.style.transform = `rotate(${rotation}deg)`;
    heart.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}`;
    heart.innerHTML = '❤';
    heart.style.transition = 'all 0.5s ease-out';
    heart.style.opacity = '1';
    heart.style.pointerEvents = 'none';

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.opacity = '0';
      heart.style.transform = `rotate(${rotation}deg) translateY(-100px)`;
      setTimeout(() => heart.remove(), 500);
    }, 500);
  };

  return { createHeart };
} 