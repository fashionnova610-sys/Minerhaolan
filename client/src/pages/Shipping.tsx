import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

export default function Shipping() {
    return (
        <Layout>
            <SEOHead title="Shipping Information" description="Global shipping information for MinerHaolan." />
            <div className="container py-12 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8">Shipping Information</h1>
                <div className="prose prose-slate max-w-none">
                    <h3>Global Delivery</h3>
                    <p>We ship worldwide from our warehouse in Hong Kong. We use trusted carriers like DHL, UPS, and FedEx to ensure your mining hardware arrives safely and on time.</p>

                    <h3>Processing Time</h3>
                    <p>Orders are typically processed within 1-3 business days. You will receive a tracking number as soon as your order ships.</p>

                    <h3>Customs & Duties</h3>
                    <p>Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.</p>
                </div>
            </div>
        </Layout>
    );
}
