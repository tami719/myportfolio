'use client';

import { useEffect, useRef } from 'react';
import styles from '../page.module.css';

type Snowflake = {
  x: number;
  y: number;
  radius: number;
  driftSeed: number;
};

export default function Snowfall() {
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

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const snowflakes: Snowflake[] = [];
    const maxFlakes = 100;

    for (let i = 0; i < maxFlakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        driftSeed: Math.random() * maxFlakes,
      });
    }

    const updateSnowflakes = () => {
      for (let i = 0; i < maxFlakes; i++) {
        const flake = snowflakes[i];
        flake.y += Math.cos(flake.driftSeed) + 1 + flake.radius / 2;
        flake.x += Math.sin(flake.driftSeed);

        if (flake.y > canvas.height) {
          snowflakes[i] = {
            x: Math.random() * canvas.width,
            y: 0,
            radius: flake.radius,
            driftSeed: flake.driftSeed,
          };
        }
      }
    };

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.beginPath();

      for (let i = 0; i < maxFlakes; i++) {
        const flake = snowflakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
      }

      ctx.fill();
      updateSnowflakes();
      requestAnimationFrame(drawSnowflakes);
    };

    drawSnowflakes();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.snowfall} />;
}
