import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
}

export const AddIcon: React.FC<IconProps> = ({ width = '24', height = '24' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_442_10373)">
        <path d="M11 17.001H13V13.001H17V11.001H13V7.00098H11V11.001H7V13.001H11V17.001Z" fill="#757575" />
      </g>
      <defs>
        <clipPath id="clip0_442_10373">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
