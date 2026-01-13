import { Button } from "@/components/ui/button";
import { Building2, ArrowRight } from "lucide-react";

export default function B2BSection() {
  return (
    <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
        <img 
          src="/images/b2b-banner.jpg" 
          alt="Global B2B Network" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
              <Building2 className="w-3 h-3" />
              Enterprise Solutions
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-6">
              LOOKING FOR A PROFESSIONAL PARTNER FOR YOUR <span className="text-accent">MINING BUSINESS?</span>
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-xl">
              From bulk hardware procurement to hosting facility setup, MinerHaolan provides end-to-end B2B services with Hong Kong efficiency and global reach.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-sm border border-white/10">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-sm font-mono font-bold uppercase">Bulk Pricing</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-sm border border-white/10">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-sm font-mono font-bold uppercase">Logistics Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-sm border border-white/10">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-sm font-mono font-bold uppercase">Hosting Services</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card/10 backdrop-blur-md border border-white/20 p-8 rounded-lg max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-heading font-bold mb-4">Get in Touch</h3>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Speak directly with our B2B specialists about your project requirements.
            </p>
            <Button size="lg" className="w-full h-12 bg-white text-primary hover:bg-white/90 font-heading font-bold uppercase tracking-wide">
              Contact B2B Team <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
