'use client';

import { CertificateDocument } from '@/app/s/[subdomain]/(public)/_components/CertificateDocument';
import { Button } from '@/components/ui/button';
import {
  checkCourseCompletion,
  issueCertificate,
} from '@/app/s/[subdomain]/data/course/certificate-actions';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Award, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CertificateDownloaderProps {
  courseId: string;
  courseTitle: string;
  userName: string;
}

export function CertificateDownloader({
  courseId,
  courseTitle,
  userName,
}: CertificateDownloaderProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    setError(null);
    checkCourseCompletion(courseId)
      .then((result) => {
        setIsCompleted(result.isCompleted);
      })
      .catch((err) => {
        console.log(err);

        setError('Failed to check course completion. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [courseId, isClient]);

  const handlePrepareCertificate = async () => {
    setIsPreparing(true);
    try {
      const certificate = await issueCertificate(courseId);
      if (certificate && certificate.id) {
        setCertificateId(certificate.id);
        toast.success('Your certificate is ready!');
      } else {
        throw new Error('Could not retrieve certificate ID.');
      }
    } catch (error) {
      console.log(error);

      toast.error('Failed to prepare certificate. Please try again.');
    } finally {
      setIsPreparing(false);
    }
  };

  if (!isClient || isLoading) {
    return (
      <Button variant='outline' className='w-full' disabled>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Checking Completion...
      </Button>
    );
  }

  if (error) {
    return (
      <Button variant='destructive' className='w-full' disabled>
        {error}
      </Button>
    );
  }

  if (!isCompleted) {
    return null;
  }

  if (!certificateId) {
    return (
      <Button
        variant='default'
        className='w-full bg-amber-500 hover:bg-amber-600'
        disabled={isPreparing}
        onClick={handlePrepareCertificate}
      >
        {isPreparing ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Preparing...
          </>
        ) : (
          <>
            <Award className='mr-2 h-4 w-4' />
            Generate Certificate
          </>
        )}
      </Button>
    );
  }
  return (
    <PDFDownloadLink
      document={
        <CertificateDocument
          userName={userName}
          courseTitle={courseTitle}
          completionDate={new Date().toLocaleDateString('en-US')}
          certificateId={certificateId}
        />
      }
      fileName={`${courseTitle.replace(/\s+/g, '_')}-Certificate.pdf`}
    >
      {({ loading }) => (
        <Button
          variant='default'
          className='w-full bg-green-500 hover:bg-green-600'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Generating PDF...
            </>
          ) : (
            <>
              <Award className='mr-2 h-4 w-4' />
              Download Now
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
