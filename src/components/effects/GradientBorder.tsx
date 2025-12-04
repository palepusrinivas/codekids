import { motion } from 'framer-motion';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  animated?: boolean;
}

/**
 * Gradient Border - Animated gradient border effect
 */
export function GradientBorder({ 
  children, 
  className = '', 
  borderWidth = 2,
  animated = true
}: GradientBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {animated ? (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            padding: `${borderWidth}px`,
            background: 'linear-gradient(90deg, #FF4B8F, #7B3DFF, #2ED0FF, #FF4B8F)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-full h-full bg-background rounded-2xl" />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            padding: `${borderWidth}px`,
            background: 'linear-gradient(90deg, #FF4B8F, #7B3DFF, #2ED0FF)',
          }}
        >
          <div className="w-full h-full bg-background rounded-2xl" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

