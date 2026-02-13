import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
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
  plugins: [admin(), nextCookies()],
});
