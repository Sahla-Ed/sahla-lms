import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { AppSidebar } from './_components/DashboardAppSidebar';
import { requireUser } from '../data/user/require-user';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../data/admin/get-tenant-settings';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const [tenant, tMetadata, tDashboard] = await Promise.all([
    getTenantSettings(),
    getTranslations('Metadata'),
    getTranslations('UserDashboardPage'),
    getLocale(),
  ]);

  return {
    title: {
      template: tMetadata('templateTitle', { tenantName: tenant.name }),
      default: tDashboard('metadataTitle', { tenantName: tenant.name }),
    },
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireUser();
  if (user?.role === 'admin') {
    return redirect('/admin');
  }


  const [t, tenant, locale] = await Promise.all([
    getTranslations('TenantPlatform.Sidebar'),
    getTenantSettings(),
    getLocale(),
  ]);
  const sidebarSide = locale === 'ar' ? 'right' : 'left';
  const headerTitle = `${t('dashboard')} - ${tenant.name}`;


  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' side={sidebarSide}/>
      <SidebarInset>
      <SiteHeader title={headerTitle} />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6'>
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}