import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log(user, token, url);
      await resend.emails.send({
        from: "sahla lms <onboarding@sahla.mosaleh.dev>",
        to: [user.email],
        subject: "Reset your password",
        html: `<p>Click the link to reset your password: <a href="${url}">${url}</a></p>`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      //TODO: customize the email template with name and info
      console.log(user, token, url);
      await resend.emails.send({
        from: "sahla lms <onboarding@sahla.mosaleh.dev>",
        to: [user.email],
        subject: "sahla lms - Verify your email",
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
          from: "sahla lms <onboarding@sahla.mosaleh.dev>",
          to: [email],
          subject: "sahla lms - Verify your email",
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin(),
  ],
});
