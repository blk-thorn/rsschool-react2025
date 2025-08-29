import React from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-5',
}) => (
  <div
    className={`bg-gray-300 rounded-md my-2 animate-pulse ${width} ${height}`}
  ></div>
);
