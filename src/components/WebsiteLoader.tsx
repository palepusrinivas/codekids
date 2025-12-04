'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code, Brain, Rocket, Target, Zap, Cpu, Sparkles } from 'lucide-react';

export default function WebsiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSkills, setActiveSkills] = useState<number[]>([]);

  const skills = [
    { icon: Code, label: 'Coding', color: 'from-blue-500 to-cyan-500', delay: 0 },
    { icon: Brain, label: 'AI & ML', color: 'from-purple-500 to-pink-500', delay: 0.2 },
    { icon: Rocket, label: 'Robotics', color: 'from-pink-500 to-rose-500', delay: 0.4 },
    { icon: Cpu, label: 'Tech Skills', color: 'from-indigo-500 to-blue-500', delay: 0.6 },
    { icon: Target, label: 'Projects', color: 'from-orange-500 to-red-500', delay: 0.8 },
    { icon: Zap, label: 'Innovation', color: 'from-yellow-500 to-orange-500', delay: 1.0 },
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    // Progress animation
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 10 + 3, 100);
        
        // Activate skills based on progress
        const skillCount = Math.floor((newProgress / 100) * skills.length);
        const newActiveSkills = Array.from({ length: skillCount }, (_, i) => i);
        setActiveSkills(newActiveSkills);
        
        return newProgress;
      });
    }, 100);

    // Loader timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
      setProgress(100);
      setActiveSkills(Array.from({ length: skills.length }, (_, i) => i));
      if (progressInterval) clearInterval(progressInterval);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [skills.length]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
          {/* Animated Background Gradient */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20"
            style={{
              backgroundSize: '200% 200%',
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.h1
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Achieving Skills
              </motion.h1>
              <motion.p
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="text-white/70 text-sm font-medium"
              >
                Building your tech expertise...
              </motion.p>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 w-full">
              {skills.map((skill, index) => {
                const isActive = activeSkills.includes(index);
                const Icon = skill.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0.7,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{
                      delay: skill.delay,
                      duration: 0.5,
                      type: 'spring',
                      bounce: 0.4,
                    }}
                    className="relative"
                  >
                    {/* Glow Effect */}
                    {isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-xl`}
                      />
                    )}

                    {/* Skill Card */}
                    <div
                      className={`relative rounded-2xl p-6 backdrop-blur-xl border-2 transition-all duration-500 ${
                        isActive
                          ? 'bg-white/10 border-white/30 shadow-2xl'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      {/* Shimmer Effect */}
                      {isActive && (
                        <motion.div
                          animate={{
                            x: ['-200%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{ transform: 'skewX(-20deg)' }}
                        />
                      )}
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.div
                          animate={{
                            rotate: isActive ? [0, 10, -10, 0] : 0,
                            scale: isActive ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: 2,
                            repeat: isActive ? Infinity : 0,
                            ease: 'easeInOut',
                          }}
                          className={`mb-3 p-3 rounded-xl bg-gradient-to-br ${skill.color} ${
                            isActive ? 'shadow-lg' : 'opacity-50'
                          }`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <motion.p
                          animate={{
                            opacity: isActive ? 1 : 0.5,
                          }}
                          className={`text-sm font-semibold ${
                            isActive ? 'text-white' : 'text-white/50'
                          }`}
                        >
                          {skill.label}
                        </motion.p>
                      </div>

                      {/* Checkmark when active */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: skill.delay + 0.3, type: 'spring', bounce: 0.6 }}
                          className="absolute top-2 right-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                            <motion.svg
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: skill.delay + 0.5, duration: 0.3 }}
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              </motion.div>
            </motion.div>

            {/* Progress Percentage */}
            <motion.p
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-white text-xl font-bold mt-4"
            >
              {Math.round(progress)}%
            </motion.p>

            {/* Floating Sparkles - Reduced count for performance */}
            {activeSkills.length > 0 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => {
                  const randomX = Math.random() * 100;
                  const randomY = Math.random() * 100;
                  return (
                    <motion.div
                      key={i}
                      initial={{
                        x: `${randomX}%`,
                        y: `${randomY}%`,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: [`${randomY}%`, `${(randomY + 20) % 100}%`],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeOut',
                      }}
                      className="absolute"
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
