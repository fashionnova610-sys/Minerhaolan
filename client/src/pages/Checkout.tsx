import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, Bitcoin, ShoppingBag, Wallet, Building2, CreditCard, Check, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type PaymentMethod = 'btc' | 'usdt' | 'eth' | 'bank' | 'visa';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
  { id: 'btc', name: 'Bitcoin (BTC)', description: 'Pay with Bitcoin cryptocurrency', icon: <Bitcoin className="w-6 h-6" /> },
  { id: 'usdt', name: 'Tether (USDT)', description: 'TRC20 or ERC20 network', icon: <Wallet className="w-6 h-6" /> },
  { id: 'eth', name: 'Ethereum (ETH)', description: 'Pay with Ethereum', icon: <Wallet className="w-6 h-6" /> },
  { id: 'bank', name: 'Bank Transfer', description: 'Wire transfer to our account', icon: <Building2 className="w-6 h-6" /> },
  { id: 'visa', name: 'Visa / Mastercard', description: 'Credit or debit card', icon: <CreditCard className="w-6 h-6" /> },
];

export default function Checkout() {
  const { getCartItems, getCartTotal, clearCart } = useCart();
  const cartItems = getCartItems();
  const total = getCartTotal();
  const [, setLocation] = useLocation();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('btc');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: ""
  });

  const createOrderMutation = trpc.orders.create.useMutation({
    onSuccess: (order) => {
      clearCart();
      setLocation(`/order-success/${order.orderNumber}`);
    },
    onError: (error) => {
      toast.error(`Order failed: ${error.message}`);
    }
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      setLocation("/cart");
    }
  }, [cartItems.length, setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.address) {
      toast.error("Please fill in all required shipping details");
      return;
    }

    createOrderMutation.mutate({
      items: cartItems.map(item => ({
        productId: parseInt(item.product.id), // Assuming ID is numeric string, need to ensure schema match
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: total * 100, // Convert to cents
      currency: "USD",
      paymentMethod: selectedPayment,
      shippingAddress: formData
    });
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column: Shipping & Payment */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">
                Checkout
              </h1>
              <p className="text-muted-foreground">
                Complete your order securely
              </p>
            </div>

            {/* Shipping Details Form */}
            <Card className="p-6">
              <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                1. Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Mining St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleInputChange} placeholder="USA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip / Postal Code *</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="10001" />
                </div>
              </div>
            </Card>

            {/* Payment Method Selection */}
            <Card className="p-6">
              <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                2. Payment Method
              </h2>
              <div className="space-y-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPayment(option.id)}
                    className={`w-full relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${selectedPayment === option.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                      }`}
                  >
                    <div className={`p-2 rounded-full ${selectedPayment === option.id ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                      }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{option.name}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    {selectedPayment === option.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-start border-b border-border pb-4 last:border-0">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-white rounded border border-border p-1 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm line-clamp-2">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: {quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${(product.price * quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-border mt-2">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={createOrderMutation.isPending}
                  className="w-full h-12 text-lg font-bold"
                >
                  {createOrderMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Place Order</>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing this order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
              <div className="bg-secondary/10 p-3 rounded">
                <p className="font-bold mb-1">Secure Payment</p>
                <p>Encrypted Data</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded">
                <p className="font-bold mb-1">Global Shipping</p>
                <p>Tracked Delivery</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded">
                <p className="font-bold mb-1">Warranty</p>
                <p>Manufacturer Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
