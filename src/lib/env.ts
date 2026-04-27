import { z } from 'zod';

/**
 * Environment variable schema validation
 * Ensures all required env vars are present and valid at runtime
 */
const envSchema = z.object({
    MONGODB_URI: z.string().url('Invalid MongoDB URI'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
});

/**
 * Validate and export environment variables
 * Throws error immediately if validation fails
 */
export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
