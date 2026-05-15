import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Room5Props {
  onComplete: () => void;
}

export default function Room5ServerMirror({ onComplete }: Room5Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [syncing, setSyncing] = useState(false);

  const leftWord = 'PACKET';
  const rightWord = 'TEKCAP';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= leftWord.length) {
        setLeftText(leftWord.slice(0, i));
        setRightText(rightWord.slice(0, i));
        i++;
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      setSyncing(true);
      setTimeout(() => setSyncing(false), 500);
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toUpperCase() === 'KC') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative size-full bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Digital grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00f 1px, transparent 1px), linear-gradient(90deg, #00f 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 bg-violet-500/5 pointer-events-none"
        animate={{
          opacity: [0, 0.1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

      <div className={`w-full max-w-5xl px-4 sm:px-8 py-6 sm:py-8 ${error ? 'animate-shake' : ''}`}>
        <h2 className="text-violet-400 font-mono text-base sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-center">SERVER MIRROR SYNCHRONIZATION</h2>

        {/* Dual terminals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          {/* Left terminal */}
          <motion.div
            className={`border-2 ${syncing ? 'border-violet-400' : 'border-violet-600/50'} bg-violet-950/20 p-4 sm:p-6 rounded-lg relative overflow-hidden`}
            animate={syncing ? {
              boxShadow: ['0 0 0 rgba(167, 139, 250, 0)', '0 0 20px rgba(167, 139, 250, 0.5)', '0 0 0 rgba(167, 139, 250, 0)']
            } : {}}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-violet-300 font-mono text-xs sm:text-sm">SERVER-A [CLEAN]</span>
            </div>

            <div className="text-center min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
              <motion.p
                className="text-violet-200 font-mono text-2xl sm:text-4xl lg:text-5xl tracking-wider break-all"
                animate={{
                  textShadow: syncing
                    ? ['0 0 0 rgba(167, 139, 250, 0)', '0 0 10px rgba(167, 139, 250, 1)', '0 0 0 rgba(167, 139, 250, 0)']
                    : []
                }}
              >
                {leftText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  █
                </motion.span>
              </motion.p>
            </div>
          </motion.div>

          {/* Right terminal */}
          <motion.div
            className={`border-2 ${syncing ? 'border-violet-400' : 'border-violet-600/50'} bg-violet-950/20 p-4 sm:p-6 rounded-lg relative overflow-hidden`}
            animate={syncing ? {
              boxShadow: ['0 0 0 rgba(167, 139, 250, 0)', '0 0 20px rgba(167, 139, 250, 0.5)', '0 0 0 rgba(167, 139, 250, 0)']
            } : {}}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"
                animate={{ opacity: [1, 0.5] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
              <span className="text-violet-300 font-mono text-xs sm:text-sm">SERVER-B [CORRUPTED]</span>
            </div>

            <div className="text-center min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
              <motion.p
                className="text-violet-200 font-mono text-2xl sm:text-4xl lg:text-5xl tracking-wider break-all"
                animate={{
                  textShadow: syncing
                    ? ['0 0 0 rgba(167, 139, 250, 0)', '0 0 10px rgba(167, 139, 250, 1)', '0 0 0 rgba(167, 139, 250, 0)']
                    : []
                }}
              >
                {rightText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                >
                  █
                </motion.span>
              </motion.p>
            </div>

            {/* Glitch overlay */}
            <motion.div
              className="absolute inset-0 bg-red-500/10"
              animate={{
                opacity: [0, 0.2, 0]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </motion.div>
        </div>

        {/* Sync indicator */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="flex items-center gap-4"
            animate={syncing ? {
              scale: [1, 1.1, 1]
            } : {}}
          >
            <div className="w-12 h-1 bg-violet-500/50 rounded" />
            <motion.div
              className="text-violet-400 font-mono text-2xl"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              ⟲
            </motion.div>
            <div className="w-12 h-1 bg-violet-500/50 rounded" />
          </motion.div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-violet-400 font-mono text-base sm:text-lg lg:text-xl text-center mb-4">SYNC BOTH</p>

          <div className="flex flex-col sm:flex-row items-center gap-2 bg-violet-950/30 p-3 sm:p-4 rounded border border-violet-500/30">
            <span className="text-violet-400 font-mono text-xs sm:text-sm whitespace-nowrap">SYNC KEY:</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full sm:flex-1 bg-transparent text-violet-300 text-lg sm:text-xl lg:text-2xl outline-none font-mono uppercase text-center"
              placeholder="__"
              autoFocus
              maxLength={10}
            />
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
      </div>
    </div>
  );
}
