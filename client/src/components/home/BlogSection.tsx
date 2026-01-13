import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";

export default function BlogSection() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Knowledge Base
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              LATEST FROM THE <span className="text-primary">MINING BLOG</span>
            </h2>
          </div>
          <Link href="/blogs/news">
            <Button variant="outline" className="font-heading font-bold uppercase tracking-wide">
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((article) => (
            <Link key={article.id} href={`/blogs/news/${article.slug}`} className="group flex flex-col h-full bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-sm overflow-hidden">
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

                  {article.date}
                </div>

                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>

                <div className="flex items-center text-primary text-xs font-bold uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform duration-300">
                  Read Article <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
