import React from 'react';

export default ({ rotate, color, style, width, height, className }) => (
  <svg
    className={className}
    width={width || 7}
    height={height || 14}
    viewBox="0 0 11 17"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    <title>Shape</title>
    <path
      d="M10.444 8.108L2.139.17a.577.577 0 0 0-.82 0l-.89.852a.527.527 0 0 0-.179.392c0 .148.06.278.178.392L7.432 8.5.428 15.195a.527.527 0 0 0-.178.391c0 .148.06.279.178.392l.891.852a.576.576 0 0 0 .82 0l8.304-7.938a.528.528 0 0 0 .178-.392.528.528 0 0 0-.177-.392z"
      fill={color}
      fillRule="nonzero"
    />
  </svg>
);
