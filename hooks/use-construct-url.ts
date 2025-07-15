import { env } from "@/lib/env";

export function useConstructUrl(key: string): string {
  return `${env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`;

}
