'use client';

import { useEffect, useRef } from 'react';
import styles from '../page.module.css';

type AutumnLeaf = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  sway: number;
  phase: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  alpha: number;
};

const LEAF_COLORS = ['#c85c43', '#be4d39', '#c76846', '#b85035', '#cf7a53'];
const LEAF_COUNT = 16;

export default function Momojifall() {
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

    const spawnLeaf = (y: number): AutumnLeaf => ({
      x: rand(0, canvas.width),
      y,
      size: rand(9, 15),
      speedY: rand(0.9, 1.9),
      sway: rand(0.45, 1.5),
      phase: rand(0, Math.PI * 2),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.03, 0.03),
      color: LEAF_COLORS[Math.floor(rand(0, LEAF_COLORS.length))],
      alpha: rand(0.18, 0.38),
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const leaves: AutumnLeaf[] = Array.from({ length: LEAF_COUNT }, () => spawnLeaf(rand(0, canvas.height)));

    const drawLeaf = (leaf: AutumnLeaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.alpha;
      ctx.fillStyle = leaf.color;

      const s = leaf.size;
      ctx.beginPath();
      // Maple-like simplified leaf silhouette
      ctx.moveTo(0, -s * 1.3);
      ctx.lineTo(s * 0.24, -s * 0.45);
      ctx.lineTo(s * 0.92, -s * 0.72);
      ctx.lineTo(s * 0.56, -s * 0.06);
      ctx.lineTo(s * 1.2, s * 0.22);
      ctx.lineTo(s * 0.42, s * 0.5);
      ctx.lineTo(s * 0.62, s * 1.12);
      ctx.lineTo(0, s * 0.68);
      ctx.lineTo(-s * 0.62, s * 1.12);
      ctx.lineTo(-s * 0.42, s * 0.5);
      ctx.lineTo(-s * 1.2, s * 0.22);
      ctx.lineTo(-s * 0.56, -s * 0.06);
      ctx.lineTo(-s * 0.92, -s * 0.72);
      ctx.lineTo(-s * 0.24, -s * 0.45);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(90, 28, 20, 0.28)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.7);
      ctx.lineTo(0, s * 1.05);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        leaf.phase += 0.02;
        leaf.x += Math.sin(leaf.phase) * leaf.sway;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > canvas.height + 30 || leaf.x < -50 || leaf.x > canvas.width + 50) {
          leaves[i] = spawnLeaf(-20);
        }

        drawLeaf(leaves[i]);
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
