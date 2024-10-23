import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  SECRET_KEY: z.string().min(1),
  SESSION_COOKIE_NAME: z.string().min(1),
  NEXT_PUBLIC_API_URL: z.string().min(1)
  //STARKS_EVO_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
