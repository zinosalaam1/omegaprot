import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Room1Props {
  onComplete: () => void;
  username: string;
}

export default function Room1AccessTerminal({ onComplete, username }: Room1Props) {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(2);
  const [error, setError] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toUpperCase() === 'SYS') {
      onComplete();
    } else {
      setError(true);
      setAttempts(prev => prev - 1);
      setTimeout(() => setError(false), 500);

      if (attempts <= 1) {
        setTimeout(() => {
          setAttempts(2);
          setInput('');
        }, 2000);
      }
    }
  };

  return (
    <div className="relative size-full bg-black flex items-center justify-center overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0f0 3px, #0f0 4px)'
        }}
      />

      {/* Static flicker */}
      <motion.div
        className="absolute inset-0 bg-green-500/5 pointer-events-none"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        className={`w-full max-w-2xl px-4 sm:px-8 py-6 sm:py-8 font-mono text-green-400 ${error ? 'animate-shake' : ''}`}
      >
        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-4 text-green-500">BOOT SEQUENCE COMPLETE</p>
            <p className="mb-2">USER: {username}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="mb-2">AUTHORIZED USERS:</p>
            <p className="ml-4">ROOT</p>
            <p className="ml-4">ADMIN</p>
            <p className="ml-4">SYS</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-red-400"
          >
            <p className="mb-2">LAST FAILED LOGIN:</p>
            <p className="ml-4 tracking-[0.5em]">A D M I N</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="mb-4">ATTEMPTS REMAINING: {attempts}</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <span className={`${error ? 'text-red-500' : ''} text-xs sm:text-base whitespace-nowrap`}>ENTER USER:</span>
              <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-b-2 border-green-400 text-green-400 outline-none px-2 py-1 uppercase text-sm sm:text-base"
                  autoFocus
                  maxLength={10}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-green-400"
                >
                  █
                </motion.span>
              </div>
            </div>
          </form>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 mt-4 text-xs sm:text-base"
            >
              ⚠ SYSTEM INSTABILITY INCREASED
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
