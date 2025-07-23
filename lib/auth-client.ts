import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';
import { adminClient, organizationClient } from 'better-auth/client/plugins';
import {
  ac,
  siteAdmin,
  instructor,
  assistant,
  user as userRole,
} from './permissions';

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    adminClient({
      ac,
      roles: {
        admin: siteAdmin,
        instructor,
        assistant,
        user: userRole,
      },
    }),
    organizationClient({ teams: { enabled: true } }),
  ],
});
