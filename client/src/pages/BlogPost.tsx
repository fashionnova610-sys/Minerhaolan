import { useRoute, Link } from "wouter";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import NotFound from "./NotFound";

export default function BlogPost() {
    const [match, params] = useRoute("/blogs/news/:slug");

    if (!match) return <NotFound />;

    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) return <NotFound />;

    return (
        <Layout>
            <SEOHead
                title={post.title}
                description={post.excerpt}
                image={post.image}
                type="article"
            />

            <article className="min-h-screen bg-background py-12">
                <div className="container max-w-4xl">
                    {/* Navigation */}
                    <Link href="/blogs/news">
                        <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary mb-8">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                        </Button>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-mono">
                            <span className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full text-primary font-bold uppercase tracking-wider text-xs">
                                <Tag className="w-3 h-3" /> {post.category}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Featured Image */}
                    <div className="aspect-video w-full rounded-lg overflow-hidden mb-12 border border-border">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-slate max-w-none dark:prose-invert
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </Layout>
    );
}
