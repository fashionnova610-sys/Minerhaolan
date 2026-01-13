import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Industrial Mining Data Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-2xl animate-in slide-in-from-left-10 duration-700 fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Next Gen Mining Hardware
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-foreground drop-shadow-lg">
            YOUR PROVIDER FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text">
              ASIC MINERS
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
            Order your ASIC miner from us for home or professional projects.
            <span className="text-foreground font-medium"> Best price guarantee</span> for your crypto mining hardware.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/collections/all">
              <Button size="lg" className="h-14 px-8 text-base font-heading font-bold tracking-wide uppercase bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all w-full sm:w-auto">
                Buy ASIC Miner <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/collections/all">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-heading font-bold tracking-wide uppercase border-primary/30 hover:bg-primary/5 hover:border-primary text-foreground backdrop-blur-sm w-full sm:w-auto">
                View Catalog
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t border-border/30 pt-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-wide">
                <Globe className="w-5 h-5" />
                <span>Global</span>
              </div>
              <p className="text-xs text-muted-foreground">Worldwide shipping from Hong Kong hub</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-wide">
                <ShieldCheck className="w-5 h-5" />
                <span>Secure</span>
              </div>
              <p className="text-xs text-muted-foreground">Verified hardware with warranty</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-wide">
                <Zap className="w-5 h-5" />
                <span>Efficient</span>
              </div>
              <p className="text-xs text-muted-foreground">Latest high-efficiency models</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 right-10 w-64 h-64 border border-primary/10 rounded-full animate-spin-slow pointer-events-none"></div>
      <div className="absolute top-1/4 right-10 w-60 h-60 border border-dashed border-primary/10 rounded-full animate-reverse-spin pointer-events-none"></div>
    </section>
  );
}
