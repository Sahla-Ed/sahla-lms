'use client';

import { CertificateDocument } from '@/app/(public)/_components/CertificateDocument';
import { Button } from '@/components/ui/button';
import { issueCertificate } from '@/app/data/course/certificate-actions';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Award, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CertificateDownloaderProps {
  courseId: string;
  courseTitle: string;
  userName: string;
  isCourseComplete: boolean;
}

export function CertificateDownloader({
  courseId,
  courseTitle,
  userName,
  isCourseComplete,
}: CertificateDownloaderProps) {
  const [isClient, setIsClient] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient || !isCourseComplete) {
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
