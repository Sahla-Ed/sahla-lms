'use client';
import '@measured/puck/puck.css';

import { Puck, Data } from '@measured/puck';
import { puckConfig } from '../puck.config';
import { useTransition } from 'react';
import { saveLandingPageData } from '../actions';
import { toast } from 'sonner';
import { getTenantSettings } from '@/app/s/[subdomain]/data/admin/get-tenant-settings';

type TenantSettings = Awaited<ReturnType<typeof getTenantSettings>>;

export function LandingPageEditorClient({
  tenant,
}: {
  tenant: TenantSettings;
}) {
  const [_, startSaving] = useTransition();
  const initialData = (tenant.landingPageData as Data) || {
    content: [],
    root: {},
  };

  return (
    <div className='-mx-4 -my-4 h-[calc(100vh-var(--header-height))] md:-mx-6 md:-my-6 lg:-mx-6'>
      <Puck
        config={puckConfig}
        data={initialData}
        onPublish={(data: Data) => {
          startSaving(async () => {
            const result = await saveLandingPageData(data);
            if (result.status === 'success') {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          });
        }}
      />
    </div>
  );
}
