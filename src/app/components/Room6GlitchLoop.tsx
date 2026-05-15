import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Room6Props {
  onComplete: () => void;
}

export default function Room6GlitchLoop({ onComplete }: Room6Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(1);
  const [duplicateButtons, setDuplicateButtons] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIntensity(prev => Math.min(prev + 0.2, 3));
      setDuplicateButtons(prev => Math.min(prev + 1, 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input === '22') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative size-full bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Broken grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#f00 1px, transparent 1px), linear-gradient(90deg, #f00 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '10% 10%', '0% 0%'],
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

      {/* Screen tear effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

      <motion.div
        className={`w-full max-w-2xl px-4 sm:px-8 py-6 sm:py-8 ${error ? 'animate-shake' : ''}`}
        animate={{
          x: glitchIntensity > 2 ? [0, -2, 2, 0] : 0,
          filter: glitchIntensity > 2.5 ? ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] : 'hue-rotate(0deg)'
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity
        }}
      >
        <h2 className="text-red-400 font-mono text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-center">
          <motion.span
            animate={{
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity
            }}
          >
            THE GLITCH LOOP
          </motion.span>
        </h2>

        {/* Pattern display */}
        <div className="bg-slate-900/80 border-2 border-red-500/50 p-4 sm:p-6 mb-6 sm:mb-8 rounded relative overflow-hidden">
          {/* Glitch overlay */}
          <motion.div
            className="absolute inset-0 bg-red-500/20"
            animate={{
              opacity: [0, glitchIntensity * 0.3, 0]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity
            }}
          />

          <p className="text-red-400 font-mono mb-3 sm:mb-4 relative z-10 text-sm sm:text-base">INPUT:</p>
          <div className="space-y-2 relative z-10">
            {[7, 14, 21].map((num, i) => (
              <motion.p
                key={i}
                className="text-red-200 font-mono text-2xl sm:text-3xl"
                animate={{
                  x: glitchIntensity > 1.5 ? [0, -3, 3, 0] : 0
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  delay: i * 0.05
                }}
              >
                {num}
              </motion.p>
            ))}
            <motion.p
              className="text-red-400 font-mono text-2xl sm:text-3xl"
              animate={{
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity
              }}
            >
              ?
            </motion.p>
          </div>
        </div>

        {/* Broken buttons */}
        <div className="mb-6 sm:mb-8 space-y-2 relative min-h-[40px]">
          {[...Array(duplicateButtons)].map((_, i) => (
            <motion.div
              key={i}
              className="px-3 sm:px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-300 font-mono text-center text-xs sm:text-sm"
              style={{
                position: i > 0 ? 'absolute' as const : 'relative' as const,
                left: i > 0 ? `${50 + Math.sin(i) * 20}%` : undefined,
                top: i > 0 ? `${Math.cos(i) * 20}%` : undefined,
                opacity: i > 0 ? 0.3 : 1,
                pointerEvents: i > 0 ? 'none' as const : 'auto' as const
              }}
              animate={{
                rotate: i > 0 ? [0, 5, -5, 0] : 0
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity
              }}
            >
              [CORRUPTED BUTTON]
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.p
            className="text-red-400 font-mono text-base sm:text-lg lg:text-xl text-center mb-4"
            animate={{
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity
            }}
          >
            BREAK THE LOOP
          </motion.p>

          <motion.div
            className="flex items-center gap-2 bg-slate-900/80 p-3 sm:p-4 rounded border border-red-500/30"
            animate={{
              borderColor: ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.7)', 'rgba(239, 68, 68, 0.3)']
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-red-300 text-lg sm:text-xl lg:text-2xl outline-none font-mono text-center"
              placeholder="___"
              autoFocus
              maxLength={10}
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 font-mono text-center text-xs sm:text-sm"
            >
              ⚠ SYSTEM INSTABILITY INCREASED
            </motion.p>
          )}
        </form>

        {/* Timer glitch */}
        <motion.div
          className="mt-6 sm:mt-8 text-center font-mono text-red-400/50 text-xs sm:text-sm"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity
          }}
        >
          TIME: {Math.floor(Math.random() * 60).toString().padStart(2, '0')}:
          {Math.floor(Math.random() * 60).toString().padStart(2, '0')}
        </motion.div>
      </motion.div>
    </div>
  );
}
