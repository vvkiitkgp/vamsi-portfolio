import React from 'react';
import { Box } from '@mui/material';
import { ScrollTrackSVG } from '../../components/Card/ScrollTrackSVG';

export const Home2 = () => {
  return (
    <>
      {/* <VerticalNavBarFullPage /> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ background: 'white' }}
      >
        <ScrollTrackSVG />
        {/* <CircularRotatingAnimationWrapper /> */}
      </Box>
      {/* <Typography variant="h2" sx={{ mt: 10, ml: 5 }}>
        AI Integrated Projects
      </Typography> */}
    </>
  );
};

export default Home2;
