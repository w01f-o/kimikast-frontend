'use client';

import { useSettings } from '@/shared/lib';
import { Particle } from '@/widgets/snowfall/lib';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';

export const Snowfall: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    snow: { isEnabled },
  } = useSettings();

  useEffect(() => {
    if (isEnabled) {
      const { current: canvasEl } = canvasRef;
      const count = 25;
      const particles: Particle[] = [];

      if (!canvasEl) return;

      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;

      const ctx = canvasEl.getContext('2d');

      if (ctx) {
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(canvasEl.width, canvasEl.height));
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

          particles.forEach(particle => {
            particle.draw(ctx);
            particle.update();
          });

          requestAnimationFrame(animate);
        };

        animate();
      }
    }
  }, [isEnabled]);

  return (
    <AnimatePresence>
      {isEnabled && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.2, 1],
          }}
        >
          <canvas ref={canvasRef} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
