import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useSearch } from "@/hooks/useSearch";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/Layout";

import SEOHead from "@/components/SEOHead";

export default function Collection() {
  const [match, params] = useRoute("/collections/:category");
  const { results, setFilters, filters, manufacturers, algorithms } = useSearch();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);

  // Update filters when URL category changes
  useEffect(() => {
    if (params?.category) {
      const category = params.category === 'all' ? undefined : params.category;
      setFilters(prev => ({ ...prev, category }));
    }
  }, [params?.category, setFilters]);

  // Update filters when local state changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      manufacturer: selectedManufacturers.length ? selectedManufacturers : undefined,
      algorithm: selectedAlgorithms.length ? selectedAlgorithms : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    }));
  }, [selectedManufacturers, selectedAlgorithms, priceRange, setFilters]);

  const toggleManufacturer = (brand: string) => {
    setSelectedManufacturers(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleAlgorithm = (algo: string) => {
    setSelectedAlgorithms(prev =>
      prev.includes(algo)
        ? prev.filter(a => a !== algo)
        : [...prev, algo]
    );
  };

  const getPageTitle = () => {
    if (!params?.category || params.category === 'all') return "All ASIC Miners";
    return params.category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-32 pb-16">
        <SEOHead
          title={getPageTitle()}
          description={`Explore our collection of ${getPageTitle()}. Best prices on ASIC miners, secure payment, and global shipping.`}
        />
        {/* Header Banner */}
        <div className="bg-secondary/10 border-y border-border mb-8">
          <div className="container py-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">
              {getPageTitle()}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our premium selection of high-performance mining hardware.
              Backed by our best price guarantee and comprehensive warranty service.
            </p>
          </div>
        </div>

        <div className="container grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" /> Filters
              </h3>

              {/* Price Filter */}
              <div className="space-y-4 border-b border-border pb-6">
                <h4 className="font-medium text-sm">Price Range</h4>
                <Slider
                  defaultValue={[0, 10000]}
                  max={20000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Manufacturer Filter */}
              <div className="space-y-3 border-b border-border pb-6">
                <h4 className="font-medium text-sm">Manufacturer</h4>
                {manufacturers.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedManufacturers.includes(brand)}
                      onCheckedChange={() => toggleManufacturer(brand)}
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>

              {/* Algorithm Filter */}
              <div className="space-y-3 pb-6">
                <h4 className="font-medium text-sm">Algorithm</h4>
                {algorithms.map(algo => (
                  <div key={algo} className="flex items-center space-x-2">
                    <Checkbox
                      id={`algo-${algo}`}
                      checked={selectedAlgorithms.includes(algo)}
                      onCheckedChange={() => toggleAlgorithm(algo)}
                    />
                    <label
                      htmlFor={`algo-${algo}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {algo}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden col-span-1">
            <Button
              variant="outline"
              className="w-full flex justify-between"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</span>
              {isMobileFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>

            {isMobileFilterOpen && (
              <div className="mt-4 p-4 border border-border rounded-md bg-card space-y-6 animate-in slide-in-from-top-2">
                {/* Mobile filters content */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Price Range</h4>
                  <Slider
                    defaultValue={[0, 10000]}
                    max={20000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Manufacturer Filter */}
                <div className="space-y-3 border-t border-border pt-4">
                  <h4 className="font-medium text-sm">Manufacturer</h4>
                  {manufacturers.map(brand => (
                    <div key={`mobile-${brand}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-brand-${brand}`}
                        checked={selectedManufacturers.includes(brand)}
                        onCheckedChange={() => toggleManufacturer(brand)}
                      />
                      <label
                        htmlFor={`mobile-brand-${brand}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Algorithm Filter */}
                <div className="space-y-3 border-t border-border pt-4">
                  <h4 className="font-medium text-sm">Algorithm</h4>
                  {algorithms.map(algo => (
                    <div key={`mobile-${algo}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-algo-${algo}`}
                        checked={selectedAlgorithms.includes(algo)}
                        onCheckedChange={() => toggleAlgorithm(algo)}
                      />
                      <label
                        htmlFor={`mobile-algo-${algo}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {algo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{results.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <select
                  aria-label="Sort by"
                  className="bg-background border border-border rounded-sm text-sm p-2 focus:ring-primary focus:border-primary"
                  onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                  value={filters.sort || 'featured'}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-secondary/5 rounded-lg border border-border border-dashed">
                <h3 className="text-lg font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedManufacturers([]);
                    setSelectedAlgorithms([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
