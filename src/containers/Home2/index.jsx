import React from 'react';
import { motion, useScroll } from 'framer-motion';
import Card from '../../components/Card';
import { Box, Typography } from '@mui/material';
import vvkProfilePhoto from '../../assets/vvk_profile_photo.JPG';
import investmentPortfolioApp from '../../assets/investment-portfolio-app.webp';
import AnimatedOnVisible from '../../components/AnimateOnVisible';
import { VerticalNavBarFullPage } from '../../components/VerticalNavBarFullPage';
import { CircularRotatingAnimationWrapper } from '../../components/CircularRotatingAnimationWrapper';
import { ScrollTrackSVG } from '../../components/Card/ScrollTrackSVG';

export const Home2 = () => {
  const getCard1 = () => (
    <Card
      leftComponent={
        <Box>
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
        </Box>
      }
      rightComponent={
        <Box>
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
      }
      ratio={{ left: '40%', right: '60%' }}
      height="100vh"
    />
  );

  const getCard2 = () => (
    <Card
      midBorder={'none'}
      leftComponent={
        <Box>
          <AnimatedOnVisible
            from={{ x: -100 }}
            to={{ x: 0 }}
            component={
              <Box
                sx={{
                  width: '50vh',
                  height: '50vh',
                  background: 'black',
                  border: 'solid 1px white',
                  borderRadius: '5vh',
                  padding: 5,
                }}
              >
                <Typography variant="h2" sx={{ color: 'white' }}>
                  Portfolio Suggestions
                </Typography>
                <Typography variant="h5" sx={{ color: 'white', mt: 5 }}>
                  This app uses open AI API, and suggests a portfolio to invest
                  from a portfolio list provided, Based on the latest news.
                </Typography>
              </Box>
            }
          />
        </Box>
      }
      rightComponent={
        <Box>
          <AnimatedOnVisible
            from={{ x: 0 }}
            to={{ x: -100 }}
            component={
              <Box
                sx={{
                  width: '70vh',
                  height: '70vh',
                  background: 'black',
                  border: 'solid 1px black',
                  borderRadius: '5vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '69vh',
                    height: '69vh',
                    backgroundImage: `url(${investmentPortfolioApp})`,
                    backgroundSize: 'cover', // optional: adjust as needed
                    backgroundPosition: 'center', // optional: adjust as needed
                    border: 'solid 1px white',
                    borderRadius: '4vh',
                  }}
                />
              </Box>
            }
          />
        </Box>
      }
      ratio={{ left: '60%', right: '40%' }}
      height="70vh"
    />
  );

  const getCard3 = () => (
    <Card
      midBorder={'none'}
      rightComponent={
        <Box>
          <AnimatedOnVisible
            from={{ x: -100 }}
            to={{ x: 0 }}
            component={
              <Box
                sx={{
                  width: '50vh',
                  height: '50vh',
                  background: 'black',
                  border: 'solid 1px white',
                  borderRadius: '5vh',
                  padding: 5,
                }}
              >
                <Typography variant="h2" sx={{ color: 'white' }}>
                  Portfolio Suggestions
                </Typography>
                <Typography variant="h5" sx={{ color: 'white', mt: 5 }}>
                  This app uses open AI API, and suggests a portfolio to invest
                  from a portfolio list provided, Based on the latest news.
                </Typography>
              </Box>
            }
          />
        </Box>
      }
      leftComponent={
        <Box>
          <AnimatedOnVisible
            from={{ x: 0 }}
            to={{ x: -100 }}
            component={
              <Box
                sx={{
                  width: '70vh',
                  height: '70vh',
                  background: 'black',
                  border: 'solid 1px black',
                  borderRadius: '5vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '69vh',
                    height: '69vh',
                    backgroundImage: `url(${investmentPortfolioApp})`,
                    backgroundSize: 'cover', // optional: adjust as needed
                    backgroundPosition: 'center', // optional: adjust as needed
                    border: 'solid 1px white',
                    borderRadius: '4vh',
                  }}
                />
              </Box>
            }
          />
        </Box>
      }
      ratio={{ left: '60%', right: '40%' }}
      height="70vh"
    />
  );
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
