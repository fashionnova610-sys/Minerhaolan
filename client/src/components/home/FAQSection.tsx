import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock } from "lucide-react";

const faqs = [
  {
    question: "Where is your company located?",
    answer: "MinerHaolan is headquartered in Hong Kong, a global hub for technology and logistics. This strategic location allows us to source hardware directly from manufacturers and ship efficiently worldwide."
  },
  {
    question: "Do I have to pay VAT?",
    answer: "For international orders shipped outside of Hong Kong, you generally do not pay Hong Kong VAT. However, you may be responsible for import duties and taxes in your destination country. Please check your local customs regulations."
  },
  {
    question: "Payment & Shipping of Miners",
    answer: "We accept various payment methods including Bank Transfer (USD) and Cryptocurrency (USDT/BTC). We ship globally via trusted partners like DHL, UPS, and FedEx with tracking provided for all orders."
  },
  {
    question: "Is the miner safely packaged?",
    answer: "Yes, all miners are shipped in original manufacturer packaging with additional protective layers to ensure they withstand international transit. We take great care in our packaging process."
  },
  {
    question: "Is there a warranty on the miners?",
    answer: "New miners come with the standard manufacturer warranty (typically 6-12 months depending on the brand). We assist with warranty claims. Used/refurbished units may have limited warranties as specified on the product page."
  },
  {
    question: "What are pre-order orders?",
    answer: "Pre-orders allow you to secure upcoming batches of hardware before they are released. Payment is required upfront to lock in the price and delivery slot. Estimated delivery dates are provided but subject to manufacturer schedules."
  },
  {
    question: "Energy efficiency in ASIC miners – What does it mean?",
    answer: "Energy efficiency (measured in J/TH) indicates how much electricity is consumed to generate one Terahash of computing power. Lower numbers mean better efficiency, resulting in lower electricity costs and higher profitability."
  }
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-secondary/5 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header & Support Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <MessageSquare className="w-3 h-3" />
                Support Center
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                HAVE A QUESTION? <br />
                <span className="text-primary">WE'RE HERE TO HELP</span>
              </h2>
              <p className="text-muted-foreground">
                Check out our customers' most frequently asked questions below. Can't find what you're looking for?
              </p>
            </div>

            <div className="bg-card border border-border p-6 rounded-sm shadow-sm">
              <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Support Hours
              </h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
                <p>Our customer support is available:</p>
                <p className="font-bold text-foreground">Mon - Fri: 08:00 - 17:00 (HKT)</p>
                <p className="text-xs mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Avg. response time: 24 hours
                </p>
              </div>
              <Button className="w-full font-heading font-bold uppercase tracking-wide">
                Contact Support
              </Button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-card rounded-sm px-6">
                  <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
