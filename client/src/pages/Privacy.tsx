import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
    return (
        <Layout>
            <SEOHead title="Privacy Policy" description="Privacy policy for MinerHaolan." />
            <div className="container py-12 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none">
                    <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>

                    <h3>Information We Collect</h3>
                    <p>We collect information you provide when placing an order, such as your name, address, and email. We use this solely for processing your order and communicating with you.</p>

                    <h3>Data Security</h3>
                    <p>We use industry-standard encryption to protect your data. We do not sell your personal information to third parties.</p>
                </div>
            </div>
        </Layout>
    );
}
