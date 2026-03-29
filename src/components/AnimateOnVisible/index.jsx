import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const AnimatedOnVisible = ({
  component,
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  duration = 0.5,
  once = true,
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
}) => {
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) setSeen(true);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const shouldAnimateTo = seen || inView;

  return (
    <Box ref={ref}>
      <motion.div
        initial={from}
        animate={shouldAnimateTo ? to : from}
        transition={{ duration, ease: 'easeOut' }}
      >
        {component}
      </motion.div>
    </Box>
  );
};

export default AnimatedOnVisible;
