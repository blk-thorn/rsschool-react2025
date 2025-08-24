'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from "next/navigation";
import { JSX, useEffect } from 'react';
import { EmptyVoid } from '@/types/types';

export default function DownloadFlyoutUpdater(): JSX.Element {
  const router: AppRouterInstance = useRouter();

  useEffect((): EmptyVoid => {
    const handler: EmptyVoid = (): void => router.refresh();
    window.addEventListener("storage", handler);
    return (): void => window.removeEventListener("storage", handler);
  }, [router]);

  return <></>;
}
