import React, { forwardRef } from 'react';

export const ScrollTrackSVG = forwardRef((props, ref) => (
  <svg
    fill="none"
    // preserveAspectRatio="xMidYMax meet"
    id="eQoRuC0yjzG1"
    viewBox="0 0 300 600"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
  >
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="200%" height="200%">
        <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#1F51FF" />
      </filter>
    </defs>
    <path
      d="M0,150h92.371324q12.132352-3.860293,12.132352-11.580882t0-87.683824q.551471-9.375,9.375001-9.375t174.816175,0q7.169118.551471,7.169118,13.786765t0,188.602941q1.654409,15.441176-7.16912,15.441176t-174.816173,0q-9.375004-2.205882-9.375004-15.441176t0-88.235295q-2.757352-5.514707-12.132352-5.514707"
      transform="translate(.000003 0.000003)"
      fill="none"
      stroke="#D3D3D3"
      stroke-width="0.5"
      filter="url(#shadow)"
    />
    <path
      ref={ref}
      d="M0,150h92.371324q12.132352-3.860293,12.132352-11.580882t0-87.683824q.551471-9.375,9.375001-9.375t174.816175,0q7.169118.551471,7.169118,13.786765t0,188.602941q1.654409,15.441176-7.16912,15.441176t-174.816173,0q-9.375004-2.205882-9.375004-15.441176t0-88.235295q-2.757352-5.514707-12.132352-5.514707"
      transform="translate(.000003 0.000003)"
      fill="none"
      stroke="#04d9ff"
      stroke-width="2"
      filter="url(#shadow)"
    />
  </svg>
));
