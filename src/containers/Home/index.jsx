import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { HomePageSectionHeading } from '../../components/HomePageSectionHeading';
import AboutMe from '../../components/AboutMe';
import { CardV2 } from '../../components/Card/CardV2';
import { useProjects } from '../../hooks/useProjects';

export const Home = () => {
  const { data, loading } = useProjects();

  return (
    <Box sx={{ bgcolor: '#fff' }}>

      {/* ── Hero — sticks at top while white section scrolls over it ── */}
      <Box sx={{ position: 'sticky', top: 0, height: '100vh', zIndex: 0 }}>
        <AboutMe />
      </Box>

      {/* ── White content — slides up over the hero on scroll ── */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          bgcolor: '#fff',
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -12px 48px rgba(0,0,0,0.18)',
          px: { xs: 1.5, sm: 3 },
          py: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {data?.ai?.length > 0 && (
              <>
                <HomePageSectionHeading heading="AI Integrated Projects" />
                {data.ai.map((project, i) => (
                  <CardV2 key={project.heading + i} data={project} />
                ))}
              </>
            )}

            {data?.ecommerce?.length > 0 && (
              <>
                <HomePageSectionHeading heading="E-Commerce" />
                {data.ecommerce.map((project, i) => (
                  <CardV2 key={project.heading + i} data={project} />
                ))}
              </>
            )}

            {data?.simple?.length > 0 && (
              <>
                <HomePageSectionHeading heading="Simple Function Projects" />
                {data.simple.map((project, i) => (
                  <CardV2 key={project.heading + i} data={project} />
                ))}
              </>
            )}
          </>
        )}
      </Box>

    </Box>
  );
};

export default Home;
