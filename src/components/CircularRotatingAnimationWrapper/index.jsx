import { Box } from '@mui/material';
import React from 'react';
import { BlueMovingDotIcon } from './BlueMovingDot';
import { CircleNeonBlueBlack } from './CircleNeonBlueBlack';
import { renderToStaticMarkup } from 'react-dom/server';

export const CircularRotatingAnimationWrapper = (props) => {
  const smallBox = () => {
    return (
      <Box
        sx={{
          //   background: 'yellow',
          width: '20px',
          height: '20px',
          animation: `rotate ${Math.random() * (6 - 2) + 2}s linear infinite`, // Animation definition
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <BlueMovingDotIcon />
        <BlueMovingDotIcon />
      </Box>
    );
  };

  const svgString = encodeURIComponent(
    renderToStaticMarkup(<CircleNeonBlueBlack />)
  );
  const svgDataUrl = `data:image/svg+xml,${svgString}`;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ position: 'relative' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {props.children}
      </Box>
      <Box
        sx={{
          backgroundImage: `url("${svgDataUrl}")`,
          backgroundSize: '300px 300px', // Ensure the background covers the entire box
          backgroundPosition: 'center', // Center the background
          backgroundRepeat: 'no-repeat', // Prevent the background from repeating
          animation: 'rotate 20s linear infinite', // Animation definition
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(360deg)',
            },
            '100%': {
              transform: 'rotate(0deg)',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: 'solid 1px',
            borderRadius: '50%',
            width: '200px',
            height: '200px',
            animation: 'rotate 4s linear infinite', // Animation definition
            '@keyframes rotate': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              //   background: 'red',
            }}
          >
            <Box>
              {smallBox()}
              {smallBox()}
            </Box>
            <Box>
              {smallBox()}
              {smallBox()}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Box>
              {smallBox()}
              {smallBox()}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
