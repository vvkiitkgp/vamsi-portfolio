import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import { HomePageSectionHeading } from '../../components/HomePageSectionHeading';
import AboutMe from '../../components/AboutMe';
import NavBar from '../../components/NavBar';
import ProjectCard from '../../components/ProjectCard';
import SkillsSection from '../../components/SkillsSection';
import ExperienceSection from '../../components/ExperienceSection';
import ProjectsSectionIntro from '../../components/ProjectsSectionIntro';
import Fotter from '../../components/Fotter';
import { useProjects } from '../../hooks/useProjects';

const SECTIONS = [
  { key: 'ai', heading: 'AI Integrated Projects' },
  { key: 'ecommerce', heading: 'E-Commerce' },
  { key: 'simple', heading: 'Simple Function Projects' },
];

/* Card-shaped skeleton matching the ProjectCard grid item. */
const CardSkeleton = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid #EDEFF2' }}>
      <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '16 / 9' }} />
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton variant="text" width="60%" sx={{ fontSize: '1.2rem' }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="rounded" width={120} height={22} sx={{ borderRadius: '8px', mt: 1 }} />
      </Box>
    </Box>
  </Grid>
);

const ProjectGrid = ({ projects }) => (
  <Box sx={{ px: { xs: 2, sm: '10%' }, mt: 3 }}>
    <Grid container spacing={{ xs: 3, sm: 3.5 }} alignItems="stretch">
      {projects.map((project, i) => (
        <Grid item xs={12} sm={6} md={4} key={project.heading + i}>
          <ProjectCard data={project} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export const Home = () => {
  const { data, loading } = useProjects();

  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {/* Fixed nav — sibling of the hero/panel so it isn't trapped in the hero's stacking context */}
      <NavBar />

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
          pt: { xs: 3, sm: 5 },
          pb: { xs: 8, sm: 12 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, sm: 5 },
        }}
      >
        {/* Skills first — "what I know" before "what I've built" */}
        <Box id="skills" sx={{ scrollMarginTop: 80 }}>
          <SkillsSection />
        </Box>

        <Box id="experience" sx={{ scrollMarginTop: 80 }}>
          <ExperienceSection />
        </Box>

        <Box id="projects" sx={{ scrollMarginTop: 80, display: 'flex', flexDirection: 'column', gap: { xs: 4, sm: 5 } }}>
          <ProjectsSectionIntro />

          {loading ? (
            <Box sx={{ px: { xs: 2, sm: '10%' } }}>
              <Skeleton variant="text" width={220} sx={{ fontSize: '1.6rem', mb: 3 }} />
              <Grid container spacing={3.5}>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </Grid>
            </Box>
          ) : (
            SECTIONS.map(({ key, heading }) =>
              data?.[key]?.length > 0 ? (
                <Box key={key}>
                  <HomePageSectionHeading heading={heading} />
                  <ProjectGrid projects={data[key]} />
                </Box>
              ) : null
            )
          )}
        </Box>
      </Box>

      {/* ── Footer — sits above the hero in the scroll stack ── */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Fotter />
      </Box>
    </Box>
  );
};

export default Home;
