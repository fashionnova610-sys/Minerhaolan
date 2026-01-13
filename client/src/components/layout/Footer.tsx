import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, Globe, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container">
        {/* Trust Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-border/50 pb-12">
          <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-sm border border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg uppercase">Secure Shopping</h4>
              <p className="text-xs text-muted-foreground">SSL Encrypted & Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-sm border border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg uppercase">Global Shipping</h4>
              <p className="text-xs text-muted-foreground">Fast Delivery Worldwide</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-sm border border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg uppercase">Tracked Orders</h4>
              <p className="text-xs text-muted-foreground">Real-time Shipment Tracking</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-16 bg-card border border-border rounded-lg p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                Stay Connected to the <span className="text-primary">Mining Network</span>
              </h3>
              <p className="text-muted-foreground">
                Subscribe to receive the latest updates on ASIC hardware, profitability analysis, and exclusive B2B offers.
              </p>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-md flex gap-2">
              <Input
                placeholder="Enter your email address"
                className="h-12 bg-background border-border focus:border-primary font-mono text-sm"
              />
              <Button size="lg" className="h-12 px-8 font-heading font-bold tracking-wide uppercase">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">
                MH
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none tracking-wide">
                  MINER<span className="text-primary">HAOLAN</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your professional partner for high-performance cryptocurrency mining infrastructure. Based in Hong Kong, serving the global blockchain economy.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>MinerHaolan Limited, Hong Kong</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@minerhaolan.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+852 6338 9024</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider">ASIC Miner Shop</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/collections/bitcoin-miner" className="hover:text-primary transition-colors">Bitcoin Miner</Link></li>
              <li><Link href="/collections/altcoin-miner" className="hover:text-primary transition-colors">Altcoin Miner</Link></li>
              <li><Link href="/collections/bitmain" className="hover:text-primary transition-colors">Bitmain Antminer</Link></li>
              <li><Link href="/collections/microbt" className="hover:text-primary transition-colors">MicroBT Whatsminer</Link></li>
              <li><Link href="/collections/canaan" className="hover:text-primary transition-colors">Canaan Avalon</Link></li>
              <li><Link href="/collections/iceriver" className="hover:text-primary transition-colors">IceRiver KS</Link></li>
              <li><Link href="/collections/goldshell" className="hover:text-primary transition-colors">Goldshell Box</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider">Mining Solutions</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/collections/solar" className="hover:text-primary transition-colors">For Photovoltaic / Solar</Link></li>
              <li><Link href="/collections/bitcoin-home" className="hover:text-primary transition-colors">Home Mining Units</Link></li>
              <li><Link href="/collections/heater" className="hover:text-primary transition-colors">Bitcoin Heaters</Link></li>
              <li><Link href="/collections/professional" className="hover:text-primary transition-colors">Professional / B2B</Link></li>
              <li><Link href="/collections/lottery" className="hover:text-primary transition-colors">Lottery Miners</Link></li>
              <li><Link href="/pages/mining-profit-calculator" className="hover:text-primary transition-colors">Profitability Calculator</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider">Company Info</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/pages/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/pages/shipping" className="hover:text-primary transition-colors">Shipping Information</Link></li>
              <li><Link href="/pages/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/pages/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/pages/imprint" className="hover:text-primary transition-colors">Legal Notice</Link></li>
              <li><Link href="/pages/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border/50 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 MinerHaolan Limited. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <p className="max-w-md text-right hidden md:block opacity-70">
              Note: Crypto mining involves risks. Actual returns can vary significantly due to price fluctuations and other factors.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
