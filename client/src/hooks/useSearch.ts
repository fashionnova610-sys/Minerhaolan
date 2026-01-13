import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';

interface SearchFilters {
  category?: string;
  manufacturer?: string[];
  algorithm?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  const { data: productsRaw, isLoading } = trpc.products.list.useQuery();

  const products = useMemo(() => {
    if (!productsRaw) return [];
    return productsRaw.map(p => {
      const specs = p.specifications as any || {};
      return {
        id: p.slug,
        name: p.name,
        price: p.price / 100,
        currency: p.currency,
        category: p.category ? [p.category, ...(specs.category || [])] : [], // Ensure category is array
        manufacturer: p.manufacturer,
        algorithm: p.algorithm,
        hashrate: p.hashrate,
        power: `${p.power} W`,
        efficiency: p.efficiency,
        description: p.description || "",
        image: p.imageUrl || "",
        isNew: specs.isNew,
        isSale: specs.isSale,
        isBestseller: p.featured,
        originalPrice: specs.originalPrice,
        condition: p.condition,
        cooling: p.cooling,
        createdAt: p.createdAt // Needed for sorting
      };
    });
  }, [productsRaw]);

  const manufacturers = useMemo(() => {
    const brands = new Set(products.map(p => p.manufacturer));
    return Array.from(brands).sort();
  }, [products]);

  const algorithms = useMemo(() => {
    const algos = new Set(products.map(p => p.algorithm));
    return Array.from(algos).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Text Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesId = product.id.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesId) return false;
      }

      // Category Filter
      if (filters.category) {
        const filterCat = filters.category.toLowerCase();
        const productCats = product.category.map(c => c.toLowerCase().replace(/\s+/g, '-'));
        if (!productCats.some(c => c === filterCat || c.includes(filterCat))) {
          return false;
        }
      }

      // Manufacturer Filter
      if (filters.manufacturer && filters.manufacturer.length > 0) {
        if (!filters.manufacturer.includes(product.manufacturer)) return false;
      }

      // Algorithm Filter
      if (filters.algorithm && filters.algorithm.length > 0) {
        if (!filters.algorithm.includes(product.algorithm)) return false;
      }

      // Price Filter
      if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

      return true;
    });

    // Sorting
    if (filters.sort) {
      result = [...result].sort((a, b) => {
        switch (filters.sort) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'featured':
          default:
            return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        }
      });
    }

    return result;
  }, [searchQuery, filters, products]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    results: filteredProducts,
    totalResults: filteredProducts.length,
    isLoading,
    manufacturers,
    algorithms
  };
}
