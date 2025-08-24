import { JSX } from 'react';
import HomeClient from '../../components/HomeClient';
import DownloadFlyout from '@/components/DownloadFlyout';
import DownloadFlyoutUpdater from '@/utils/DownloadFlyoutUpdater';

export default function HomePage(): JSX.Element {
  return (
    <div className="flex flex-1 relative pb-20">
      <HomeClient />
      <DownloadFlyout />
      <DownloadFlyoutUpdater />
    </div>
  );
}
