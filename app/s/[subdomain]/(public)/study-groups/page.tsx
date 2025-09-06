import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Group } from 'lucide-react';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../../data/admin/get-tenant-settings';
import { cn } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'StudyGroupsPage.Metadata',
  });
  const tenant = await getTenantSettings();

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export default async function StudyGroupsPage() {
  const t = await getTranslations('StudyGroupsPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  return (
    <PlaceholderPage
      title={t('title')}
      description={t('description')}
      badgeText={t('badgeText')}
      icon={<Group className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />}
    />
  );
}