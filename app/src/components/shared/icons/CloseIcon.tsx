import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
}

export const CloseIcon: React.FC<IconProps> = ({ width = '24', height = '24' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#closeIcon)">
        <path
          d="M20.749 4.70697L19.334 3.29297L12.042 10.586L4.74898 3.29297L3.33398 4.70697L10.627 12L3.33398 19.293L4.74898 20.707L12.042 13.414L19.334 20.707L20.749 19.293L13.456 12L20.749 4.70697Z"
          fill="#8F99A5"
        />
      </g>
      <defs>
        <clipPath id="closeIcon">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
