
import { getTenantSettings } from '@/app/s/[subdomain]/data/admin/get-tenant-settings';
import { puckConfig } from '@/app/s/[subdomain]/admin/settings/landing-page/puck.config';
import { DefaultLandingPage } from './_components/DefaultLandingPage';
import { Data, Render } from '@measured/puck';

export default async function Home() {
  const tenant = await getTenantSettings();

  const landingPageData = tenant.landingPageData as Data | null;

  if (landingPageData) {
    return <Render config={puckConfig} data={landingPageData} />;
  }

  return <DefaultLandingPage />;
}
