import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Room4Props {
  onComplete: () => void;
}

const timestamps = [
  { time: '22:14', content: 'Subject entering corridor B' },
  { time: '22:09', content: 'Security breach detected' },
  { time: '22:19', content: 'Lockdown initiated' },
  { time: '22:04', content: 'Motion sensor triggered' }
];

export default function Room4MemoryFragment({ onComplete }: Room4Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [currentClip, setCurrentClip] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClip(prev => (prev + 1) % timestamps.length);
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input === '49') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative size-full bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* VHS noise */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
          backgroundSize: '100px 100px'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity
        }}
      />

      <div className={`w-full max-w-3xl px-4 sm:px-8 py-6 sm:py-8 ${error ? 'animate-shake' : ''}`}>
        {/* Surveillance display */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 mb-4">
            <h2 className="text-amber-400 font-mono text-sm sm:text-base lg:text-xl text-center sm:text-left">MEMORY FRAGMENT RECONSTRUCTION</h2>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500"
                animate={{ opacity: [1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-red-400 font-mono text-sm">REC</span>
            </div>
          </div>

          <motion.div
            className="border-2 sm:border-4 border-amber-600/50 bg-slate-900 p-4 sm:p-6 relative overflow-hidden"
            animate={glitch ? {
              x: [0, -5, 5, -2, 2, 0],
              filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
            } : {}}
            transition={{ duration: 0.2 }}
          >
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(251, 191, 36, 0.05) 5px, rgba(251, 191, 36, 0.05) 6px)'
              }}
            />

            <motion.div
              key={currentClip}
              initial={{ opacity: 0 }}
              animate={{ opacity: glitch ? 0.7 : 1 }}
              className="relative z-10"
            >
              <p className="text-amber-300 font-mono text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">{timestamps[currentClip].time}</p>
              <p className="text-amber-200 font-mono text-sm sm:text-base lg:text-lg">{timestamps[currentClip].content}</p>

              {/* Timecode */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-700/50">
                <p className="text-amber-500/70 font-mono text-xs sm:text-sm">
                  FRAME: {(currentClip + 1).toString().padStart(4, '0')} / 0004
                </p>
              </div>
            </motion.div>

            {glitch && (
              <motion.div
                className="absolute inset-0 bg-amber-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        </div>

        {/* Timeline display */}
        <div className="bg-slate-900/80 border-2 border-amber-500/50 p-3 sm:p-4 mb-4 sm:mb-6 rounded">
          <p className="text-amber-400 font-mono mb-2 text-xs sm:text-sm">DETECTED TIMESTAMPS:</p>
          <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
            {timestamps.map((ts, i) => (
              <motion.div
                key={i}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-amber-900/30 border border-amber-600/50 font-mono text-amber-300 text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                {ts.time}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-amber-400 font-mono text-center mb-4 text-sm sm:text-base">REBUILD THE TIMELINE</p>

          <div className="flex items-center gap-2 bg-slate-900/80 p-3 sm:p-4 rounded border border-amber-500/30">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-amber-300 text-lg sm:text-xl lg:text-2xl outline-none font-mono text-center"
              placeholder="ENTER CODE"
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
