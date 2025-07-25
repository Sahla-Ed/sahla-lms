import { getTenantSettings } from '@/app/s/[subdomain]/data/admin/get-tenant-settings';
import { LandingPageEditorClient } from './_components/LandingPageEditorClient';

export default async function LandingPageEditorPage() {
  const tenantData = await getTenantSettings();

  if (!tenantData) {
    return <div>Error: Tenant information could not be loaded.</div>;
  }

  return <LandingPageEditorClient tenant={tenantData} />;
}
