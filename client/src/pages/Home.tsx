import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import VideoSection from "@/components/home/VideoSection";
import BitcoinHeater from "@/components/home/BitcoinHeater";
import B2BSection from "@/components/home/B2BSection";
import BlogSection from "@/components/home/BlogSection";
import FAQSection from "@/components/home/FAQSection";

import SEOHead from "@/components/SEOHead";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <Layout>
      <SEOHead
        title="Home"
        description="MinerHaolan - Your trusted source for premium ASIC mining hardware. Bitcoin miners, crypto hardware, and global shipping."
      />
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <VideoSection />
      <BitcoinHeater />
      <B2BSection />
      <BlogSection />
      <FAQSection />
    </Layout>
  );
}
