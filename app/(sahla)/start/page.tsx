import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import StartplatformPage from './view';


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SahlaPlatform.StartPage.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function StartPage() {
  return <StartplatformPage />;
}