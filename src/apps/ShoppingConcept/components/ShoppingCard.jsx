import React from 'react';
import Masonry from 'react-masonry-css';
import { Box, Card, Typography } from '@mui/material';

const ShoppingCard = ({
  image,
  images = [],
  name = 'Product Name',
  price = 30000,
  color = 'Red',
  size = 'M',
}) => {
  const priceLabel =
    price === null || price === undefined ? '—' : price.toLocaleString('en-IN');

  const galleryImages = images && images.length ? images : image ? [image] : [];

  const breakpointColumnsObj = {
    default: 2,
    600: 2,
    400: 1,
  };
  const randomHeights = ['120px', '180px', '230px', '150px', '200px'];

  return (
    <Card
      sx={{
        width: 360,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 14px 32px rgba(0,0,0,0.10)',
        borderRadius: '14px',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* TOP IMAGE GRID */}
      <Box
        sx={{
          height: '70%',
          overflowY: 'auto',
          px: 1,
          py: 1,
        }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {galleryImages.map((src, idx) => {
            const randomHeight = randomHeights[idx % randomHeights.length];
            return (
              <Box
                key={idx}
                sx={{
                  width: '100%',
                  height: randomHeight,
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 1.5,
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`img-${idx}`}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            );
          })}
        </Masonry>
      </Box>

      {/* PRODUCT DETAILS */}
      <Box
        sx={{
          height: '30%',
          px: 2,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            fontFamily:
              'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
            color: '#111827',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#4B5563',
            fontFamily:
              'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          Price: ₹ {priceLabel}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#4B5563',
            fontFamily:
              'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
          }}
        >
          Color: {color}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#4B5563',
            fontFamily:
              'Inter, "SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
          }}
        >
          Size: {size}
        </Typography>
      </Box>
    </Card>
  );
};

export default ShoppingCard;
