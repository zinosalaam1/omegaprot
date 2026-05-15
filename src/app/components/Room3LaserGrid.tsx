import { useState } from 'react';
import { motion } from 'motion/react';

interface Room3Props {
  onComplete: () => void;
}

const nodes = [
  { id: 1, color: 'red', x: 20, y: 20 },
  { id: 2, color: 'blue', x: 50, y: 30 },
  { id: 3, color: 'green', x: 35, y: 50 },
  { id: 4, color: 'red', x: 65, y: 55 },
  { id: 5, color: 'blue', x: 80, y: 40 },
  { id: 6, color: 'red', x: 70, y: 70 },
  { id: 7, color: 'blue', x: 25, y: 75 },
  { id: 8, color: 'green', x: 55, y: 80 },
  { id: 9, color: 'blue', x: 85, y: 85 },
  { id: 10, color: 'green', x: 40, y: 90 }
];

export default function Room3LaserGrid({ onComplete }: Room3Props) {
  const [input, setInput] = useState('');
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const [error, setError] = useState(false);
  const [showInfrared, setShowInfrared] = useState(false);

  const handleNodeClick = (nodeId: number) => {
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
    } else {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input === '12345') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const getNodeColor = (color: string) => {
    switch (color) {
      case 'red': return showInfrared ? 'bg-red-500' : 'bg-red-600';
      case 'blue': return showInfrared ? 'bg-blue-500' : 'bg-blue-600';
      case 'green': return showInfrared ? 'bg-green-500' : 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative size-full bg-slate-900 flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#0f0 1px, transparent 1px), linear-gradient(90deg, #0f0 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Laser beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-0.5 ${error ? 'bg-red-500' : 'bg-green-400/30'}`}
            style={{
              top: `${15 + i * 15}%`,
              left: 0,
              right: 0
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-green-400 font-mono text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">LASER GRID HALLWAY</h2>
          <button
            onClick={() => setShowInfrared(!showInfrared)}
            className="px-3 sm:px-4 py-2 bg-green-900/50 border border-green-500 text-green-400 font-mono text-xs sm:text-sm hover:bg-green-900 transition-colors active:scale-95"
          >
            {showInfrared ? '[ INFRARED: ON ]' : '[ INFRARED: OFF ]'}
          </button>
        </div>

        {/* Safe path panel */}
        <div className="bg-slate-950/80 border-2 border-green-500/50 p-3 sm:p-4 mb-4 sm:mb-6 rounded">
          <p className="text-green-400 font-mono mb-2 text-xs sm:text-sm">SAFE PATH SEQUENCE:</p>
          <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
            {['RED', 'BLUE', 'GREEN', 'RED', 'BLUE'].map((color, i) => (
              <div
                key={i}
                className={`px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm ${
                  color === 'RED' ? 'bg-red-900 text-red-300' :
                  color === 'BLUE' ? 'bg-blue-900 text-blue-300' :
                  'bg-green-900 text-green-300'
                }`}
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          className={`relative w-full h-64 sm:h-80 lg:h-96 bg-slate-950/50 border-2 ${error ? 'border-red-500' : 'border-green-500/50'} rounded-lg mb-4 sm:mb-6`}
          animate={error ? {
            boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 30px rgba(239, 68, 68, 0.5)', '0 0 0 rgba(239, 68, 68, 0)']
          } : {}}
        >
          {nodes.map(node => (
            <motion.div
              key={node.id}
              className={`absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer touch-none ${getNodeColor(node.color)} ${
                selectedNodes.includes(node.id) ? 'ring-2 sm:ring-4 ring-white' : ''
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleNodeClick(node.id)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleNodeClick(node.id);
              }}
              animate={{
                boxShadow: selectedNodes.includes(node.id)
                  ? ['0 0 10px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 10px rgba(255,255,255,0.5)']
                  : []
              }}
              transition={{ duration: 1, repeat: Infinity }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs text-white font-bold">
                {node.id}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-950/80 p-3 sm:p-4 rounded border border-green-500/30">
            <span className="text-green-400 font-mono text-xs sm:text-sm whitespace-nowrap">PATH CODE:</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full sm:flex-1 bg-transparent text-green-300 text-base sm:text-lg lg:text-xl outline-none font-mono text-center sm:text-left"
              placeholder="ENTER SEQUENCE"
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
