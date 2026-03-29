import React from 'react';
import { Box } from '@mui/material';
import homePageInfoMock from '../../mock/homePageInfoMock';
import { HomePageSectionHeading } from '../../components/HomePageSectionHeading';
import AboutMe from '../../components/AboutMe';
import { CardV2 } from '../../components/Card/CardV2';


export const Home = () => {
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
        <HomePageSectionHeading heading="AI Integrated Projects" />
        <CardV2 data={homePageInfoMock.askAboutMe} />
        {/* <HomePageSectionHeading heading="Clones" />
        <CardV2 data={homePageInfoMock.facebookClone} />
        <CardV2 data={homePageInfoMock.amazonClone} />
        <HomePageSectionHeading heading="Proof of Concepts (POC)" />
        <CardV2 data={homePageInfoMock.clickDaily} />
        <CardV2 data={homePageInfoMock.listenWhatIListen} /> */}
        <HomePageSectionHeading heading="E-Commerce" />
        <CardV2 data={homePageInfoMock.jewelleryStore} />
        <HomePageSectionHeading heading="Simple Function Projects" />
        <CardV2 data={homePageInfoMock.HtmlToVisualConverter} />
        <CardV2 data={homePageInfoMock.reactForms} />
        <CardV2 data={homePageInfoMock.shoppingConcept} />
        <CardV2 data={homePageInfoMock.scrollableTable} />
      </Box>

    </Box>
  );
};

export default Home;
