import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, Zap, Globe } from "lucide-react";
import { Link } from "wouter";

export default function About() {
    return (
        <Layout>
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <div className="relative bg-secondary/10 py-20 border-b border-border overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                    <div className="container text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            Empowering the Future of <span className="text-primary">Mining</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            MinerHaolan is your trusted partner for premium ASIC mining hardware. We bridge the gap between top-tier manufacturers and miners worldwide.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/collections/all">
                                <Button size="lg" className="font-bold uppercase tracking-wide">
                                    Explore Products
                                </Button>
                            </Link>
                            <Link href="/pages/contact">
                                <Button variant="outline" size="lg">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container py-20">
                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-heading font-bold">Our Mission</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Our mission is to make cryptocurrency mining accessible, profitable, and sustainable for everyone—from individual hobbyists to large-scale institutional farms. We believe in the decentralized future of finance and strive to provide the infrastructure that powers it.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-bold text-primary">5+</span>
                                    <span className="text-sm text-muted-foreground">Years Experience</span>
                                </div>
                                <div className="w-px bg-border h-12" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-bold text-primary">10k+</span>
                                    <span className="text-sm text-muted-foreground">Miners Sold</span>
                                </div>
                                <div className="w-px bg-border h-12" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-bold text-primary">50+</span>
                                    <span className="text-sm text-muted-foreground">Countries Served</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary/20 rounded-lg aspect-square md:aspect-video flex items-center justify-center border border-border relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                            <Globe className="w-32 h-32 text-primary/20 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-heading font-bold mb-4">Why Choose MinerHaolan?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We don't just sell hardware; we provide comprehensive mining solutions backed by industry expertise.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Trusted Authenticity</h3>
                                    <p className="text-muted-foreground">
                                        Direct partnerships with Bitmain, MicroBT, and Canaan ensure 100% authentic hardware with full manufacturer warranties.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Truck className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Global Logistics</h3>
                                    <p className="text-muted-foreground">
                                        Fast, insured shipping to over 50 countries. We handle customs documentation to ensure smooth delivery to your doorstep.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Technical Expertise</h3>
                                    <p className="text-muted-foreground">
                                        Our team of engineers provides lifetime technical support, setup assistance, and optimization advice for all customers.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Mining?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                            Join thousands of satisfied customers and build your mining operation with the best hardware in the industry.
                        </p>
                        <Link href="/collections/all">
                            <Button size="lg" className="font-bold uppercase tracking-wide">
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
