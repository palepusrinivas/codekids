import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * Blur Fade - Reveal animation with blur effect
 */
export function BlurFade({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionMap = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        filter: 'blur(10px)',
        ...offset
      }}
      animate={isInView ? { 
        opacity: 1, 
        filter: 'blur(0px)',
        x: 0,
        y: 0
      } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

