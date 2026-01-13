
import path from 'path';
import { fileURLToPath } from 'url';
const __filename_env = fileURLToPath(import.meta.url);
const __dirname_env = path.dirname(__filename_env);
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname_env, '../.env') });
import { getDb } from "../server/db";
import { products } from "../server/drizzle/schema";

async function verify() {
    console.log("🔍 Verifying database connection...");
    const db = await getDb();

    if (!db) {
        console.error("❌ Failed to connect to database.");
        process.exit(1);
    }

    try {
        console.log("✅ Database connection established.");
        const count = await db.select().from(products).limit(1);
        console.log("✅ Successfully executed query.");
        console.log("✨ Database verification successful!");
    } catch (error) {
        console.error("❌ Query failed:", error);
        process.exit(1);
    }
    process.exit(0);
}

verify();
