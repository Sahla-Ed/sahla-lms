import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import CourseCreationForm from './CourseCreationForm';


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'CreateCourseMetadata' });

  return {
    title: t('title'),
  };
}


export default function CreateCoursePage() {
  return <CourseCreationForm />;
}