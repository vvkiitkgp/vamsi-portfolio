import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  ImageList,
} from '@mui/material';
import vvkProfilePhoto from '../../assets/vvk_profile_photo.JPG';
import { motion } from 'framer-motion';

const HomeCards = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          background: 'red',
          height: '100vh',
          opacity: 0.5,
          width: '40%',
          position: 'absolute',
          zIndex: 4,
          backgroundImage: `url(${vvkProfilePhoto})`,
          backgroundSize: 'cover', // optional: adjust as needed
          backgroundPosition: 'center', // optional: adjust as needed
        }}
      />
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        style={{ height: '100vh', width: '40%', display: 'flex' }}
      >
        <Typography
          sx={{
            ml: 2,
            mt: 2,
            fontSize: 150,
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          VAMSI VINAY KUMAR
        </Typography>
      </motion.div>

      <Box
        sx={{
          height: '100vh',
          width: '60%',
          background: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '90vh',
            height: '70vh',
            background: 'black',
            border: 'solid 1px white',
            borderRadius: '5vh',
            padding: 5,
          }}
        >
          <Typography variant="h2" sx={{ color: 'white' }}>
            UI Developer - React
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', mt: 5 }}>
            Hello, I'm a 4+ year experienced Frontend Developer in React.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCards;
