import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { getDb } from "./server/db.ts";
import { products } from "./drizzle/schema.ts";
import { desc } from "drizzle-orm";

async function checkProducts() {
    const db = await getDb();
    if (!db) {
        console.error("No DB connection");
        return;
    }
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
    console.log(`Total products in DB: ${allProducts.length}`);

    if (allProducts.length > 0) {
        console.log("First 5 products:");
        allProducts.slice(0, 5).forEach(p => {
            console.log(`- ${p.name} | Price: ${p.price} cents ($${p.price / 100}) | Category: ${p.category}`);
        });

        const expensive = allProducts.filter(p => p.price > 1000000); // > $10,000
        console.log(`Products > $10,000: ${expensive.length}`);
    }
    process.exit(0);
}

checkProducts();
