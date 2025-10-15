import {
  getTenantSettingsBySlug,
  getAllTenantSlugs,
} from '@/lib/get-tenant-settings-static';
import { puckConfig } from '@/app/s/[subdomain]/admin/settings/landing-page/puck.config';
import { DefaultLandingPage } from './_components/DefaultLandingPage';
import { Data, Render } from '@measured/puck';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Generate static params for all tenants *This could be a performance issue if there are a lot of tenants*
export async function generateStaticParams() {
  const slugs = await getAllTenantSlugs();

  return slugs.map((slug) => ({
    subdomain: slug,
  }));
}

type Params = Promise<{ subdomain: string }>;

export default async function Home({ params }: { params: Params }) {
  const { subdomain } = await params;
  const tenant = await getTenantSettingsBySlug(subdomain);

  const landingPageData = tenant.landingPageData as Data | null;

  if (landingPageData) {
    return <Render config={puckConfig} data={landingPageData} />;
  }

  return <DefaultLandingPage />;
}
