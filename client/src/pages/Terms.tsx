import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
    return (
        <Layout>
            <SEOHead title="Terms & Conditions" description="Terms and conditions for MinerHaolan." />
            <div className="container py-12 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8">Terms & Conditions</h1>
                <div className="prose prose-slate max-w-none">
                    <p>Welcome to MinerHaolan. By accessing our website and purchasing our products, you agree to the following terms and conditions.</p>

                    <h3>1. Products</h3>
                    <p>We sell cryptocurrency mining hardware. Prices and availability are subject to change without notice due to market volatility.</p>

                    <h3>2. Returns & Refunds</h3>
                    <p>Due to the nature of cryptocurrency mining hardware, all sales are final. We do not accept returns unless the item is defective upon arrival (DOA).</p>

                    <h3>3. Warranty</h3>
                    <p>New miners come with a manufacturer's warranty (usually 6-12 months). Used miners are sold with a 30-day testing warranty.</p>
                </div>
            </div>
        </Layout>
    );
}
