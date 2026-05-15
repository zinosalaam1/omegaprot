import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Room2Props {
  onComplete: () => void;
}

export default function Room2SignalDecryption({ onComplete }: Room2Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toUpperCase() === 'SOS') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative size-full bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-blue-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0ff 3px, #0ff 4px)'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-2xl px-4 sm:px-8 py-6 sm:py-8 ${error ? 'animate-shake' : ''}`}
      >
        {/* Oscilloscope */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-6 border-2 border-cyan-500/50 rounded-lg bg-cyan-950/20">
          <p className="text-cyan-400 font-mono mb-4 text-center text-sm sm:text-base">SIGNAL DETECTED:</p>

          <motion.div
            className="text-center text-3xl sm:text-5xl lg:text-6xl text-cyan-300 font-mono tracking-widest my-4 sm:my-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ••• --- •••
          </motion.div>

          {/* Audio bars */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 sm:w-4 bg-cyan-400 rounded-t"
                animate={{
                  height: [20, Math.random() * 60 + 20, 20]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-cyan-400 font-mono text-base sm:text-lg lg:text-xl mb-4 text-center">TRANSLATE SIGNAL</p>

          <div className="flex items-center gap-2 bg-cyan-950/30 p-3 sm:p-4 rounded border border-cyan-500/30">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-cyan-300 text-lg sm:text-xl lg:text-2xl outline-none font-mono uppercase text-center"
              placeholder="___"
              autoFocus
              maxLength={10}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-cyan-400 text-lg sm:text-xl lg:text-2xl"
            >
              █
            </motion.span>
          </div>

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
      </motion.div>
    </div>
  );
}
