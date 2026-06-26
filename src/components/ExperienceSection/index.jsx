import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useExperience } from '../../hooks/useExperience';

const FONT = 'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const CompanyLogo = ({ name, logoUrl }) => {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  if (logoUrl) {
    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '10px',
          flexShrink: 0,
          border: '1px solid #E5E7EB',
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.5,
        }}
      >
        <Box
          component="img"
          src={logoUrl}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F3F4F6',
        border: '1px solid #E5E7EB',
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 700,
        color: '#6B7280',
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </Box>
  );
};

const CompanyEntry = ({ company, isLast }) => (
  <Box
    sx={{
      py: 2.5,
      borderBottom: isLast ? 'none' : '1px solid #EDEFF2',
    }}
  >
    <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
      <CompanyLogo name={company.companyName} logoUrl={company.logoUrl} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
            mb: company.roles.length > 1 ? 1.25 : 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: 15, sm: 16 },
              fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.01em',
            }}
          >
            {company.companyName}
          </Typography>
          {company.totalDuration && (
            <Typography
              sx={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 500,
                color: '#9CA3AF',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {company.totalDuration}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {company.roles.map((role) => (
            <Box
              key={`${role.roleTitle}-${role.dateRange}`}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: { xs: 13.5, sm: 14 },
                  fontWeight: 500,
                  color: '#6B7280',
                  lineHeight: 1.45,
                }}
              >
                {role.roleTitle}
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: '#9CA3AF',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {role.dateRange}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

const NarrativeSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
    <Skeleton variant="text" width={140} />
    <Skeleton variant="text" width="90%" sx={{ fontSize: '2.4rem' }} />
    <Skeleton variant="text" width={200} />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="96%" />
    <Skeleton variant="text" width="88%" />
  </Box>
);

const CardSkeleton = () => (
  <Box
    sx={{
      borderRadius: '20px',
      border: '1px solid #EDEFF2',
      bgcolor: '#FAFAFA',
      p: { xs: 2.5, sm: 3 },
    }}
  >
    {[1, 2].map((i) => (
      <Box key={i} sx={{ py: 2, borderBottom: i < 2 ? '1px solid #EDEFF2' : 'none' }}>
        <Box sx={{ display: 'flex', gap: 1.75 }}>
          <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: '10px' }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="55%" />
            <Skeleton variant="text" width="70%" />
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

export const ExperienceSection = () => {
  const navigate = useNavigate();
  const { data, loading } = useExperience();

  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Box
        sx={{
          px: { xs: 2, sm: '10%' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' },
          gap: { xs: 4, lg: 6, xl: 8 },
          alignItems: 'start',
        }}
      >
        {/* Left — narrative */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {loading ? (
            <NarrativeSkeleton />
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 30, height: '1px', bgcolor: '#D1D5DB' }} />
                <Typography
                  sx={{
                    fontFamily: FONT,
                    fontSize: { xs: 12, sm: 13 },
                    color: '#9CA3AF',
                    letterSpacing: '0.04em',
                  }}
                >
                  {data.sectionLabel}
                </Typography>
              </Box>

              <Typography
                component="h2"
                sx={{
                  fontFamily: SERIF,
                  fontWeight: 700,
                  fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#111827',
                  mb: 1.5,
                }}
              >
                {data.heading}{' '}
                <Box component="span" sx={{ color: '#630dff' }}>
                  {data.headingAccent}
                </Box>
              </Typography>

              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9CA3AF',
                  mb: 2.5,
                }}
              >
                {data.subHeading}
              </Typography>

              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: { xs: 14.5, sm: 15.5 },
                  lineHeight: 1.75,
                  color: '#6B7280',
                  maxWidth: 480,
                }}
              >
                {data.narrative}
              </Typography>
            </>
          )}
        </Box>

        {/* Right — experience card */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        >
          {loading ? (
            <CardSkeleton />
          ) : (
            <Box
              sx={{
                borderRadius: '20px',
                border: '1px solid #EDEFF2',
                bgcolor: '#FAFAFA',
                px: { xs: 2.5, sm: 3 },
                pt: { xs: 1.5, sm: 2 },
                pb: { xs: 2, sm: 2.5 },
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {data.companies.map((company, i) => (
                <CompanyEntry
                  key={company.companyName}
                  company={company}
                  isLast={i === data.companies.length - 1}
                />
              ))}

              <Box
                onClick={() => navigate('/resume')}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  mt: 0.5,
                  color: '#630dff',
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'gap 0.2s ease, opacity 0.2s ease',
                  '&:hover': { gap: 1.25, opacity: 0.85 },
                }}
              >
                Open resume
                <ArrowForwardIcon sx={{ fontSize: 17 }} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ExperienceSection;
