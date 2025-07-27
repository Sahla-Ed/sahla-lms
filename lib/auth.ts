import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db';
import { env } from './env';
import { emailOTP } from 'better-auth/plugins';
import { resend } from './resend';
import { admin } from 'better-auth/plugins';
import { stripe } from '@better-auth/stripe';
import { stripe as stripeClient } from '@/lib/stripe';

export const auth = (tenantId: string) =>
  betterAuth({
    tenantId: tenantId,
    database: prismaAdapter(prisma, {
      // debugLogs: true,
      provider: 'postgresql',
      tenantId: tenantId,
    }),
    trustedOrigins: [
      `https://${env.VERCEL_BRANCH_URL}`,
      `*.localhost:3000`,
      `https${env.VERCEL_URL}`,
    ],
    socialProviders: {
      github: {
        clientId: env.AUTH_GITHUB_CLIENT_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
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
      //         priceId: 'price_your_monthly_pro_plan',
      //         annualDiscountPriceId: 'price_your_annual_pro_plan',
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
