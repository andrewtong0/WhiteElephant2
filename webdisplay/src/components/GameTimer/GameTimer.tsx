import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface GameTimerProps {
  initialSeconds: number;
  isTimerVisible: boolean;
}

const modifiedLineSize = 90
const loadingIconSize = 100

const GameTimer: React.FC<GameTimerProps> = ({ initialSeconds, isTimerVisible }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [shouldCountDown, setShouldCountDown] = useState(false);

  useEffect(() => {
    if (isTimerVisible && !shouldCountDown) {
      setShouldCountDown(true);
    }
  }, [isTimerVisible, shouldCountDown]);

  useEffect(() => {
    if (shouldCountDown && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, shouldCountDown]);

  return (<>
    <motion.div
      animate={{
        height: isTimerVisible ? 'auto' : 0,
        opacity: isTimerVisible ? 1 : 0
      }}
      transition={{ duration: 1.5 }}
      style={{ overflow: 'hidden', width: "100%" }}
    >
      <motion.div
        animate={seconds > 0 ? { opacity: [0.4, 1.1, 1] } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
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
          <motion.img
            src="/loading.gif"
            alt="Timer GIF"
            style={{ width: `${loadingIconSize}px`, height: `${loadingIconSize}px`, marginLeft: 10 }} // Adjust size and style as needed
            initial={{ opacity: 0 }}
            animate={seconds > 0 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  </>
  );
};

export default GameTimer;


