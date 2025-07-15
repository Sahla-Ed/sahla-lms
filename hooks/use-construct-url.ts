import { env } from "@/lib/env";

export function useConstructUrl(key: string): string {
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.${env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`;
}
