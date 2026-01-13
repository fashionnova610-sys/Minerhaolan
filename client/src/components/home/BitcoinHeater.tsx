import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Coins, Home } from "lucide-react";

export default function BitcoinHeater() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/bitcoin-heater-bg.jpg" 
          alt="Bitcoin Heater in Modern Home" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>

      <div className="container relative z-10 h-full flex items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-bold tracking-wider uppercase mb-6 backdrop-blur-sm bg-background/50">
            <Flame className="w-3 h-3" />
            Dual Purpose Technology
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6 text-foreground">
            SMART HEATING. <br />
            <span className="text-accent">WITH BITCOIN.</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Transform energy expenditure into digital assets. The Bitcoin Heater provides efficient warmth for your home while mining cryptocurrency simultaneously.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-card/80 backdrop-blur-sm p-4 rounded-sm border border-border">
              <Flame className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold font-heading uppercase text-sm">Heat</h4>
              <p className="text-xs text-muted-foreground">Efficient space heating</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-4 rounded-sm border border-border">
              <Coins className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold font-heading uppercase text-sm">Earn</h4>
              <p className="text-xs text-muted-foreground">Mine BTC rewards</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-4 rounded-sm border border-border">
              <Home className="w-6 h-6 text-foreground mb-2" />
              <h4 className="font-bold font-heading uppercase text-sm">Quiet</h4>
              <p className="text-xs text-muted-foreground">Silent operation</p>
            </div>
          </div>
          
          <Button size="lg" className="h-14 px-8 text-base font-heading font-bold tracking-wide uppercase bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_rgba(var(--accent),0.4)] hover:shadow-[0_0_30px_rgba(var(--accent),0.6)] transition-all">
            Explore Heaters <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
