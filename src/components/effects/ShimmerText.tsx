import { motion } from 'framer-motion';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

/**
 * Shimmer Text - Animated gradient text effect
 */
export function ShimmerText({ 
  children, 
  className = '',
  gradient = 'from-cyan-300 via-purple-300 to-pink-300'
}: ShimmerTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center', '0% center'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% auto',
      }}
    >
      {children}
    </motion.span>
  );
}

