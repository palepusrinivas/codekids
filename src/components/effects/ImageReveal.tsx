import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image, { ImageProps } from '@/components/Image';

interface ImageRevealProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
  revealDirection?: 'left' | 'right' | 'up' | 'down';
  parallax?: boolean;
}

/**
 * Image Reveal - Advanced image reveal with parallax and mask effects
 */
export function ImageReveal({
  src,
  alt,
  className = '',
  revealDirection = 'up',
  parallax = false,
  ...imageProps
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = parallax ? useTransform(scrollYProgress, [0, 1], [0, -50]) : 0;

  const directionMap = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 },
  };

  const { x: initialX, y: initialY } = directionMap[revealDirection];

  const containerClass = imageProps.fill 
    ? `absolute inset-0 ${className}` 
    : `relative ${className}`;

  // Extract className from imageProps if it exists
  const imageClassName = 'className' in imageProps && imageProps.className 
    ? imageProps.className 
    : '';

  return (
    <motion.div
      ref={ref}
      className={containerClass}
      style={parallax ? { y } : undefined}
    >
      <motion.div
        initial={{ opacity: 0, x: initialX, y: initialY, scale: 1.1 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
        transition={{
          duration: 1,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        className={imageProps.fill ? "absolute inset-0" : "relative"}
      >
        <Image
          src={src}
          alt={alt}
          {...imageProps}
          className={`${imageClassName} transition-transform duration-700 hover:scale-110`}
        />
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}

