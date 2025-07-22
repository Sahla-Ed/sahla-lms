import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { protocol, rootDomain } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = subdomain;

  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = subdomain;

  if (!subdomainData) {
    notFound();
  }

  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4'>
      <div className='absolute top-4 right-4'>
        <Link
          href={`${protocol}://${rootDomain}`}
          className='text-sm text-gray-500 transition-colors hover:text-gray-700'
        >
          {rootDomain}
        </Link>
      </div>

      <div className='flex flex-1 items-center justify-center'>
        <div className='text-center'>
          <div className='mb-6 text-9xl'>{subdomainData}</div>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className='mt-3 text-lg text-gray-600'>
            This is your custom subdomain page
          </p>
        </div>
      </div>
    </div>
  );
}
