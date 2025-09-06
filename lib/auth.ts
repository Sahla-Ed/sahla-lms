import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db';
import { env } from './env';
import { emailOTP } from 'better-auth/plugins';
import { resend } from './resend';
import { admin } from 'better-auth/plugins';
interface SignUpUser {
  id: string;
}

export const auth = (tenantId?: string | null) =>
  betterAuth({
    tenantId: tenantId,
    database: prismaAdapter(prisma, {
      // debugLogs: true,
      provider: 'postgresql',

      tenantId: tenantId ?? undefined,
    }),

    //FIX:this shouldnot be hardcoded or allowing all but doing this for testing
    trustedOrigins: [
      `https://${env.VERCEL_BRANCH_URL}`,
      `*.localhost:3000`,
      `https${env.VERCEL_URL}`,
      `*.sahlah.tech`,
      '*',
    ],
    socialProviders: {
      github: {
        clientId: env.AUTH_GITHUB_CLIENT_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
      },
    },
    events: {
      onSignUp: async ({ user }: { user: SignUpUser }) => {
        if (tenantId) {
          await prisma.user.update({
            where: { id: user.id },
            data: { tenantId: tenantId },
          });

          await prisma.account.updateMany({
            where: { userId: user.id },
            data: { tenantId: tenantId },
          });
        }
      },
    },
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url, token }) => {
        console.log(user, token, url);
        await resend.emails.send({
          from: 'sahla lms <onboarding@sahla.mosaleh.dev>',
          to: [user.email],
          subject: 'Reset your password',
          html: `<p>Click the link to reset your password: <a href="${url}">${url}</a></p>`,
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 3600,
      sendVerificationEmail: async ({ user, url, token }) => {
        //TODO: customize the email template with name and info
        console.log(user, token, url);
        await resend.emails.send({
          from: 'sahla lms <onboarding@sahla.mosaleh.dev>',
          to: [user.email],
          subject: 'sahla lms - Verify your email',
          html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
        });
      },
    },

    plugins: [
      emailOTP({
        async sendVerificationOTP({ email, otp }) {
          //TODO: customize the email template
          console.log(otp);
          await resend.emails.send({
            from: 'sahla lms <onboarding@sahla.mosaleh.dev>',
            to: [email],
            subject: 'sahla lms - Verify your email',
            html: `<p>Your OTP is <strong>${otp}</strong></p>`,
          });
        },
      }),
      admin(),
      // stripe({
      //   stripeClient,
      //   stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      //   createCustomerOnSignUp: true,
      //   subscription: {
      //     enabled: true,
      //     plans: [
      //       {
      //         name: 'Pro',
      //         priceId: 'price_1RpUQdIzJqhYU7tdcIy09aEg',
      //         annualDiscountPriceId: 'price_1RpXC0IzJqhYU7tdP4PCP7zd',
      //         freeTrial: {
      //           days: 14,
      //         },
      //       },
      //     ],
      //     authorizeReference: async ({ user, referenceId }) => {
      //       return user.id === referenceId;
      //     },
      //   },
      // }),
    ],
  });
