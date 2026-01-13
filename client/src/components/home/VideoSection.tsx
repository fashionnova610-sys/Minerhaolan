import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-bold tracking-wider uppercase w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              New Arrival
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              THE NEW <br />
              <span className="text-primary">AVALON Q</span>
            </h2>
            
            <p className="text-xl text-muted-foreground font-light">
              Your start for home mining! Compact, quiet, and efficient.
            </p>
            
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50">
              <div className="flex flex-col">
                <span className="text-3xl font-mono font-bold text-foreground">90</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">TH/s Hashrate</span>
              </div>
              <div className="flex flex-col border-l border-border/50 pl-4">
                <span className="text-3xl font-mono font-bold text-foreground">18.6</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">J/TH Efficiency</span>
              </div>
              <div className="flex flex-col border-l border-border/50 pl-4">
                <span className="text-3xl font-mono font-bold text-foreground">1674</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Watt Power</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              <Button size="lg" className="h-12 px-8 font-heading font-bold uppercase tracking-wide">
                Buy Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 font-heading font-bold uppercase tracking-wide">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Video Placeholder */}
          <div className="relative order-1 lg:order-2 group">
            <div className="relative aspect-video bg-card rounded-lg overflow-hidden border border-border shadow-2xl group-hover:border-primary/50 transition-colors duration-500">
              <img 
                src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop" 
                alt="Avalon Q Miner" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(var(--primary),0.6)] group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </div>
              </div>
              
              {/* Tech Overlay */}
              <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-sm text-xs font-mono text-white border border-white/10 rounded-sm">
                REC ● 00:12:45
              </div>
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm text-xs font-mono text-white border border-white/10 rounded-sm">
                4K HDR
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
