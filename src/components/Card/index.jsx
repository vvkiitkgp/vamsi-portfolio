import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { ScrollTrackSVG } from './ScrollTrackSVG';
import investmentPortfolioApp from '../../assets/investment-portfolio-app.webp';
import { Infocard } from '../InfoCard';
import AnimatedOnVisible from '../AnimateOnVisible';

const Card = ({ data }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength} ${pathLength}`;
      path.style.strokeDashoffset = pathLength; // Initially fully undrawn

      const handleScroll = () => {
        if (inView) {
          const boundingRect = cardRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const cardCenter = boundingRect.top + boundingRect.height / 2;
          const startDrawingPoint = (viewportHeight * 9) / 10;
          const endDrawingPoint = (viewportHeight * 4) / 10;

          if (cardCenter <= startDrawingPoint) {
            const totalRange = startDrawingPoint - endDrawingPoint;
            const distanceIntoRange = Math.max(
              0,
              startDrawingPoint - cardCenter
            );
            const scrollPercentage = Math.min(
              distanceIntoRange / totalRange,
              1
            );

            console.log(scrollPercentage, data.heading, 'SCROLL PER');
            const drawLength = pathLength * (1 - scrollPercentage);
            path.style.strokeDashoffset = drawLength;
          } else {
            path.style.strokeDashoffset = pathLength; // Fully undrawn when below start point
          }
        } else {
          // Ensure blue line stays undrawn once it has been fully undrawn
          if (path.style.strokeDashoffset !== '0') {
            path.style.strokeDashoffset = pathLength;
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial draw on mount

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [inView]);

  return (
    <AnimatedOnVisible
      from={{ x: 200 }}
      to={{ x: 50 }}
      component={
        <Box
          ref={cardRef}
          sx={{
            width: '100%',
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Infocard heading={data.heading} info={data.info} />
          <Box
            sx={{
              position: 'relative',
              height: '300px',
              width: '500px',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                top: '-100px',
                width: '500px',
              }}
            >
              <ScrollTrackSVG ref={pathRef} />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '-30px',
                right: '10px',
                height: '360px',
                width: '311px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '95%',
                  height: '95%',
                  backgroundImage: `url(${data.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: 'solid 1px white',
                  borderRadius: '5px',
                }}
              />
            </Box>
          </Box>
        </Box>
      }
    />
  );
};

export default Card;
