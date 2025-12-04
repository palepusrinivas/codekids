import { motion } from 'framer-motion';

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  intensity?: 'low' | 'medium' | 'high';
}

const colorMap = {
  primary: 'rgba(255, 75, 143, 0.5)',
  secondary: 'rgba(123, 61, 255, 0.5)',
  accent: 'rgba(46, 208, 255, 0.5)',
};

const intensityMap = {
  low: { blur: '20px', spread: '10px' },
  medium: { blur: '40px', spread: '20px' },
  high: { blur: '60px', spread: '30px' },
};

/**
 * Glow Effect - Adds animated glow around elements
 */
export function GlowEffect({ 
  children, 
  className = '', 
  color = 'primary',
  intensity = 'medium'
}: GlowEffectProps) {
  const glowColor = colorMap[color];
  const { blur, spread } = intensityMap[intensity];

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 ${blur} ${spread} ${glowColor}`,
          `0 0 ${parseInt(blur) * 1.5}px ${parseInt(spread) * 1.5}px ${glowColor}`,
          `0 0 ${blur} ${spread} ${glowColor}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

