import React from 'react';
import { Box } from '@mui/material';
import { SectionIntro } from '../SectionIntro';
import { useProjectsSection } from '../../hooks/useProjectsSection';

export const ProjectsSectionIntro = () => {
  const { data, loading } = useProjectsSection();

  return (
    <Box component="section" sx={{ width: '100%', mb: { xs: 1, sm: 2 } }}>
      <SectionIntro
        sectionLabel={data.sectionLabel}
        heading={data.heading}
        headingAccent={data.headingAccent}
        narrative={data.narrative}
        loading={loading}
      />
    </Box>
  );
};

export default ProjectsSectionIntro;
