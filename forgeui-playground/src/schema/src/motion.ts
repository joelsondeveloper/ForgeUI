export type MotionConfiguration = {
  preset?: 'fade' | 'slideUp' | 'scaleIn' | 'stagger';
  initial?: MotionState;
  animate?: MotionState; // Agora opcional
  exit?: MotionState;
  whileHover?: MotionState;
  whileTap?: MotionState;
  transition: {
    duration: number;
    delay?: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring';
    springConfig?: {
      stiffness: number;
      damping: number;
    };
  };
};

export type MotionState = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotate?: number;
};