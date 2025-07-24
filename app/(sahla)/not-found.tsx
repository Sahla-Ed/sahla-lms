import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Sahla',
  description:
    'The page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.',
};

export default function NotFoundPage() {
  return (
    <div className='from-background via-secondary/20 to-primary/5 flex min-h-screen items-center justify-center bg-gradient-to-br px-4'>
      <h1>not found</h1>
    </div>
  );
}
