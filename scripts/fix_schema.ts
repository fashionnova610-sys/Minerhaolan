
import { Client } from 'pg';
import "dotenv/config";

async function fixSchema() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to database");

    // Helper to add column if not exists, handling case sensitivity
    const addColumn = async (table: string, column: string, type: string) => {
      // Check for exact match (quoted)
      const resExact = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name=$1 AND column_name=$2;
      `, [table, column]);

      // Check for lowercase match (unquoted creation result)
      const resLower = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name=$1 AND column_name=$2;
      `, [table, column.toLowerCase()]);

      if (resExact.rows.length > 0) {
        console.log(`Column "${column}" already exists.`);
        return;
      }

      if (resLower.rows.length > 0) {
        console.log(`Column "${column.toLowerCase()}" exists but Drizzle needs "${column}". Renaming...`);
        await client.query(`ALTER TABLE ${table} RENAME COLUMN "${column.toLowerCase()}" TO "${column}";`);
        console.log(`Renamed to "${column}".`);
        return;
      }

      console.log(`Adding column "${column}" to ${table}...`);
      await client.query(`ALTER TABLE ${table} ADD COLUMN "${column}" ${type};`);
      console.log(`Column "${column}" added.`);
    };

    // Create Enums if not exist
    try {
      await client.query(`DO $$ BEGIN
        CREATE TYPE "condition" AS ENUM ('new', 'used');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;`);

      await client.query(`DO $$ BEGIN
        CREATE TYPE "cooling" AS ENUM ('air', 'hydro', 'immersion');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;`);
    } catch (e) {
      console.log("Enums might already exist or error creating them:", e);
    }

    // Add columns - using quoted names for camelCase
    await addColumn('products', 'manufacturer', "VARCHAR(100) NOT NULL DEFAULT 'Unknown'");
    await addColumn('products', 'model', "VARCHAR(100) NOT NULL DEFAULT 'Unknown'");
    await addColumn('products', 'algorithm', "VARCHAR(100) NOT NULL DEFAULT 'Unknown'");
    await addColumn('products', 'hashrate', "VARCHAR(100) NOT NULL DEFAULT 'Unknown'");
    await addColumn('products', 'power', "INTEGER NOT NULL DEFAULT 0");
    await addColumn('products', 'efficiency', "VARCHAR(100) NOT NULL DEFAULT 'Unknown'");
    await addColumn('products', 'currency', "VARCHAR(10) NOT NULL DEFAULT 'USD'");
    await addColumn('products', 'condition', "condition NOT NULL DEFAULT 'new'");
    await addColumn('products', 'cooling', "cooling NOT NULL DEFAULT 'air'");
    await addColumn('products', 'category', "VARCHAR(100) NOT NULL DEFAULT 'Uncategorized'");
    await addColumn('products', 'coin', "VARCHAR(100)");

    // CamelCase columns need special attention
    await addColumn('products', 'imageUrl', "TEXT");
    await addColumn('products', 'description', "TEXT");
    await addColumn('products', 'specifications', "JSONB");
    await addColumn('products', 'inStock', "BOOLEAN NOT NULL DEFAULT true");
    await addColumn('products', 'featured', "BOOLEAN NOT NULL DEFAULT false");
    await addColumn('products', 'createdAt', "TIMESTAMP NOT NULL DEFAULT NOW()");
    await addColumn('products', 'updatedAt', "TIMESTAMP NOT NULL DEFAULT NOW()");

    // Drop defaults
    const dropDefault = async (table: string, column: string) => {
      try {
        await client.query(`ALTER TABLE ${table} ALTER COLUMN "${column}" DROP DEFAULT;`);
      } catch (e) {
        // ignore
      }
    };

    await dropDefault('products', 'manufacturer');
    await dropDefault('products', 'model');
    await dropDefault('products', 'algorithm');
    await dropDefault('products', 'hashrate');
    await dropDefault('products', 'power');
    await dropDefault('products', 'efficiency');
    await dropDefault('products', 'category');

    console.log("Schema fix completed.");

  } catch (err) {
    console.error("Error fixing schema:", err);
  } finally {
    await client.end();
  }
}

fixSchema();
