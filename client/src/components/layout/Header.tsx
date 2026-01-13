import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight, MapPin, Trophy, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/useSearch";

export default function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { setSearchQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setLocation("/collections/all");
    }
  };

  const navItems = [
    {
      name: "Bitcoin Miner",
      path: "/collections/bitcoin-miner",
      hasDropdown: true,
      submenu: [
        { name: "PV System / Solar Miner", path: "/collections/solar-miner" },
        { name: "Hydro Miner", path: "/collections/hydro-miner" },
        { name: "Lottery Bitcoin Miner", path: "/collections/lottery" },
        { name: "Bitcoin Heater", path: "/collections/heater" },
        { name: "Home Miner", path: "/collections/home-miner" }
      ]
    },
    {
      name: "Altcoin Miner",
      path: "/collections/altcoin-miner",
      hasDropdown: true,
      submenu: [
        {
          name: "By Coin",
          path: "/collections/altcoin-coin",
          hasSubmenu: true,
          submenu: [
            { name: "Doge Coin Miner", path: "/collections/doge" },
            { name: "Lite Coin Miner", path: "/collections/litecoin" },
            { name: "Kaspa Miner", path: "/collections/kaspa" },
            { name: "ALEO Miner", path: "/collections/aleo" },
            { name: "Alephium Miner", path: "/collections/alephium" },
            { name: "Ethereum Classic Miner", path: "/collections/etc" },
            { name: "Kadena Miner", path: "/collections/kadena" },
            { name: "Dash Miner", path: "/collections/dash" },
            { name: "Zcash Miner", path: "/collections/zcash" },
            { name: "Nervos Miner", path: "/collections/ckb" }
          ]
        },
        {
          name: "By Algorithm",
          path: "/collections/altcoin-algo",
          hasSubmenu: true,
          submenu: [
            { name: "SHA256 Miner", path: "/collections/sha256" },
            { name: "Blake3 Miner", path: "/collections/blake3" },
            { name: "zkSnark Miner", path: "/collections/zksnark" },
            { name: "Scrypt Miner", path: "/collections/scrypt" },
            { name: "KHeavyHash Miner", path: "/collections/kheavyhash" },
            { name: "eTHash Miner", path: "/collections/ethash" },
            { name: "Blake2B-Sia Miner", path: "/collections/blake2b" },
            { name: "X11 Miner", path: "/collections/x11" },
            { name: "Equihash Miner", path: "/collections/equihash" },
            { name: "Eaglesong Miner", path: "/collections/eaglesong" }
          ]
        }
      ]
    },
    {
      name: "Miner Manufacturers",
      path: "/collections/manufacturers",
      hasDropdown: true,
      submenu: [
        { name: "Bitmain Antminer", path: "/collections/bitmain" },
        { name: "MicroBT Whatsminer", path: "/collections/microbt" },
        { name: "Canaan Avalon", path: "/collections/canaan" },
        { name: "Bitaxe Miner", path: "/collections/bitaxe" },
        { name: "Goldshell Miner", path: "/collections/goldshell" },
        { name: "ElphaPex Miner", path: "/collections/elphapex" },
        { name: "Bitdeer Miner", path: "/collections/bitdeer" },
        { name: "Volcminer", path: "/collections/volcminer" },
        { name: "IceRiver", path: "/collections/iceriver" },
        { name: "Jasminer", path: "/collections/jasminer" },
        { name: "Ipollo", path: "/collections/ipollo" },
        { name: "DesiweMiner", path: "/collections/desiweminer" },
        { name: "Wind Miner", path: "/collections/wind-miner" }
      ]
    },
    {
      name: "Accessories",
      path: "/collections/accessories",
      hasDropdown: true,
      submenu: [
        { name: "Miner Accessories", path: "/collections/accessories" },
        { name: "Mining Container", path: "/collections/mining-container" },
        { name: "Hydro Miner Rack", path: "/collections/hydro-rack" },
        { name: "ASIC Miner Silencer", path: "/collections/silencer" },
        { name: "Power Supply Units (PSU)", path: "/collections/psu" },
        { name: "Fans & Cooling", path: "/collections/cooling" },
        { name: "Cables & Connectors", path: "/collections/cables" },
        { name: "Control Boards", path: "/collections/control-boards" }
      ]
    },
    {
      name: "Knowledge & Info",
      path: "/pages/knowledge",
      hasDropdown: true,
      submenu: [
        { name: "Mining Profit Calculator", path: "/pages/mining-profit-calculator" },
        { name: "Hosting Services", path: "/pages/hosting" },
        { name: "FAQ", path: "/pages/faqs" },
        { name: "Blog & News", path: "/blogs/news" },
        { name: "About Us", path: "/pages/about" }
      ]
    },
    { name: "Repair & Warranty", path: "/pages/repair-warranty-service" },
    { name: "Contact", path: "/pages/contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar - Dark Blue Background like original */}
      <div className="bg-[#0f172a] text-white py-2.5 text-xs font-bold hidden md:block border-b border-white/10">
        <div className="container flex justify-between items-center">
          <div className="flex gap-8 mx-auto">
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Hong Kong Headquarters</span>
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
              <Trophy className="w-3.5 h-3.5 text-accent" />
              <span>Best Price Guarantee</span>
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Service & Support</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={cn(
        "bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300",
        isScrolled ? "py-2 shadow-lg" : "py-4"
      )}>
        <div className="container flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group min-w-fit">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-heading font-bold text-xl shadow-[0_0_15px_rgba(var(--primary),0.5)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.8)] transition-all">
              MH
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none tracking-wide text-foreground group-hover:text-primary transition-colors">
                MINER<span className="text-primary">HAOLAN</span>
              </span>
              <span className="text-[0.65rem] font-mono text-muted-foreground tracking-widest uppercase">
                Industrial Mining Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group px-3 py-2">
                <Link href={item.path} className={cn(
                  "flex items-center gap-1 text-sm font-bold transition-colors hover:text-primary font-heading tracking-wide uppercase",
                  location === item.path ? "text-primary" : "text-foreground/80"
                )}>
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
                </Link>

                {/* Level 1 Dropdown */}
                {item.hasDropdown && item.submenu && (
                  <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-card border border-border shadow-xl rounded-sm p-2 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-0 before:w-full before:h-4 before:bg-transparent">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.name} className="relative group/sub">
                          <Link
                            href={subItem.path}
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors"
                          >
                            {subItem.name}
                            {/* @ts-ignore */}
                            {subItem.hasSubmenu && <ChevronRight className="w-3 h-3 opacity-50" />}
                          </Link>

                          {/* Level 2 Dropdown (Nested) */}
                          {/* @ts-ignore */}
                          {subItem.hasSubmenu && subItem.submenu && (
                            <div className="absolute top-0 left-full w-64 pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform translate-x-[-10px] group-hover/sub:translate-x-0">
                              <div className="bg-card border border-border shadow-xl rounded-sm p-2 flex flex-col gap-1">
                                {/* @ts-ignore */}
                                {subItem.submenu.map((nestedItem) => (
                                  <Link
                                    key={nestedItem.name}
                                    href={nestedItem.path}
                                    className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors block"
                                  >
                                    {nestedItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative hidden lg:block w-48 xl:w-64">
              <Input
                placeholder="Search miners..."
                className="h-9 pr-8 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 font-mono text-xs"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button type="submit" className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-primary transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>



            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary hover:bg-primary/10">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[116px] bg-background z-40 overflow-y-auto border-t border-border p-4 animate-in slide-in-from-top-5">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-border/50 pb-2">
                <Link
                  href={item.path}
                  className="flex items-center justify-between py-3 text-lg font-bold font-heading uppercase"
                  onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && item.submenu && (
                  <div className="pl-4 flex flex-col gap-1">
                    {item.submenu.map((subItem) => (
                      <div key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                        {/* @ts-ignore */}
                        {subItem.hasSubmenu && subItem.submenu && (
                          <div className="pl-4 border-l border-border/50 ml-2 mt-1 mb-2">
                            {/* @ts-ignore */}
                            {subItem.submenu.map((nestedItem) => (
                              <Link
                                key={nestedItem.name}
                                href={nestedItem.path}
                                className="block py-1.5 text-xs text-muted-foreground/80 hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {nestedItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
