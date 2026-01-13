import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";

export default function Cart() {
  const { getCartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const cartItems = getCartItems();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-20">
          <Card className="p-12 text-center max-w-2xl mx-auto">
            <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-3xl font-heading font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some miners to your cart to get started with your mining operation.
            </p>
            <Link href="/collections/all">
              <Button size="lg">
                Browse Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2">
            Shopping <span className="text-primary">Cart</span>
          </h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <Card key={product.id} className="p-6">
                <div className="flex gap-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-contain"
                  />
                  <div className="flex-grow">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-heading font-bold text-lg hover:text-primary transition-colors mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.manufacturer} • {product.hashrate} • {product.power}W
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl">${product.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">per unit</p>
                    {quantity > 1 && (
                      <p className="text-primary font-bold mt-2">
                        ${(product.price * quantity).toLocaleString()} total
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link href="/collections/all">
                <Button variant="ghost">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-mono text-primary">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-mono text-primary">Calculated at checkout</span>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-3xl">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mb-3" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>✓ Secure checkout</p>
                <p>✓ Global shipping available</p>
                <p>✓ Best price guarantee</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
