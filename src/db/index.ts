import { drizzle } from 'drizzle-orm/node-postgres';
import { Environment } from '@/env';
import * as schema from "@/db/schema";

// Singleton to prevent connection pool exhaustion
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function createDb(env: Environment) {
    // Reuse existing connection if already created
    if (dbInstance) {
        return dbInstance;
    }

    dbInstance = drizzle({
        connection: env.DATABASE_URL,
        casing: 'snake_case',
        schema,
    });

    return dbInstance;
}
