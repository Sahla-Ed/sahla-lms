'use client';

import { useEffect, useRef } from 'react';

interface DarkVeilProps {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  warpAmount?: number;
}

export function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0.05,
  scanlineIntensity = 0.1,
  speed = 0.5,
  warpAmount = 5,
}: DarkVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      time += 0.005 * speed;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      gradient.addColorStop(0, `hsl(${220 + hueShift}, 70%, 5%)`);
      gradient.addColorStop(1, `hsl(${240 + hueShift}, 70%, 10%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise
      if (noiseIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * noiseIntensity * 50;
          data[i] = Math.min(255, Math.max(0, data[i] + noise)); // Red
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // Green
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // Blue
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // Add scanlines
      if (scanlineIntensity > 0) {
        ctx.globalAlpha = scanlineIntensity;
        for (let y = 0; y < canvas.height; y += 2) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(0, y, canvas.width, 1);
        }
        ctx.globalAlpha = 1;
      }

      // Add warp effect
      if (warpAmount > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const source = new Uint8ClampedArray(imageData.data);
        const dest = imageData.data;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const sx = x + Math.sin(y * 0.01 + time) * warpAmount;
            const sy = y + Math.cos(x * 0.01 + time) * warpAmount;

            const dx = Math.floor(sx);
            const dy = Math.floor(sy);

            if (dx >= 0 && dx < canvas.width && dy >= 0 && dy < canvas.height) {
              const sourceIndex = (dy * canvas.width + dx) * 4;
              const destIndex = (y * canvas.width + x) * 4;

              dest[destIndex] = source[sourceIndex];
              dest[destIndex + 1] = source[sourceIndex + 1];
              dest[destIndex + 2] = source[sourceIndex + 2];
              dest[destIndex + 3] = source[sourceIndex + 3];
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      requestIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, warpAmount]);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 h-full w-full'
      style={{ pointerEvents: 'none' }}
    />
  );
}
