import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const categories = [
  {
    id: "crypto",
    title: "Crypto Miner",
    image: "/images/category-crypto.jpg",
    link: "/collections/crypto-miner",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    id: "lottery",
    title: "Lottery Bitcoin Miner",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop",
    link: "/collections/lottery",
    colSpan: "col-span-1",
  },
  {
    id: "heater",
    title: "Bitcoin Heater",
    image: "/images/bitcoin-heater-bg.jpg",
    link: "/collections/heater",
    colSpan: "col-span-1",
  },
  {
    id: "home",
    title: "Home Miner",
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?q=80&w=1000&auto=format&fit=crop",
    link: "/collections/home",
    colSpan: "col-span-1",
  },
  {
    id: "solar",
    title: "Miners for PV & Solar",
    image: "/images/category-solar.jpg",
    link: "/collections/solar",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
];

export default function CategoryCards() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.link} className={`group relative overflow-hidden rounded-sm h-64 md:h-80 ${category.colSpan}`}>
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {category.title}
                </h3>

                <div className="h-0 group-hover:h-10 overflow-hidden transition-all duration-300 ease-out">
                  <span className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-wider">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>

                {/* Tech Border Effect */}
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 transition-colors duration-300 pointer-events-none rounded-sm"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
