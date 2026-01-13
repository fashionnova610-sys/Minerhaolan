import { useEffect } from "react";
import { WHATSAPP_NUMBER } from "@/const";

interface ProductSchema {
    name: string;
    description: string;
    image: string;
    sku: string;
    brand: string;
    price: number;
    currency: string;
    availability: "InStock" | "OutOfStock";
}

interface SEOHeadProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    product?: ProductSchema;
}

export default function SEOHead({
    title,
    description,
    image = "/og-image.png",
    url = window.location.href,
    type = "website",
    product
}: SEOHeadProps) {
    useEffect(() => {
        // Update title
        document.title = `${title} | MinerHaolan`;

        // Helper to update meta tags
        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateOgMeta = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateCanonical = (url: string) => {
            let element = document.querySelector('link[rel="canonical"]');
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', 'canonical');
                document.head.appendChild(element);
            }
            element.setAttribute('href', url);
        };

        // Update meta tags
        updateMeta('description', description);
        updateCanonical(url);

        // Update Open Graph tags
        updateOgMeta('og:title', title);
        updateOgMeta('og:description', description);
        updateOgMeta('og:image', image);
        updateOgMeta('og:url', url);
        updateOgMeta('og:type', type);
        updateOgMeta('og:site_name', 'MinerHaolan');

        // Twitter Card
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', image);

        // JSON-LD Structured Data
        const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
        if (existingJsonLd) {
            existingJsonLd.remove();
        }

        const jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';

        if (product) {
            // Product Schema
            const productSchema = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.image,
                "sku": product.sku,
                "brand": {
                    "@type": "Brand",
                    "name": product.brand
                },
                "offers": {
                    "@type": "Offer",
                    "url": url,
                    "priceCurrency": product.currency,
                    "price": product.price,
                    "availability": `https://schema.org/${product.availability}`,
                    "seller": {
                        "@type": "Organization",
                        "name": "MinerHaolan"
                    }
                }
            };
            jsonLdScript.textContent = JSON.stringify(productSchema);
        } else {
            // Organization Schema (for homepage and general pages)
            const orgSchema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "MinerHaolan",
                "url": "https://minerhaolan.shop",
                "logo": "https://minerhaolan.shop/logo.png",
                "description": "Premium ASIC mining hardware supplier. Best prices on Bitcoin and cryptocurrency miners.",


                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": `+${WHATSAPP_NUMBER}`,
                    "contactType": "sales",
                    "availableLanguage": ["English", "Chinese"]
                },
                "sameAs": [
                    `https://wa.me/${WHATSAPP_NUMBER}`
                ]
            };
            jsonLdScript.textContent = JSON.stringify(orgSchema);
        }

        document.head.appendChild(jsonLdScript);

        // Cleanup on unmount
        return () => {
            const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };

    }, [title, description, image, url, type, product]);

    return null;
}

