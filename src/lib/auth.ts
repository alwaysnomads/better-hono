import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "@/db";
import { openAPI } from "better-auth/plugins"
import { Environment } from "@/env";

// Singleton to prevent creating multiple auth instances and database connections
let authInstance: ReturnType<typeof betterAuth> | null = null;

export const createAuth = (env: Environment) => {
  // Reuse existing auth instance if already created
  if (authInstance) {
    return authInstance;
  }

  const db = createDb(env);
  authInstance = betterAuth({
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg"
    }),
    plugins: [
      openAPI(),
    ]
  });

  return authInstance;
};