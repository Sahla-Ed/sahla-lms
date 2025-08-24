import { ReactNode } from 'react';
import { Navbar } from './_components/Navbar';
import Footer from './_components/Footer';
import type { Metadata } from 'next';
import { getTenantSettings } from '../data/admin/get-tenant-settings';
import { getTranslations } from 'next-intl/server';


export async function generateMetadata(): Promise<Metadata> {
  
  const [tenant, t] = await Promise.all([
    getTenantSettings(),
    getTranslations('Metadata')
  ]);


  if (!tenant) {
    return {
      title: 'Learning Platform',
      description: 'An online learning platform.',
    };
  }

  return {
    title: {
      template: t('templateTitle', { tenantName: tenant.name }),
      default: t('defaultTitle', { tenantName: tenant.name }),
    },
    description: t('description', { tenantName: tenant.name }),
  };
}


export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}