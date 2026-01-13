import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.resolve(__dirname, '../server/data/products.json');
const OUTPUT_FILE = path.resolve(__dirname, '../server/data/products_expanded.json');

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
    featured?: boolean;
    isNew?: boolean;
}

// Mappings based on user request
const ALGO_COIN_MAP: Record<string, string[]> = {
    'sha-256': ['bitcoin-miner', 'sha256'],
    'sha256': ['bitcoin-miner', 'sha256'],
    'scrypt': ['litecoin', 'doge', 'scrypt'],
    'ethash': ['etc', 'ethash'],
    'etchash': ['etc', 'ethash'],
    'kheavyhash': ['kaspa', 'kheavyhash'],
    'blake3': ['alephium', 'blake3'],
    'blake2b': ['kadena', 'blake2b'],
    'x11': ['dash', 'x11'],
    'equihash': ['zcash', 'equihash'],
    'eaglesong': ['ckb', 'eaglesong'], // Nervos
    'randomx': ['monero', 'randomx']
};

const MANUFACTURER_SLUGS: Record<string, string> = {
    'bitmain': 'bitmain',
    'microbt': 'microbt',
    'canaan': 'canaan',
    'goldshell': 'goldshell',
    'iceriver': 'iceriver',
    'jasminer': 'jasminer',
    'ipollo': 'ipollo',
    'elphapex': 'elphapex',
    'bitdeer': 'bitdeer',
    'volcminer': 'volcminer',
    'desiweminer': 'desiweminer',
    'wind miner': 'wind-miner'
};

function expandCatalog() {
    console.log(`Reading from ${INPUT_FILE}...`);

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Input file not found: ${INPUT_FILE}`);
        return;
    }

    const MANUAL_INPUT_FILE = path.resolve(__dirname, '../server/data/products_manual.json');

    let rawProducts: ProductData[] = [];

    // Load clone data
    if (fs.existsSync(INPUT_FILE)) {
        const cloneProducts = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
        rawProducts.push(...cloneProducts);
    }

    // Load manual data
    if (fs.existsSync(MANUAL_INPUT_FILE)) {
        const manualProducts = JSON.parse(fs.readFileSync(MANUAL_INPUT_FILE, 'utf-8'));
        console.log(`Found ${manualProducts.length} manual products.`);

        // Merge manual products, overriding clone products if names match (fuzzy match)
        manualProducts.forEach((mp: ProductData) => {
            const existingIdx = rawProducts.findIndex(p => p.name.toLowerCase() === mp.name.toLowerCase());
            if (existingIdx !== -1) {
                rawProducts[existingIdx] = mp; // Override
            } else {
                rawProducts.push(mp); // Add new
            }
        });
    }

    console.log(`Total base products after merge: ${rawProducts.length}`);

    const expandedProducts: ProductData[] = [];

    rawProducts.forEach(product => {
        // 1. Price Reduction (20% off base price)
        const basePrice = Math.round(product.price * 0.8);

        // 2. Refine Categorization
        let categories: string[] = [];

        // Main Category (Bitcoin vs Altcoin vs Accessory)
        const nameLower = product.name.toLowerCase();
        const algoLower = product.algorithm.toLowerCase();

        const isAccessory = nameLower.includes('psu') ||
            nameLower.includes('power supply') ||
            nameLower.includes('fan') ||
            nameLower.includes('cable') ||
            nameLower.includes('silencer') ||
            nameLower.includes('container') ||
            nameLower.includes('cord');

        let isBitcoin = false;
        if (isAccessory) {
            categories.push('accessories');
            // Add specific accessory type
            if (nameLower.includes('psu') || nameLower.includes('power supply')) categories.push('psu');
            if (nameLower.includes('fan')) categories.push('cooling');
            if (nameLower.includes('cable') || nameLower.includes('cord')) categories.push('cables');
        } else {
            isBitcoin = algoLower.includes('sha-256') || algoLower.includes('sha256');
            categories.push(isBitcoin ? 'bitcoin-miner' : 'altcoin-miner');
        }

        // Coin/Algo Categories
        let mapped = false;
        for (const [algo, tags] of Object.entries(ALGO_COIN_MAP)) {
            if (algoLower.includes(algo)) {
                categories.push(...tags);
                mapped = true;
            }
        }
        if (!mapped && !isBitcoin) categories.push('altcoin-other');

        // Manufacturer Category
        const manuLower = product.manufacturer.toLowerCase();
        for (const [manu, slug] of Object.entries(MANUFACTURER_SLUGS)) {
            if (manuLower.includes(manu)) {
                categories.push(slug);
            }
        }

        // Cooling Category (Only for miners)
        if (!isAccessory) {
            const coolingLower = product.cooling.toLowerCase();
            if (coolingLower.includes('hydro')) categories.push('hydro-miner');
            if (coolingLower.includes('immersion')) categories.push('immersion');
            if (coolingLower.includes('air')) categories.push('air-cooled');

            // Home Miner Logic (Quiet/Low Power)
            const manuLower = product.manufacturer.toLowerCase();
            if (product.power < 800 || manuLower.includes('jasminer') || manuLower.includes('ipollo') || product.name.toLowerCase().includes('home')) {
                categories.push('home-miner');
            }
        }

        // Normalize Manufacturer (Title Case)
        const manufacturer = product.manufacturer.charAt(0).toUpperCase() + product.manufacturer.slice(1).toLowerCase();

        // Normalize Algorithm (Standard mapping)
        let algorithm = product.algorithm;
        if (algorithm.toLowerCase().includes('sha')) algorithm = 'SHA-256';
        else if (algorithm.toLowerCase().includes('scrypt')) algorithm = 'Scrypt';
        else if (algorithm.toLowerCase().includes('ethash')) algorithm = 'Ethash';
        else if (algorithm.toLowerCase().includes('equihash')) algorithm = 'Equihash';
        else if (algorithm.toLowerCase().includes('x11')) algorithm = 'X11';
        else if (algorithm.toLowerCase().includes('blake3')) algorithm = 'Blake3';
        else if (algorithm.toLowerCase().includes('kheavyhash')) algorithm = 'KHeavyHash';
        else if (algorithm.toLowerCase().includes('eaglesong')) algorithm = 'Eaglesong';
        else if (algorithm.toLowerCase().includes('kadena')) algorithm = 'Kadena';
        else if (algorithm.toLowerCase().includes('handshake')) algorithm = 'Handshake';
        else if (algorithm.toLowerCase().includes('randomx')) algorithm = 'RandomX';

        // 3. Enhanced Description
        const year = new Date().getFullYear();
        let enhancedDesc = "";

        if (isAccessory) {
            enhancedDesc = `[${year} Model] ${product.name} - High quality accessory for your mining setup. \n        Manufacturer: ${manufacturer}. \n        Condition: New.`;
        } else {
            const isBitcoin = algoLower.includes('sha-256') || algoLower.includes('sha256');
            enhancedDesc = `[${year} Model] ${product.name} is a high-efficiency ${algorithm} miner from ${manufacturer}. 
        Features state-of-the-art cooling and industry-leading hashrate of ${product.hashrate}. 
        Perfect for ${isBitcoin ? 'Bitcoin' : 'Altcoin'} mining operations. 
        Power consumption: ${product.power}W. Efficiency: ${product.efficiency}.`;
        }

        // Add "New" version
        expandedProducts.push({
            ...product,
            manufacturer, // Use normalized
            algorithm,    // Use normalized
            price: basePrice,
            category: [...new Set(categories)], // Dedupe
            condition: 'new',
            isNew: true,
            description: enhancedDesc,
            featured: Math.random() < 0.15
        });

        // 4. Variants (Used, Bulk, etc.)

        // Used (35% off discounted base)
        if (basePrice > 400) {
            expandedProducts.push({
                ...product,
                id: `${product.id}-used`,
                name: `${product.name} (Used)`,
                price: Math.round(basePrice * 0.65),
                category: [...new Set([...categories, 'used-miner'])],
                condition: 'used',
                isNew: false,
                description: `[USED/REFURBISHED] ${product.name}. Fully tested and verified. 30-day warranty.`,
                stock: Math.floor(Math.random() * 15) + 1,
                featured: false
            });
        }

        // Bulk Pack 5x (5% off)
        if (basePrice < 4000) {
            expandedProducts.push({
                ...product,
                id: `${product.id}-bulk-5`,
                name: `${product.name} (Bulk Pack 5x)`,
                price: Math.round(basePrice * 5 * 0.95),
                category: [...new Set(categories)],
                condition: 'new',
                isNew: true,
                description: `[BULK PACK] 5 units of ${product.name}. Volume discount included.`,
                stock: Math.floor(Math.random() * 5) + 1,
                featured: false
            });
        }
    });

    // 5. Generate Accessories (Mock Data)
    const accessories = [
        { name: "High Performance PSU 3600W", price: 150, cat: "psu" },
        { name: "Silent Fan Kit (120mm)", price: 25, cat: "cooling" },
        { name: "Hydro Cooling Radiator Kit", price: 450, cat: "hydro-rack" },
        { name: "Heavy Duty Power Cable (C19)", price: 15, cat: "cables" },
        { name: "Miner Control Board (Generic)", price: 120, cat: "control-boards" },
        { name: "Noise Reduction Silencer Box", price: 180, cat: "silencer" }
    ];

    accessories.forEach((acc, idx) => {
        expandedProducts.push({
            id: `acc-${idx}`,
            name: acc.name,
            price: acc.price, // Already low, no 20% off needed
            currency: "USD",
            category: ["accessories", acc.cat],
            manufacturer: "Generic",
            algorithm: "N/A",
            hashrate: "N/A",
            power: 0,
            efficiency: "N/A",
            description: `Premium quality ${acc.name} for your mining setup.`,
            image: "https://images.unsplash.com/photo-1555664424-778a69022365?w=800", // Generic tech image
            cooling: "air", // Default to air to satisfy enum
            stock: 50,
            condition: "new",
            featured: false,
            isNew: true
        });
    });

    console.log(`Expanded to ${expandedProducts.length} products.`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(expandedProducts, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);
}

expandCatalog();
