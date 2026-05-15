import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Room7Props {
  onComplete: () => void;
}

const previousAnswers = ['SYS', 'SOS', '12345', '49', 'KC', '22'];

export default function Room7OmegaCore({ onComplete }: Room7Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntensity(prev => Math.min(prev + 0.1, 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toUpperCase() === 'SYSKC22') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative size-full bg-black flex items-center justify-center overflow-hidden">
      {/* Multiple overlapping grids */}
      <div className="absolute inset-0">
        {['#0f0', '#0ff', '#f0f', '#ff0'].map((color, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
              backgroundSize: `${50 + i * 20}px ${50 + i * 20}px`,
              opacity: 0.05
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Pulsing emergency lights */}
      <motion.div
        className="absolute inset-0 bg-red-500 pointer-events-none"
        animate={{
          opacity: [0, intensity * 0.3, 0]
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      />

      {/* Vault door overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-96 h-96 rounded-full border-8 border-orange-500/30"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 50px rgba(249, 115, 22, 0.3)',
              '0 0 100px rgba(249, 115, 22, 0.6)',
              '0 0 50px rgba(249, 115, 22, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-orange-400/50" />
          </div>
        </motion.div>
      </div>

      {/* Bass hum visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-orange-500"
            animate={{
              height: [10, Math.random() * 100 + 20, 10]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.02
            }}
          />
        ))}
      </div>

      <motion.div
        className={`relative z-10 w-full max-w-3xl px-4 sm:px-8 py-6 sm:py-8 ${error ? 'animate-shake' : ''}`}
        animate={{
          y: [0, -2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <motion.h1
          className="text-orange-400 font-mono text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center"
          animate={{
            textShadow: [
              '0 0 10px rgba(249, 115, 22, 0.5)',
              '0 0 30px rgba(249, 115, 22, 1)',
              '0 0 10px rgba(249, 115, 22, 0.5)'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          OMEGA CORE
        </motion.h1>

        {/* System status */}
        <motion.div
          className="bg-slate-950/80 border-2 border-orange-500/50 p-4 sm:p-6 mb-4 sm:mb-6 rounded"
          animate={{
            borderColor: ['rgba(249, 115, 22, 0.5)', 'rgba(249, 115, 22, 1)', 'rgba(249, 115, 22, 0.5)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <p className="text-orange-400 font-mono mb-3 sm:mb-4 text-sm sm:text-base">ALL INPUTS RECORDED</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {previousAnswers.map((answer, i) => (
              <motion.div
                key={i}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-orange-900/30 border border-orange-600/50 font-mono text-orange-300 text-center text-sm sm:text-base"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                {answer}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          className="bg-red-950/50 border-2 border-red-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        >
          <p className="text-red-400 font-mono text-xs sm:text-sm text-center">
            ⚠ CRITICAL: SYSTEM OVERHEATING
          </p>
        </motion.div>

        {/* Instructions */}
        <div className="bg-slate-950/80 border-2 border-orange-500/50 p-4 sm:p-6 mb-4 sm:mb-6 rounded">
          <p className="text-orange-400 font-mono text-center mb-2 text-sm sm:text-base">FINALIZE AUTHORIZATION</p>
          <div className="text-orange-300/70 font-mono text-xs sm:text-sm text-center space-y-1">
            <p>REMOVE EVERYTHING THAT WAS ONLY A SIGNAL.</p>
            <p>KEEP EVERYTHING THAT CHANGED A SYSTEM.</p>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-2 bg-slate-950/80 p-3 sm:p-4 rounded border-2 border-orange-500/50"
            animate={{
              boxShadow: [
                '0 0 0 rgba(249, 115, 22, 0)',
                '0 0 30px rgba(249, 115, 22, 0.5)',
                '0 0 0 rgba(249, 115, 22, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <span className="text-orange-400 font-mono text-xs sm:text-sm whitespace-nowrap">OMEGA KEY:</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full sm:flex-1 bg-transparent text-orange-300 text-base sm:text-lg lg:text-2xl outline-none font-mono uppercase text-center"
              placeholder="ENTER FINAL CODE"
              autoFocus
              maxLength={20}
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 font-mono text-center text-xs sm:text-sm"
            >
              ⚠ SYSTEM INSTABILITY CRITICAL
            </motion.p>
          )}
        </form>

        {/* Temperature gauge */}
        <div className="mt-6 sm:mt-8">
          <div className="flex justify-between text-orange-400/50 font-mono text-xs sm:text-sm mb-2">
            <span>CORE TEMP</span>
            <motion.span
              animate={{
                color: ['rgba(249, 115, 22, 0.5)', 'rgba(239, 68, 68, 1)', 'rgba(249, 115, 22, 0.5)']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              {(2500 + intensity * 1000).toFixed(0)}°C
            </motion.span>
          </div>
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-red-700"
              animate={{
                width: `${50 + intensity * 50}%`
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
