import { useState } from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onStart: (username: string) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStart(username.trim());
    }
  };

  return (
    <div className="relative size-full bg-black flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#0f0 1px, transparent 1px), linear-gradient(90deg, #0f0 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0f0 3px, #0f0 4px)'
        }}
      />

      <div className="relative z-10 text-center space-y-4 sm:space-y-8 px-4 sm:px-8 max-w-4xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-green-400 font-mono text-3xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4"
            animate={{
              textShadow: [
                '0 0 10px rgba(34, 197, 94, 0.5)',
                '0 0 30px rgba(34, 197, 94, 1)',
                '0 0 10px rgba(34, 197, 94, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            TOUR ARCADE
          </motion.h1>

          <motion.p
            className="text-red-400 font-mono text-lg sm:text-xl lg:text-2xl"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            THE OMEGA PROTOCOL
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-2 sm:space-y-4 text-green-300 font-mono"
        >
          <p className="text-base sm:text-lg lg:text-xl">7-ROOM IMPOSSIBLE ESCAPE SYSTEM</p>
          <div className="border-t border-b border-green-500/30 py-2 sm:py-4 space-y-1 sm:space-y-2">
            <p className="text-green-400/70 text-xs sm:text-sm">⚠ WARNING: GLOBAL CLEAR RATE 1.7%</p>
            <p className="text-green-400/70 text-xs sm:text-sm">⚠ INCREASING PSYCHOLOGICAL PRESSURE</p>
            <p className="text-green-400/70 text-xs sm:text-sm">⚠ NO HINTS. NO MERCY.</p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-left"
        >
          {[
            'TERMINAL AUTHENTICATION',
            'SIGNAL DECRYPTION',
            'LASER NAVIGATION',
            'MEMORY RECONSTRUCTION',
            'SERVER SYNCHRONIZATION',
            'LOOP BREAKING',
            'OMEGA CORE ACCESS',
            'SYSTEM MANIPULATION'
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-slate-950/50 border border-green-500/30 p-2 sm:p-3 rounded"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 + i * 0.1 }}
            >
              <p className="text-green-400 font-mono text-xs sm:text-sm">✓ {feature}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Start button */}
        {!showForm ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, type: 'spring', stiffness: 200 }}
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-4 bg-green-900/30 border-2 border-green-500 text-green-400 font-mono text-base sm:text-lg lg:text-xl hover:bg-green-900/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all active:scale-95"
          >
            [ INITIALIZE PROTOCOL ]
          </motion.button>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4 w-full"
          >
            <div className="bg-slate-950/80 border-2 border-green-500/50 p-4 sm:p-6 rounded">
              <p className="text-green-400 font-mono mb-3 sm:mb-4 text-sm sm:text-base">ENTER OPERATIVE ID:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-transparent border-b-2 border-green-400 text-green-300 text-lg sm:text-xl lg:text-2xl outline-none px-2 py-1 sm:py-2 font-mono uppercase"
                  placeholder="USERNAME"
                  autoFocus
                  maxLength={15}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-green-400 text-lg sm:text-xl lg:text-2xl"
                >
                  █
                </motion.span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!username.trim()}
              className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-green-900/30 border-2 border-green-500 text-green-400 font-mono text-base sm:text-lg hover:bg-green-900/50 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all active:scale-95"
            >
              [ BEGIN MISSION ]
            </button>
          </motion.form>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 3
          }}
          className="text-green-400/40 font-mono text-[10px] sm:text-xs"
        >
          CLASSIFIED // LEVEL OMEGA // AUTHORIZED PERSONNEL ONLY
        </motion.p>
      </div>
    </div>
  );
}
