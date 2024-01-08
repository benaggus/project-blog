'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { color, motion, MotionConfig } from 'framer-motion';
import { is } from 'date-fns/locale';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [colorIndex, setColorIndex] = React.useState(0);
  const [isEnabled, setIsEnabled] = React.useState(true);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isEnabled) {
        setTimeElapsed((currentCount) => currentCount + 1);
        setColorIndex((currentIndex) => (currentIndex + 1) % COLORS.length);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isEnabled]);

  const selectedColor = COLORS[colorIndex];

  function toggleTimer() {
    setIsEnabled(!isEnabled);
  }

  function resetTimer() {
    setTimeElapsed(0);
    setColorIndex(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <motion.ul position={true} className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && <div className={styles.selectedColorOutline} />}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </motion.ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={toggleTimer}>
              {!isEnabled ? <Play /> : <Pause />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button onClick={resetTimer}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
