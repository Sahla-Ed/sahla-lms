import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Metadata } from 'next';

interface CertificatePageProps {
  params: Promise<{ certificateId: string; subdomain: string }>;
}

async function getCertificateDetails(certificateId: string) {
  const certificate = await prisma.certificate.findUnique({
    where: {
      id: certificateId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      course: {
        select: {
          title: true,
          fileKey: true,
        },
      },
    },
  });

  return certificate;
}

export async function generateMetadata({
  params,
}: CertificatePageProps): Promise<Metadata> {
  const { certificateId } = await params;
  const certificate = await getCertificateDetails(certificateId);

  if (!certificate) {
    return {
      title: 'Invalid Certificate',
    };
  }

  return {
    title: `Certificate for ${certificate.course.title}`,
    description: `Verification for certificate awarded to ${certificate.user.name}.`,
  };
}

export default async function CertificateVerificationPage({
  params,
}: CertificatePageProps) {
  const { certificateId } = await params;
  const certificate = await getCertificateDetails(certificateId);

  if (!certificate) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <Card className='w-full max-w-md text-center'>
          <CardHeader>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900'>
              <XCircle className='h-6 w-6 text-red-600' />
            </div>
            <CardTitle className='mt-4 text-2xl font-bold'>
              Certificate Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              The certificate ID is invalid or does not exist. Please check the
              ID and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900'>
      <Card className='w-full max-w-2xl overflow-hidden'>
        <CardHeader className='text-center'>
          <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
            <CheckCircle className='h-10 w-10 text-green-600' />
          </div>
          <CardTitle className='mt-4 text-3xl font-bold'>
            Certificate Verified
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 px-8 pb-8 text-center'>
          <p className='text-muted-foreground'>
            This certificate was successfully issued to:
          </p>
          <p className='text-2xl font-semibold'>{certificate.user.name}</p>
          <p className='text-muted-foreground'>
            For successfully completing the course:
          </p>
          <p className='text-primary text-xl font-semibold'>
            {certificate.course.title}
          </p>
          <div className='flex items-center justify-center gap-4 pt-4'>
            <Badge variant='outline'>
              Issued on: {format(new Date(certificate.issuedAt), 'PPP')}
            </Badge>
            <Badge variant='secondary'>ID: {certificate.id}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
