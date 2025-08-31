import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Search } from 'lucide-react';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SearchPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function SearchPage() {
  const t = await getTranslations('SearchPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  return (
    <PlaceholderPage
      title={t('title')}
      description={t('description')}
      badgeText={t('badgeText')}
      icon={<Search className={isRTL ? 'ml-2 h-4 w-4' : 'mr-2 h-4 w-4'} />}
    />
  );
}