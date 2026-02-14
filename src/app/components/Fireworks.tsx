'use client';

import { useEffect, useRef } from 'react';
import styles from '../page.module.css';

type FireworkTrail = {
  x: number;
  y: number;
  speedY: number;
  targetY: number;
  hue: number;
};

type FireworkSpark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
};

const INITIAL_TRAILS = 3;
const TRAIL_SPAWN_RATE = 0.03;

export default function Fireworks() {
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

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const trails: FireworkTrail[] = [];
    const sparks: FireworkSpark[] = [];

    const spawnTrail = () => {
      trails.push({
        x: rand(canvas.width * 0.15, canvas.width * 0.85),
        y: canvas.height + rand(10, 80),
        speedY: rand(4.8, 6.8),
        targetY: rand(canvas.height * 0.18, canvas.height * 0.5),
        hue: rand(0, 360),
      });
    };

    const explode = (trail: FireworkTrail) => {
      const count = Math.floor(rand(40, 64));
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(1.6, 5.1);
        sparks.push({
          x: trail.x,
          y: trail.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: rand(36, 58),
          size: rand(1.5, 3.3),
          hue: trail.hue + rand(-20, 20),
        });
      }
    };

    for (let i = 0; i < INITIAL_TRAILS; i++) {
      spawnTrail();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < TRAIL_SPAWN_RATE) {
        spawnTrail();
      }

      for (let i = trails.length - 1; i >= 0; i--) {
        const trail = trails[i];
        trail.y -= trail.speedY;

        ctx.fillStyle = `hsla(${trail.hue}, 95%, 70%, 0.55)`;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (trail.y <= trail.targetY) {
          explode(trail);
          trails.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.04;
        spark.life -= 1;

        const alpha = Math.max(0, (spark.life / 58) * 0.75);
        ctx.fillStyle = `hsla(${spark.hue}, 90%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();

        if (spark.life <= 0) {
          sparks.splice(i, 1);
        }
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
