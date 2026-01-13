import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, ShieldCheck, Zap, Thermometer, Activity, Lock, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/const";

export default function Hosting() {
    const handleContact = () => {
        const message = encodeURIComponent("Hi, I'm interested in your hosting services.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <div className="relative bg-secondary/10 py-20 border-b border-border overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                    <div className="container text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            <Server className="w-4 h-4" /> Professional Hosting
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            Secure. Efficient. <span className="text-primary">Reliable.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Maximize your mining uptime and profitability with our state-of-the-art hosting facilities. Low electricity rates, 24/7 monitoring, and expert maintenance.
                        </p>
                        <Button size="lg" className="font-bold uppercase tracking-wide" onClick={handleContact}>
                            Get a Quote
                        </Button>
                    </div>
                </div>

                <div className="container py-20">
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <Zap className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>Low Power Rates</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Access industrial-grade electricity rates as low as $0.06/kWh, significantly increasing your mining margins compared to residential rates.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <ShieldCheck className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>99.9% Uptime</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Redundant power sources and network connections ensure your miners are always hashing. We guarantee maximum operational stability.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <Thermometer className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>Optimal Cooling</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Advanced air and immersion cooling systems maintain optimal operating temperatures, extending the lifespan of your hardware.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <Activity className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>24/7 Monitoring</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Our on-site technicians monitor your fleet around the clock. Any issues are detected and resolved immediately to minimize downtime.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <Lock className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>High Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Facilities are protected by 24/7 armed security, biometric access control, and comprehensive CCTV surveillance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <Server className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>Full Transparency</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Access your miner's dashboard remotely via VPN. View real-time hashrate, temperature, and earnings from anywhere in the world.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-secondary/10 border border-border rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 flex flex-col justify-center">
                                <h2 className="text-3xl font-heading font-bold mb-6">Host Your Miners With Us</h2>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    Whether you have 1 miner or 1,000, we have the capacity and expertise to manage your fleet. Contact us today for a custom hosting proposal.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="font-bold uppercase tracking-wide" onClick={handleContact}>
                                        <MessageCircle className="w-4 h-4 mr-2" /> Contact Sales
                                    </Button>
                                    <Button variant="outline" size="lg" onClick={handleContact}>
                                        Request Pricing
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-primary/5 min-h-[300px] lg:min-h-full flex items-center justify-center relative">
                                {/* Abstract representation of a server farm */}
                                <div className="grid grid-cols-4 gap-2 opacity-20">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="w-8 h-12 bg-primary rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
