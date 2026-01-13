import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  return (
    <Layout>
      <SEOHead
        title="Blog & News"
        description="Latest news, guides, and insights about ASIC mining, cryptocurrency hardware, and the mining industry."
      />
      <div className="min-h-screen bg-background py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Knowledge Base
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Blog & <span className="text-primary">News</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Stay updated with the latest insights, guides, and news from the cryptocurrency mining industry.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((article) => (
              <Link key={article.id} href={`/blogs/news/${article.slug}`}>
                <article
                  className="group flex flex-col h-full bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-sm overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider border border-border rounded-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </div>

                    <h2 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center text-primary text-xs font-bold uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform duration-300">
                      Read Article <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
