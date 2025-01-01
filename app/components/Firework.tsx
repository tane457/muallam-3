'use client';

interface Particle {
  x: number;
  y: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  }
}

export default function Firework() {
  const colors = ['#ff69b4', '#ff1493', '#ff007f', '#ff0000', '#ff00ff'];
  
  const createParticle = (x: number, y: number, color: string) => {
    const particle = document.createElement('div');
    particle.className = 'absolute';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.innerHTML = '❤';
    particle.style.color = color;
    particle.style.fontSize = '12px';
    particle.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}`;
    particle.style.transition = 'all 0.8s ease-out';
    particle.style.opacity = '1';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    
    document.body.appendChild(particle);
    return particle;
  };

  const createFirework = () => {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight;
    const particles: HTMLDivElement[] = [];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Kalp şeklinde parçacıklar oluştur
    for (let angle = 0; angle < 360; angle += 15) {
      const r = 16 * Math.pow(Math.sin(angle * Math.PI / 180), 3);
      const particleX = x + r * Math.cos(angle * Math.PI / 180) * 10;
      const particleY = y + r * Math.sin(angle * Math.PI / 180) * 10;
      
      const particle = createParticle(x, y, color);
      particles.push(particle);
      
      setTimeout(() => {
        particle.style.transform = `translate(${particleX - x}px, ${particleY - y - 300}px)`;
        particle.style.opacity = '0';
      }, 10);
    }

    setTimeout(() => {
      particles.forEach(p => p.remove());
    }, 1000);
  };

  return { createFirework };
} 