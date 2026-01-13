import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy, MessageCircle, ArrowRight } from "lucide-react";
import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { WHATSAPP_NUMBER } from "@/const";

export default function OrderSuccess() {
    const [match, params] = useRoute("/order-success/:orderNumber");
    const orderNumber = params?.orderNumber || "";

    const { data: order, isLoading } = trpc.orders.getByOrderNumber.useQuery(
        { orderNumber },
        { enabled: !!orderNumber }
    );

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };



    const handleWhatsAppConfirm = () => {
        if (!order) return;

        const message = encodeURIComponent(
            `✅ *Payment Confirmation*\n\n` +
            `Order Number: *${order.orderNumber}*\n` +
            `Amount: *$${(order.totalAmount / 100).toLocaleString()}*\n` +
            `Payment Method: *${order.notes?.replace('Payment Method: ', '')}*\n\n` +
            `I have completed the payment. Please verify and process my order.`
        );

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="container py-12 max-w-2xl">
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </Layout>
        );
    }

    if (!order) {
        return (
            <Layout>
                <div className="container py-12 text-center">
                    <h1 className="text-2xl font-bold mb-4">Order not found</h1>
                    <Link href="/">
                        <Button>Return Home</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const paymentMethod = order.notes?.replace('Payment Method: ', '') as string;

    return (
        <Layout>
            <div className="container py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-heading font-bold mb-2">Order Placed Successfully!</h1>
                        <p className="text-muted-foreground">
                            Order Number: <span className="font-mono font-bold text-foreground">{order.orderNumber}</span>
                        </p>
                    </div>

                    <Card className="p-6 mb-8 border-primary/20 bg-primary/5">
                        <h2 className="font-bold text-xl mb-4">Payment Instructions</h2>

                        {paymentMethod === 'btc' && (
                            <div className="space-y-4">
                                <p className="text-sm">Please send exactly <span className="font-bold">{(order.totalAmount / 100 / 95000).toFixed(6)} BTC</span> (approx) to:</p>
                                <div className="bg-background border border-border p-3 rounded flex items-center justify-between">
                                    <code className="text-xs sm:text-sm font-mono break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">Network: Bitcoin (BTC)</p>
                            </div>
                        )}

                        {paymentMethod === 'usdt' && (
                            <div className="space-y-4">
                                <p className="text-sm">Please send <span className="font-bold">${(order.totalAmount / 100).toLocaleString()} USDT</span> to:</p>
                                <div className="bg-background border border-border p-3 rounded flex items-center justify-between">
                                    <code className="text-xs sm:text-sm font-mono break-all">TVJ5dXj5dXj5dXj5dXj5dXj5dXj5dXj5dX</code>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard("TVJ5dXj5dXj5dXj5dXj5dXj5dXj5dXj5dX")}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">Network: TRC20 (Tron)</p>
                            </div>
                        )}

                        {paymentMethod === 'bank' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">Bank Name:</span>
                                    <span className="font-bold text-right">HSBC Hong Kong</span>

                                    <span className="text-muted-foreground">Account Name:</span>
                                    <span className="font-bold text-right">Miner Haolan Limited</span>

                                    <span className="text-muted-foreground">Account Number:</span>
                                    <span className="font-bold text-right">123-456789-838</span>

                                    <span className="text-muted-foreground">SWIFT Code:</span>
                                    <span className="font-bold text-right">HSBCHKHH</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Please include your Order Number as the reference.</p>
                            </div>
                        )}

                        {['visa', 'eth'].includes(paymentMethod) && (
                            <div className="text-center py-4">
                                <p>Please contact our support team on WhatsApp to complete your payment via {paymentMethod === 'visa' ? 'Credit Card' : 'Ethereum'}.</p>
                            </div>
                        )}
                    </Card>

                    <div className="space-y-4">
                        <Button
                            onClick={handleWhatsAppConfirm}
                            className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Confirm Payment on WhatsApp
                        </Button>

                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
