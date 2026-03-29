import { Box } from '@mui/material';
import React from 'react';

export const VerticalNavBarFullPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        background: 'blue',
        width: '200px',
        position: 'absolute',
        left: '20px',
        top: '0px',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          height: '100vh',
          background: 'white',
          width: '2px',
          position: 'relative',
          left: '20px',
          top: '0px',
        }}
      />
      <Box
        sx={{
          height: '100vh',
          background: 'red',
          position: 'relative',
          left: '30px',
          top: '0px',
        }}
      >
        {['A', 'B', 'C'].map((item) => (
          <Box
            sx={{
              height: '50px',
              width: '100px',
              background: 'red',
              mb: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                background: 'white',
                height: '5px',
                width: '5px',
                borderRadius: '50%',
                mr: '5px',
              }}
            />
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
