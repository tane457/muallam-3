'use client';

interface Message {
  text: string;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

const messages = [
  "Seni Seviyorum Mualla",
  "I Love You Mualla",
  "Je t'aime Mualla",
  "Ti amo Mualla",
  "Ich liebe dich Mualla",
  "Te amo Mualla",
  "愛してる ムアッラ",
  "我爱你 穆阿拉",
  "사랑해요 무알라",
];

export default function LoveMessage() {
  const colors = ['#ff00ff', '#00ff00', '#ff0000', '#0000ff', '#ffff00'];

  const createMessage = () => {
    const message = document.createElement('div');
    const text = messages[Math.floor(Math.random() * messages.length)];
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 50);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 20 + 20;
    const rotation = Math.random() * 30 - 15;

    message.className = 'absolute';
    message.style.left = `${x}px`;
    message.style.top = `${y}px`;
    message.style.fontSize = `${size}px`;
    message.style.color = color;
    message.style.transform = `rotate(${rotation}deg)`;
    message.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}`;
    message.style.transition = 'all 1s ease-in-out';
    message.style.opacity = '0';
    message.style.fontFamily = 'Arial, sans-serif';
    message.style.fontWeight = 'bold';
    message.style.whiteSpace = 'nowrap';
    message.style.pointerEvents = 'none';
    message.style.zIndex = '1000';
    message.textContent = text;

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.opacity = '1';
    }, 100);

    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 1000);
    }, 2000);
  };

  return { createMessage };
} 