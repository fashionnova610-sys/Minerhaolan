
import path from 'path';
import { fileURLToPath } from 'url';
const __filename_env = fileURLToPath(import.meta.url);
const __dirname_env = path.dirname(__filename_env);
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname_env, '../.env') });
import { getDb } from "./db";
import { products, InsertProduct } from "../drizzle/schema";
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
    console.log("🌱 Seeding database...");
    console.log("DEBUG: DATABASE_URL is " + (process.env.DATABASE_URL ? "defined" : "undefined"));
    const db = await getDb();

    if (!db) {
        console.error("❌ Database connection failed");
        process.exit(1);
    }

    try {
        const dataPath = path.resolve(__dirname, 'data/products_expanded.json');
        if (!fs.existsSync(dataPath)) {
            console.error(`❌ Data file not found at ${dataPath}. Run 'npx tsx scripts/extract_products.ts' first.`);
            process.exit(1);
        }

        const rawProducts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        console.log(`Found ${rawProducts.length} products to insert.`);

        // Clear existing products to ensure clean state
        await db.delete(products);
        console.log("🗑️ Cleared existing products.");

        const productsToInsert: InsertProduct[] = [];

        for (const p of rawProducts) {
            // Ensure price is integer (cents)
            const priceCents = Math.round(p.price * 100);

            const product: InsertProduct = {
                name: p.name,
                slug: p.id,
                manufacturer: p.manufacturer,
                model: p.name, // Use full name as model for now
                algorithm: p.algorithm,
                hashrate: p.hashrate,
                power: p.power,
                efficiency: p.efficiency,
                price: priceCents,
                currency: p.currency,
                condition: (p.condition as "new" | "used") || "new",
                cooling: (p.cooling.toLowerCase() as "air" | "hydro" | "immersion") || "air",
                category: p.category[0], // Primary category
                imageUrl: p.image,
                description: p.description,
                inStock: (p.stock || 0) > 0,
                featured: p.featured || false,
                specifications: {
                    category: p.category,
                    hashrate: p.hashrate,
                    power: p.power,
                    efficiency: p.efficiency,
                    algorithm: p.algorithm
                }
            };
            productsToInsert.push(product);
        }

        // Batch insert in chunks of 50 to avoid query size limits
        const chunkSize = 50;
        for (let i = 0; i < productsToInsert.length; i += chunkSize) {
            const chunk = productsToInsert.slice(i, i + chunkSize);
            await db.insert(products).values(chunk).onConflictDoNothing();
            console.log(`✅ Inserted chunk ${i / chunkSize + 1} (${chunk.length} items)`);
        }

        console.log(`✅ Inserted/Verified ${rawProducts.length} products.`);
        console.log("✨ Seeding complete!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }
    process.exit(0);
}

seed();
