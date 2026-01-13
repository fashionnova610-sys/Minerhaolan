import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "../product/ProductCard";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProducts() {
  const { data: products, isLoading } = trpc.products.list.useQuery();

  if (isLoading) {
    return (
      <section className="py-20 bg-secondary/10 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Filter for featured products and map to ProductCard props
  const featuredProducts = (products || [])
    .filter(p => p.featured)
    .slice(0, 4)
    .map(p => {
      const specs = p.specifications as any || {};
      return {
        id: p.slug,
        name: p.name,
        price: p.price / 100,
        currency: p.currency,
        hashrate: p.hashrate,
        power: `${p.power} W`,
        efficiency: p.efficiency,
        image: p.imageUrl || "",
        isNew: specs.isNew,
        isSale: specs.isSale,
        isBestseller: p.featured,
        originalPrice: specs.originalPrice
      };
    });

  return (
    <section className="py-20 bg-secondary/10 border-y border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              In Stock Now
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Available Immediately & <span className="text-primary">Free Shipping</span>
            </h2>
          </div>
          <Link href="/collections/all">
            <Button variant="outline" className="font-heading font-bold uppercase tracking-wide">
              View All Miners <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
