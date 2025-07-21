import React from 'react';

const OCLogo = ({ width = 150, height = 150, color = "" }) => (
  <svg width={width} height={height} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <g fill={color}>
      <path d="M226 512c0-143 86-234 192-234 103 0 166 82 166 234s-63 234-166 234c-106 0-192-91-192-234zm303 0c0-117-45-186-111-186s-111 69-111 186c0 117 45 186 111 186s111-69 111-186z"/>
      <path d="M584 746V277h49l1 265 193-265h54l-168 232 177 232h-58l-148-197-1 197h-49z"/>
      <path d="M287 739l175-457h42l-175 457h-42z"/>
    </g>
  </svg>
);

export default OCLogo;
