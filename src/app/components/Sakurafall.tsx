'use client';

import { useEffect, useRef } from 'react';
import styles from '../page.module.css';

type SakuraPetal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  phase: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
};

function drawSakuraPetal(ctx: CanvasRenderingContext2D, petal: SakuraPetal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = petal.alpha;
  ctx.fillStyle = 'rgb(245, 211, 218)';
  ctx.beginPath();

  const width = petal.size * 0.75;
  const height = petal.size * 1.1;

  ctx.moveTo(0, -height * 0.9);
  ctx.bezierCurveTo(width, -height * 0.9, width, -height * 0.1, 0, height);
  ctx.bezierCurveTo(-width, -height * 0.1, -width, -height * 0.9, 0, -height * 0.9);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 140, 170, 0.25)';
  ctx.lineWidth = Math.max(1, petal.size * 0.06);
  ctx.stroke();
  ctx.restore();
}

export default function Sakurafall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const spawnPetal = (y: number): SakuraPetal => ({
      x: Math.random() * canvas.width,
      y,
      size: rand(6, 16),
      speedY: rand(0.8, 2.2),
      drift: rand(0.6, 2.0),
      phase: rand(0, Math.PI * 2),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.03, 0.03),
      alpha: rand(0.55, 0.95),
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const petals: SakuraPetal[] = Array.from({ length: 25 }, () => spawnPetal(Math.random() * canvas.height));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        petal.phase += 0.02;
        petal.x += Math.sin(petal.phase) * petal.drift;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 30 || petal.x < -50 || petal.x > canvas.width + 50) {
          petals[i] = spawnPetal(-20);
        }

        drawSakuraPetal(ctx, petals[i]);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.snowfall} />;
}
