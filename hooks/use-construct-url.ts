import { env } from '@/lib/env';
export function constructUrl(key: string): string {
  return useConstructUrl(key);
}
export function useConstructUrl(key: string): string {
  if (key.includes('youtube.com') || key.includes('youtu.be')) {
    return key;
  }
  return `${env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`;
}
