import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Zap, Activity, Cpu, ShoppingCart, GitCompare } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  hashrate: string;
  power: string;
  efficiency: string;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  originalPrice?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  currency,
  hashrate,
  power,
  efficiency,
  image,
  isNew,
  isSale,
  isBestseller,
  originalPrice
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
    toast.success(`${name} added to cart!`);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocation(`/compare?ids=${id}`);
  };

  return (
    <Link href={`/products/${id}`}>
      <Card className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge variant="default" className="font-mono uppercase tracking-wider text-xs rounded-sm px-2 py-1 bg-primary text-primary-foreground">
              New
            </Badge>
          )}
          {isBestseller && (
            <Badge variant="secondary" className="font-mono uppercase tracking-wider text-xs rounded-sm px-2 py-1 bg-accent text-accent-foreground">
              Bestseller
            </Badge>
          )}
          {isSale && discount > 0 && (
            <Badge variant="destructive" className="font-mono uppercase tracking-wider text-xs rounded-sm px-2 py-1">
              Save {discount}%
            </Badge>
          )}
        </div>

        {/* Image */}
        <CardHeader className="p-0 aspect-square overflow-hidden bg-secondary/20 relative">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <Button className="font-heading font-bold uppercase tracking-wide">
              Quick View
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-5 flex-grow flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-lg text-primary">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(price)}
              </span>
              {originalPrice && (
                <span className="font-mono text-sm text-muted-foreground line-through decoration-destructive/50">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-border/50 pt-3 mt-auto">
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Activity className="w-3 h-3" /> Hashrate
              </span>
              <span className="font-mono font-bold text-foreground">{hashrate}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3" /> Power
              </span>
              <span className="font-mono font-bold text-foreground">{power}</span>
            </div>
            <div className="flex flex-col gap-0.5 col-span-2">
              <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Efficiency
              </span>
              <span className="font-mono font-bold text-foreground">{efficiency}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex gap-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={handleCompare}
            variant="outline"
            size="sm"
            className="px-3"
            title="Compare"
          >
            <GitCompare className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
