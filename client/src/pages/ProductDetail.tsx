import { useParams, Link } from "wouter";
import { WHATSAPP_NUMBER } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Truck, Shield, Zap, Activity, Cpu, Wind, Package, CreditCard, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import NotFound from "./NotFound";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import SEOHead from "@/components/SEOHead";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id || "";

  const { data: product, isLoading: isProductLoading } = trpc.products.getBySlug.useQuery({ slug: id }, { enabled: !!id });
  const { data: relatedProductsRaw } = trpc.products.getRelated.useQuery(
    { category: product?.category || "", currentSlug: id },
    { enabled: !!product }
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  if (isProductLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  const specs = product.specifications as any || {};
  const discount = 0;

  // Generate multiple product images (in real scenario, these would be different angles)
  const productImages = [
    product.imageUrl || "",
    product.imageUrl || "",
    product.imageUrl || "",
    product.imageUrl || ""
  ].filter(Boolean);

  interface RelatedProduct {
    slug: string;
    name: string;
    price: number;
    currency: string;
    hashrate: string;
    power: string;
    efficiency: string;
    imageUrl: string;
    specifications: any;
    featured: boolean;
  }

  const relatedProducts = ((relatedProductsRaw as unknown as RelatedProduct[]) || []).map(p => {
    const pSpecs = p.specifications || {};
    return {
      id: p.slug,
      name: p.name,
      price: p.price / 100,
      currency: p.currency,
      hashrate: p.hashrate,
      power: `${p.power} W`,
      efficiency: p.efficiency,
      image: p.imageUrl || "",
      isNew: pSpecs.isNew,
      isSale: pSpecs.isSale,
      isBestseller: p.featured
    };
  });

  const handleAddToCart = () => {
    // Adapt product for cart context if needed, or ensure cart context handles the DB shape
    // Assuming cart context expects { id, name, price, image, ... }
    addToCart(product.slug, quantity);
    toast.success(`Added ${quantity}x ${product.name} to cart`);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <Layout>
      <SEOHead
        title={product.name}
        description={`Buy ${product.name} - ${product.hashrate} ${product.algorithm} Miner. ${product.description?.slice(0, 120)}...`}
        image={product.imageUrl}
        product={{
          name: product.name,
          description: product.description || "",
          image: product.imageUrl || "",
          sku: product.slug,
          brand: product.manufacturer,
          price: product.price / 100,
          currency: product.currency,
          availability: product.inStock ? "InStock" : "OutOfStock"
        }}
      />
      <div className="min-h-screen bg-background py-12">
        <div className="container">
          {/* Breadcrumb / Back */}
          <div className="mb-8">
            <Link href="/collections/all">
              <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center aspect-square relative overflow-hidden group">
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && <Badge>New Arrival</Badge>}
                  {product.isBestseller && <Badge variant="secondary">Best Seller</Badge>}
                  {product.isSale && <Badge variant="destructive">Save {discount}%</Badge>}
                  {product.condition === "used" && <Badge variant="outline">Used</Badge>}
                </div>

                <img
                  src={productImages[selectedImageIndex]}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain max-w-[80%] max-h-[80%] transition-opacity duration-300"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square border-2 rounded-lg p-2 transition-all ${selectedImageIndex === idx
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                  <span className="font-mono bg-secondary/50 px-2 py-1 rounded">Model: {product.manufacturer}</span>
                  <span className="font-mono bg-secondary/50 px-2 py-1 rounded">Algo: {product.algorithm}</span>
                  {product.stock && product.stock < 20 && (
                    <span className="font-mono bg-orange-500/20 text-orange-600 px-2 py-1 rounded">
                      Only {product.stock} left!
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-mono font-bold text-primary">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl font-mono text-muted-foreground line-through">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-500 font-medium">
                  <Check className="w-4 h-4" /> In Stock - Ready to Ship
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="w-4 h-4" /> Free Global Shipping
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" /> 12-Month Manufacturer Warranty
                </div>
              </div>

              <Separator />

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/10 p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    <Activity className="w-4 h-4" /> Hashrate
                  </div>
                  <div className="font-mono font-bold text-lg">{product.hashrate}</div>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    <Zap className="w-4 h-4" /> Power
                  </div>
                  <div className="font-mono font-bold text-lg">{product.power}</div>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    <Cpu className="w-4 h-4" /> Efficiency
                  </div>
                  <div className="font-mono font-bold text-lg">{product.efficiency}</div>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    <Wind className="w-4 h-4" /> Cooling
                  </div>
                  <div className="font-mono font-bold text-lg">{product.cooling}</div>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-4">
                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full h-12 px-3 bg-background border border-border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Quantity"
                  />
                </div>
                <Button
                  className="flex-1 h-12 text-lg font-bold uppercase tracking-wide"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="bg-secondary/10 p-4 rounded-lg border border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section: Specs, Purchasing Process, Warranty */}
          <div className="max-w-6xl mx-auto mb-16">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto md:grid md:grid-cols-3 mb-8 h-auto flex-wrap md:flex-nowrap">
                <TabsTrigger value="specs">Technical Specifications</TabsTrigger>
                <TabsTrigger value="process">Purchasing Process</TabsTrigger>
                <TabsTrigger value="warranty">Warranty & Support</TabsTrigger>
              </TabsList>

              <TabsContent value="specs">
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20 w-1/3">Manufacturer</TableCell>
                        <TableCell>{product.manufacturer}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Model</TableCell>
                        <TableCell>{product.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Condition</TableCell>
                        <TableCell className="capitalize">{product.condition || 'New'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Hashrate</TableCell>
                        <TableCell className="font-mono">{product.hashrate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Power Consumption</TableCell>
                        <TableCell className="font-mono">{product.power}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Efficiency</TableCell>
                        <TableCell className="font-mono">{product.efficiency}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Algorithm</TableCell>
                        <TableCell>{product.algorithm}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Cooling Method</TableCell>
                        <TableCell>{product.cooling}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Network Interface</TableCell>
                        <TableCell>Ethernet (RJ45)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Operating Temperature</TableCell>
                        <TableCell>5 - 45 °C</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Operating Humidity</TableCell>
                        <TableCell>5 - 95 %</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-secondary/20">Voltage</TableCell>
                        <TableCell>200-240V AC</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="process">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">1. Place Your Order</h3>
                      <p className="text-sm text-muted-foreground">
                        Add items to cart and proceed to checkout via WhatsApp. Our team will confirm your order and provide BTC payment details.
                      </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">2. Complete Payment</h3>
                      <p className="text-sm text-muted-foreground">
                        Send BTC to the provided wallet address. Payment confirmation typically takes 1-3 confirmations on the blockchain.
                      </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Truck className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">3. Fast Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        We ship worldwide via DHL/FedEx. Tracking number provided within 24-48 hours. Delivery takes 3-7 business days.
                      </p>
                    </div>
                  </div>



                  <div className="bg-secondary/10 border border-border rounded-lg p-6">
                    <h3 className="font-heading font-bold text-lg mb-3 flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-primary" />
                      Need Assistance?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our team is available 24/7 via WhatsApp to help with your order, answer questions about products, or provide technical support.
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20help%20with%20my%20order`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Support
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="warranty">
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-heading font-bold text-xl mb-4">12-Month Manufacturer Warranty</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        All new miners come with a comprehensive 12-month manufacturer warranty covering defects in materials and workmanship. Used/refurbished units include a 90-day warranty.
                      </p>
                      <p className="font-medium text-foreground">Warranty Coverage Includes:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Hash board failures and component defects</li>
                        <li>Power supply unit (PSU) malfunctions</li>
                        <li>Control board and firmware issues</li>
                        <li>Cooling system failures (fans, pumps)</li>
                      </ul>
                      <p className="font-medium text-foreground mt-4">Warranty Exclusions:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Physical damage from mishandling or accidents</li>
                        <li>Damage from power surges or improper voltage</li>
                        <li>Unauthorized modifications or repairs</li>
                        <li>Normal wear and tear</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-heading font-bold text-xl mb-4">Repair & Maintenance Services</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      MinerHaolan offers professional repair services for all major ASIC miner brands. Our Hong Kong facility is equipped with advanced diagnostic tools and genuine replacement parts.
                    </p>
                    <Link href="/pages/repair-warranty-service">
                      <Button variant="outline">Learn More About Repairs</Button>
                    </Link>
                  </div>

                  <div className="bg-secondary/10 border border-border rounded-lg p-6">
                    <h3 className="font-heading font-bold text-lg mb-3">Technical Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our technical team provides lifetime support for all products purchased from MinerHaolan. Get help with setup, configuration, troubleshooting, and optimization.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" asChild>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20technical%20support`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp Support
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/pages/faqs">View FAQs</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold mb-2">Related Products</h2>
                <p className="text-muted-foreground">You might also be interested in these miners</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} {...relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
