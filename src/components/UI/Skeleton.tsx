import React, { type JSX } from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-5',
}: SkeletonProps): JSX.Element => (
  <div
    className={`bg-gray-300 rounded-md my-2 animate-pulse ${width} ${height}`}
  ></div>
);
