import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WelcomeScreen from './components/WelcomeScreen';
import Room1AccessTerminal from './components/Room1AccessTerminal';
import Room2SignalDecryption from './components/Room2SignalDecryption';
import Room3LaserGrid from './components/Room3LaserGrid';
import Room4MemoryFragment from './components/Room4MemoryFragment';
import Room5ServerMirror from './components/Room5ServerMirror';
import Room6GlitchLoop from './components/Room6GlitchLoop';
import Room7OmegaCore from './components/Room7OmegaCore';
import SuccessScreen from './components/SuccessScreen';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState<number>(0);
  const [username, setUsername] = useState('');

  const handleStart = (user: string) => {
    setUsername(user);
    setCurrentRoom(1);
  };

  const handleNextRoom = () => {
    setCurrentRoom(prev => prev + 1);
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* Global dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentRoom === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentRoom === 1 && (
          <motion.div
            key="room1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room1AccessTerminal onComplete={handleNextRoom} username={username} />
          </motion.div>
        )}

        {currentRoom === 2 && (
          <motion.div
            key="room2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room2SignalDecryption onComplete={handleNextRoom} />
          </motion.div>
        )}

        {currentRoom === 3 && (
          <motion.div
            key="room3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room3LaserGrid onComplete={handleNextRoom} />
          </motion.div>
        )}

        {currentRoom === 4 && (
          <motion.div
            key="room4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room4MemoryFragment onComplete={handleNextRoom} />
          </motion.div>
        )}

        {currentRoom === 5 && (
          <motion.div
            key="room5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room5ServerMirror onComplete={handleNextRoom} />
          </motion.div>
        )}

        {currentRoom === 6 && (
          <motion.div
            key="room6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room6GlitchLoop onComplete={handleNextRoom} />
          </motion.div>
        )}

        {currentRoom === 7 && (
          <motion.div
            key="room7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <Room7OmegaCore onComplete={handleNextRoom} />
          </motion.div>
        )}

        {currentRoom === 8 && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="size-full"
          >
            <SuccessScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}