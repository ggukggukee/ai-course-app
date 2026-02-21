import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin, emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email/resend";
import { getOTPEmailTemplate } from "./email/email-templates";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  ...(process.env.NODE_ENV === "production"
    ? {
        baseURL: process.env.BETTER_AUTH_URL!,
        trustedOrigins: [process.env.BETTER_AUTH_URL!],
        advanced: {
          crossSubDomainCookies: {
            enabled: true,
            domain: process.env.BETTER_AUTH_DOMAIN!,
          },
          trustedOrigins: [process.env.BETTER_AUTH_TRUSTED_ORIGIN!],
          useSecureCookies: process.env.NODE_ENV === "production",
        },
      }
    : {}),
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "forget-password") {
          const emailTemplate = getOTPEmailTemplate(otp, type);

          sendEmail({
            email,
            subject: emailTemplate.subject,
            text: emailTemplate.text,
            html: emailTemplate.html,
          }).catch(() => {});
        }
      },
      expiresIn: 600, // 10 minutes
      otpLength: 6,
      allowedAttempts: 3,
    }),
    nextCookies(),
  ],
});
