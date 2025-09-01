import { env } from '@/lib/env';

const PLACEHOLDER_IMAGE =
  'https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg';

function isAbsoluteUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function constructUrl(key: string | null | undefined): string {
  if (!key) {
    return PLACEHOLDER_IMAGE;
  }

  if (isAbsoluteUrl(key)) {
    return key;
  }

  return `${env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`;
}

export function useConstructUrl(key: string | null | undefined): string {
  if (!key) {
    return PLACEHOLDER_IMAGE;
  }

  if (isAbsoluteUrl(key)) {
    return key;
  }

  return `${env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`;
}
