import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function SuccessScreen({ onRestart }: { onRestart?: () => void }) {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowStats(true), 2000);
  }, []);

  return (
    <div className="relative size-full bg-black flex items-center justify-center overflow-hidden">
      {/* Victory particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: '50%',
              top: '50%'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              x: [0, (Math.random() - 0.5) * 1000],
              y: [0, (Math.random() - 0.5) * 1000],
              opacity: [1, 0],
              scale: [0, 1]
            }}
            transition={{
              duration: 2,
              delay: i * 0.02,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {/* Radial burst */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: [0, 1, 0] }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-10 text-center space-y-6 sm:space-y-12 px-4 sm:px-8">
        {/* Main message */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.5
          }}
        >
          <motion.h1
            className="text-green-400 font-mono text-2xl sm:text-4xl lg:text-6xl mb-4 sm:mb-6"
            animate={{
              textShadow: [
                '0 0 20px rgba(34, 197, 94, 0.5)',
                '0 0 40px rgba(34, 197, 94, 1)',
                '0 0 20px rgba(34, 197, 94, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            OMEGA PROTOCOL BYPASSED
          </motion.h1>

          <motion.p
            className="text-green-300 font-mono text-xl sm:text-2xl lg:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ESCAPE COMPLETE
          </motion.p>
        </motion.div>

        {/* Stats */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-950/80 border-2 border-green-500/50 rounded-lg p-4 sm:p-8 inline-block w-full max-w-md"
          >
            <div className="space-y-3 sm:space-y-4 font-mono">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                <span className="text-green-400 text-sm sm:text-base">ROOMS COMPLETED:</span>
                <motion.span
                  className="text-green-300 text-xl sm:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  7 / 7
                </motion.span>
              </div>

              <div className="h-px bg-green-500/30" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                <span className="text-green-400 text-sm sm:text-base">GLOBAL CLEAR RATE:</span>
                <motion.span
                  className="text-yellow-400 text-xl sm:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  1.7%
                </motion.span>
              </div>

              <div className="h-px bg-green-500/30" />

              <motion.div
                className="text-center pt-3 sm:pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-green-300 text-base sm:text-lg">YOU ARE ONE OF THE FEW</p>
                <p className="text-green-400/70 text-xs sm:text-sm mt-2">CONGRATULATIONS, OPERATIVE</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Restart hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 3
          }}
          className="text-green-400/50 font-mono text-xs sm:text-sm"
        >
          Press F5 or{' '}
          <span
            onClick={onRestart}
            className="underline cursor-pointer hover:text-green-300"
          >
            click here
          </span>{' '}
          to restart mission
        </motion.p>

        {/* Grid effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#0f0 1px, transparent 1px), linear-gradient(90deg, #0f0 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}
