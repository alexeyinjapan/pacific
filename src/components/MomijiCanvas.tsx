import React, { useEffect, useRef, useState } from 'react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

export const MomijiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      '#B82626', // vermilion red
      '#C53B27', // crimson
      '#D47228', // autumn amber
      '#C5A059', // gold
      '#8B1515'  // deep scarlet
    ];

    const leafCount = 18; // tasteful, subtle, non-intrusive
    const leaves: Leaf[] = Array.from({ length: leafCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 10,
      speedX: Math.random() * 0.8 - 0.2,
      speedY: Math.random() * 0.9 + 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1.2 - 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.35 + 0.25
    }));

    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate((leaf.rotation * Math.PI) / 180);
      ctx.fillStyle = leaf.color;
      ctx.globalAlpha = leaf.opacity;

      // Stylized 5-lobed Japanese Momiji Maple leaf path
      ctx.beginPath();
      const s = leaf.size;
      ctx.moveTo(0, -s * 0.8);
      // Top tip
      ctx.bezierCurveTo(s * 0.3, -s * 0.5, s * 0.7, -s * 0.7, s * 0.9, -s * 0.3);
      // Right upper lobe
      ctx.bezierCurveTo(s * 0.6, -s * 0.1, s * 0.9, s * 0.2, s * 0.7, s * 0.5);
      // Right lower lobe
      ctx.bezierCurveTo(s * 0.4, s * 0.4, s * 0.2, s * 0.8, 0, s * 0.9);
      // Stem
      ctx.lineTo(0, s * 1.1);
      ctx.lineTo(-s * 0.05, s * 0.9);
      // Left lower lobe
      ctx.bezierCurveTo(-s * 0.2, s * 0.8, -s * 0.4, s * 0.4, -s * 0.7, s * 0.5);
      // Left upper lobe
      ctx.bezierCurveTo(-s * 0.9, s * 0.2, -s * 0.6, -s * 0.1, -s * 0.9, -s * 0.3);
      // Top left
      ctx.bezierCurveTo(-s * 0.7, -s * 0.7, -s * 0.3, -s * 0.5, 0, -s * 0.8);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(leaf.y * 0.008) * 0.5;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > height + 30) {
          leaf.y = -40;
          leaf.x = Math.random() * width;
        }
        if (leaf.x > width + 30) {
          leaf.x = -20;
        } else if (leaf.x < -30) {
          leaf.x = width + 20;
        }

        drawLeaf(leaf);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-30 h-full w-full select-none"
          aria-hidden="true"
        />
      )}
      {/* Subtle control button in bottom corner */}
      <button
        onClick={() => setEnabled(!enabled)}
        title={enabled ? "Приостановить листопад момидзи" : "Включить листопад момидзи"}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-white/90 px-3 py-1.5 text-xs text-stone-600 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-stone-900"
      >
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: enabled ? '#B82626' : '#9CA3AF' }} />
        <span>{enabled ? "Момидзи: вкл" : "Момидзи: выкл"}</span>
      </button>
    </>
  );
};
