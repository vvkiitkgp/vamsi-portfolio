import React from 'react';
import investmentPortfolioApp from '../../assets/investment-portfolio-app.webp';
import { Box } from '@mui/material';

export const ProjectImageButton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        //   backgroundImage: `url(${investmentPortfolioApp})`,
        //   backgroundSize: 'cover', // optional: adjust as needed
        //   backgroundPosition: 'center', // optional: adjust as needed
        //   border: 'solid 1px white',
        //   borderRadius: '4vh',
        background: 'yellow',
      }}
    />
  );
};
