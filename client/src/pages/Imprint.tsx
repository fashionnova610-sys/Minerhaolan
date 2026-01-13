import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

export default function Imprint() {
    return (
        <Layout>
            <SEOHead title="Legal Notice (Imprint)" description="Legal notice and company information for MinerHaolan." />
            <div className="container py-12 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8">Legal Notice</h1>
                <div className="prose prose-slate max-w-none">
                    <h3>Company Information</h3>
                    <p><strong>MinerHaolan Limited</strong><br />
                        Hong Kong<br />
                        Email: support@minerhaolan.com<br />
                        Phone: +852 6338 9024</p>

                    <h3>Disclaimer</h3>
                    <p>The content of our website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.</p>
                </div>
            </div>
        </Layout>
    );
}
