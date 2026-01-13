import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../My Web Sites/MinerHaolan clone/miners.de/en/products');
const OUTPUT_FILE = path.resolve(__dirname, '../server/data/products.json');
const DATA_DIR = path.dirname(OUTPUT_FILE);

// Ensure output directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ProductData {
    id: string;
    name: string;
    price: number;
    currency: string;
    category: string[];
    manufacturer: string;
    algorithm: string;
    hashrate: string;
    power: number;
    efficiency: string;
    description: string;
    image: string;
    cooling: string;
    stock: number;
    condition: string;
}

function extractJsonLd(html: string): any[] {
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const matches = [];
    let match;
    while ((match = jsonLdRegex.exec(html)) !== null) {
        try {
            const data = JSON.parse(match[1]);
            matches.push(data);
        } catch (e) {
            console.error('Failed to parse JSON-LD:', e);
        }
    }
    return matches;
}

function parseProduct(filename: string, html: string): ProductData | null {
    const jsonLds = extractJsonLd(html);
    const productLd = jsonLds.find(ld => ld['@type'] === 'Product' || ld['@type'] === 'ProductGroup');

    if (!productLd) {
        console.warn(`No Product JSON-LD found in ${filename}`);
        return null;
    }

    // Handle ProductGroup (variants) or single Product
    const mainProduct = productLd['@type'] === 'ProductGroup' && productLd.hasVariant
        ? productLd.hasVariant[0] // Take the first variant for now
        : productLd;

    if (!mainProduct) return null;

    const name = productLd.name || mainProduct.name;
    const description = productLd.description || mainProduct.description || '';

    // Extract price
    let priceEur = 0;
    if (mainProduct.offers) {
        const offer = Array.isArray(mainProduct.offers) ? mainProduct.offers[0] : mainProduct.offers;
        priceEur = parseFloat(offer.price || '0');
    }

    // Convert to USD (approx 1.1 rate)
    const priceUsd = Math.round(priceEur * 1.1);

    // Extract specs from description or text content
    // This is a heuristic based on the observed HTML structure
    const specs: any = {};
    const specRegex = /([A-Za-z0-9\s]+):\s*([~0-9.,\sA-Za-z\/%\(\)\-\+]+)/g;
    let specMatch;
    while ((specMatch = specRegex.exec(description)) !== null) {
        const key = specMatch[1].trim().toLowerCase();
        const value = specMatch[2].trim();
        specs[key] = value;
    }

    // Determine manufacturer from name or brand
    let manufacturer = 'Bitmain'; // Default
    if (productLd.brand && productLd.brand.name) {
        manufacturer = productLd.brand.name;
    } else if (name.toLowerCase().includes('whatsminer')) {
        manufacturer = 'MicroBT';
    } else if (name.toLowerCase().includes('avalon')) {
        manufacturer = 'Canaan';
    } else if (name.toLowerCase().includes('iceriver')) {
        manufacturer = 'IceRiver';
    } else if (name.toLowerCase().includes('goldshell')) {
        manufacturer = 'Goldshell';
    } else if (name.toLowerCase().includes('jasminer')) {
        manufacturer = 'Jasminer';
    }

    // Determine cooling
    let cooling = 'Air';
    if (name.toLowerCase().includes('hydro') || name.toLowerCase().includes('hyd')) {
        cooling = 'Hydro';
    } else if (name.toLowerCase().includes('immersion') || name.toLowerCase().includes('imm')) {
        cooling = 'Immersion';
    }

    // Extract power
    let power = 3000; // Default
    if (specs['leistungsaufnahme'] || specs['power consumption']) {
        const powerStr = specs['leistungsaufnahme'] || specs['power consumption'];
        const powerMatch = powerStr.match(/(\d+)/);
        if (powerMatch) power = parseInt(powerMatch[1]);
    }

    // Extract hashrate
    let hashrate = 'Unknown';
    if (specs['hashrate']) {
        hashrate = specs['hashrate'];
    }

    // Extract efficiency
    let efficiency = 'Unknown';
    if (specs['energieeffizienz'] || specs['power efficiency']) {
        efficiency = specs['energieeffizienz'] || specs['power efficiency'];
    }

    // Algorithm
    let algorithm = 'SHA-256';
    if (specs['algorithmus'] || specs['algorithm']) {
        algorithm = specs['algorithmus'] || specs['algorithm'];
    }

    return {
        id: path.basename(filename, '.html'),
        name: name,
        price: priceUsd,
        currency: 'USD',
        category: ['asic-miner', cooling.toLowerCase(), manufacturer.toLowerCase()],
        manufacturer: manufacturer,
        algorithm: algorithm,
        hashrate: hashrate,
        power: power,
        efficiency: efficiency,
        description: description,
        image: '/miner-new.png', // Placeholder, we'll need to handle images later
        cooling: cooling,
        stock: Math.floor(Math.random() * 50) + 1, // Random stock for now
        condition: 'new'
    };
}

async function main() {
    console.log(`Scanning ${SOURCE_DIR}...`);

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`Source directory not found: ${SOURCE_DIR}`);
        return;
    }

    const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.html'));
    console.log(`Found ${files.length} HTML files.`);

    const products: ProductData[] = [];

    for (const file of files) {
        const filePath = path.join(SOURCE_DIR, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        const product = parseProduct(file, html);

        if (product) {
            products.push(product);
            process.stdout.write('.');
        }
    }

    console.log(`\nExtracted ${products.length} products.`);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
