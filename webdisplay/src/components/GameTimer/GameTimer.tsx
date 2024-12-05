import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface GameTimerProps {
  initialSeconds: number;
}

const modifiedLineSize = 90

const GameTimer: React.FC<GameTimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <motion.div
      animate={ seconds > 0 ? { opacity: [0.4, 1.1, 1] } : { opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div style={{ position: 'relative', width: "100%", display: 'flex', alignItems: 'center' }}>
        <motion.div
          style={{
            display: 'inline-block',
            width: 'calc(100% - 3em)',
            height: 10,
            backgroundColor: 'white',
            marginTop: "10px",
            borderRadius: "100px",
          }}
          initial={{ width: `${modifiedLineSize}%` }}
          animate={{ width: `${(seconds / initialSeconds) * modifiedLineSize}%` }}
          transition={{ duration: 1 }}
        />
        <motion.h1
          key={seconds}
          initial={{ scale: 1.3, opacity: 1 }}
          animate={seconds > 0 ? { scale: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block', marginLeft: 10 }}
        >
          {seconds}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default GameTimer;

