import { Button } from "@/components/ui/button";
import { Check, X, Mail } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WHATSAPP_NUMBER } from "@/const";

export default function Repair() {
  const handleContact = (plan: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${plan} for my miners.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-secondary/20 py-12 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Repair & Warranty Service</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium warranty service for your ASIC miners. We ensure your operations keep running smoothly.
          </p>
        </div>
      </div>

      <div className="container py-16 space-y-20">
        {/* Warranty Service Comparison */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold mb-2">Warranty Service Comparison</h2>
            <p className="text-muted-foreground">Choose the warranty level that suits your needs.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="p-4 text-left font-bold border border-border">Performance feature</th>
                  <th className="p-4 text-center font-bold border border-border w-1/4">Standard Manufacturer's Warranty</th>
                  <th className="p-4 text-center font-bold border border-border w-1/4 text-primary">MinerHaolan Premium Guarantee</th>
                  <th className="p-4 text-center font-bold border border-border w-1/4 text-primary">MinerHaolan Ultra Premium Guarantee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Price", std: "$0", prem: "$279.00", ultra: "$449.00" },
                  { feature: "Warranty period", std: "12 months", prem: "24 months", ultra: "36 months" },
                  { feature: "Repair time", std: "4-8 weeks", prem: "1-2 weeks", ultra: "1-2 weeks" },
                  { feature: "Setup assistance", std: false, prem: true, ultra: true },
                  { feature: "Priority support", std: false, prem: true, ultra: true },
                  { feature: "Free return shipping", std: false, prem: true, ultra: true },
                  { feature: "Replacement device", std: false, prem: false, ultra: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4 border border-border font-medium">{row.feature}</td>
                    <td className="p-4 border border-border text-center">
                      {typeof row.std === 'boolean' ? (
                        row.std ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                      ) : row.std}
                    </td>
                    <td className="p-4 border border-border text-center bg-primary/5">
                      {typeof row.prem === 'boolean' ? (
                        row.prem ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                      ) : row.prem}
                    </td>
                    <td className="p-4 border border-border text-center bg-primary/10">
                      {typeof row.ultra === 'boolean' ? (
                        row.ultra ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                      ) : row.ultra}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-border bg-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg font-bold">Standard Manufacturer's Warranty</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <div className="text-4xl font-mono font-bold mb-2">$0</div>
              <p className="text-sm text-muted-foreground">Included with every purchase</p>
              <ul className="mt-6 space-y-2 text-sm text-left">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Basic protection</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Manufacturer support</li>
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-muted-foreground" /> No priority service</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>Included</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary bg-card relative overflow-hidden shadow-lg shadow-primary/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg font-bold text-primary">MinerHaolan Premium Guarantee</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <div className="text-4xl font-mono font-bold mb-2 text-primary">$279</div>
              <p className="text-sm text-muted-foreground">Extended protection & speed</p>
              <ul className="mt-6 space-y-2 text-sm text-left">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 24 months coverage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Fast repair turnaround</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Priority support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" onClick={() => handleContact('Premium Guarantee')}>
                <Mail className="w-4 h-4 mr-2" /> Inquire Now
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg font-bold">MinerHaolan Ultra Premium</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <div className="text-4xl font-mono font-bold mb-2">$449</div>
              <p className="text-sm text-muted-foreground">Maximum peace of mind</p>
              <ul className="mt-6 space-y-2 text-sm text-left">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 36 months coverage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Immediate replacement</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> VIP dedicated support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover:border-primary hover:text-primary" onClick={() => handleContact('Ultra Premium Guarantee')}>
                <Mail className="w-4 h-4 mr-2" /> Inquire Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Repair Services Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Repair of all brands of miners</h2>
            <p className="text-muted-foreground">
              Our repair network is ISO 9001 certified. We work with certified technicians to ensure your devices are repaired professionally and efficiently. We repair all major brands including Bitmain, Whatsminer, Goldshell, and more.
            </p>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Our services at a glance:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Fault analysis & repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Replacement of defective components (chips, fans, power supplies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Use of original spare parts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Transparent cost estimate in advance</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-secondary/20 rounded-lg aspect-video flex items-center justify-center border border-border overflow-hidden">
            <img
              src="/images/repair-center.png"
              alt="MinerHaolan Repair Center"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
