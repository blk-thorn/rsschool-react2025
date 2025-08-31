import React, { type JSX } from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-[5px]',
}: SkeletonProps): JSX.Element => (
  <>
    <div className={`bg-gray-300 rounded-md my-2 ${width} ${height}`}></div>
  </>
);
