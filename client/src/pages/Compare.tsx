import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useSearch } from "@/hooks/useSearch";

// Use the Product type from products data directly
type ComparisonProduct = any; // Fallback to any for now as we transition


export default function Compare() {
  const [selectedProducts, setSelectedProducts] = useState<ComparisonProduct[]>([]);
  const { data: availableProducts = [] } = trpc.products.list.useQuery();


  useEffect(() => {
    // Load comparison from URL params or local storage
    const params = new URLSearchParams(window.location.search);
    const ids = params.get("ids")?.split(",") || [];

    if (ids.length > 0 && availableProducts.length > 0) {
      const selected = availableProducts.filter((p: any) => ids.includes(p.slug || p.id));
      setSelectedProducts(selected);
    }
  }, [availableProducts]);

  const addProduct = (product: ComparisonProduct) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const clearAll = () => {
    setSelectedProducts([]);
  };

  const shareComparison = () => {
    const ids = selectedProducts.map(p => p.slug || p.id).join(",");
    const url = `${window.location.origin}/compare?ids=${ids}`;
    navigator.clipboard.writeText(url);
    alert("Comparison link copied to clipboard!");
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Compare <span className="text-primary">ASIC Miners</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Compare up to 4 miners side-by-side to find the best option for your mining operation.
          </p>
        </div>

        {/* Selected Products Comparison */}
        {selectedProducts.length > 0 ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading font-bold">
                Comparing {selectedProducts.length} {selectedProducts.length === 1 ? "Miner" : "Miners"}
              </h2>
              <div className="flex gap-2">
                {selectedProducts.length > 1 && (
                  <Button onClick={shareComparison} variant="outline" size="sm">
                    Share Comparison
                  </Button>
                )}
                <Button onClick={clearAll} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedProducts.map((product) => (
                <Card key={product.id} className="p-6 relative">
                  <Button
                    onClick={() => removeProduct(product.id)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="mb-4">
                    <img
                      src={product.imageUrl || product.image}
                      alt={product.name}
                      className="w-full h-40 object-contain mb-4"
                    />
                    <h3 className="font-heading font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Hashrate</span>
                      <span className="font-bold text-primary">{product.hashrate}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Power</span>
                      <span className="font-mono">{product.power}W</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-mono">{product.efficiency}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Algorithm</span>
                      <Badge variant="secondary" className="text-xs">{product.algorithm}</Badge>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Cooling</span>
                      <span className="capitalize">{product.cooling}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-bold text-xl">${product.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href={`/products/${product.slug || product.id}`}>
                    <Button className="w-full mt-4" size="sm">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              ))}

              {/* Add More Slot */}
              {selectedProducts.length < 4 && (
                <Card className="p-6 flex items-center justify-center border-dashed border-2 min-h-[400px]">
                  <div className="text-center">
                    <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">Add another miner to compare</p>
                    <p className="text-xs text-muted-foreground">Select from the list below</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <Card className="p-12 text-center mb-8">
            <Plus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-heading font-bold mb-2">No Miners Selected</h3>
            <p className="text-muted-foreground mb-4">
              Select up to 4 miners from the list below to start comparing
            </p>
          </Card>
        )}

        {/* Available Products */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-4">Available Miners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableProducts.map((product) => {
              const isSelected = selectedProducts.find(p => p.id === product.id);
              const canAdd = selectedProducts.length < 4;

              return (
                <Card key={product.id} className={`p-4 ${isSelected ? 'opacity-50' : ''}`}>
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.name}
                    className="w-full h-32 object-contain mb-3"
                  />
                  <h4 className="font-heading font-bold text-sm mb-1">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{product.manufacturer}</p>
                  <div className="flex justify-between items-center text-xs mb-3">
                    <span className="text-primary font-bold">{product.hashrate}</span>
                    <span className="font-mono">{product.power}W</span>
                  </div>
                  <Button
                    onClick={() => addProduct(product)}
                    disabled={!!isSelected || !canAdd}
                    size="sm"
                    className="w-full"
                    variant={isSelected ? "secondary" : "default"}
                  >
                    {isSelected ? "Added" : canAdd ? "Add to Compare" : "Max 4 Miners"}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
