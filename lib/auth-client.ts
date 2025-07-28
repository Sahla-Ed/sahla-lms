import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';
import { adminClient } from 'better-auth/client/plugins';
import { stripeClient } from '@better-auth/stripe/client';

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    adminClient(),
    stripeClient({ subscription: true }),
  ],
});
