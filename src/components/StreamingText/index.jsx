import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const StreamingText = ({ passage, typographyProps }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < passage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + passage[index]);
        setIndex(index + 1);
      }, 5); // Adjust the speed by changing the timeout value

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return <Typography {...typographyProps}>{displayedText}</Typography>;
};

export default StreamingText;
