import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Where is your company headquarters?",
      answer: "Our shop MinerHaolan is a Hong Kong based limited and is registered in the commercial register (HKBR)."
    },
    {
      question: "Do I have to pay VAT to you?",
      answer: "Important information regarding deliveries to Germany / EU countries: Import VAT (Eust) is levied on goods imported into Germany or other EU countries. In Germany, this is 19%. Therefore, no VAT is charged. This EUSt is collected directly by customs or the shipping provider and must be paid by the buyer in all cases. Unless you are a B2B user with a VAT ID within the meaning of § 1a para. 1 UStG. If a miner is in our warehouse in Germany, VAT will be charged."
    },
    {
      question: "Payment & Shipping of the Miners?",
      answer: "Shipping times from our warehouses in Hong Kong or Germany depend on stock availability and the destination country. Delivery typically takes 5-10 business days. The goods are usually delivered directly to you from our warehouse in Hong Kong or Germany. If you are ordering as a company, you will need an EORI number. We accept the following payment methods: Advance payment via bank transfer, Crypto payment (USDT, BTC, ETH)."
    },
    {
      question: "Is the miner securely packaged?",
      answer: "Yes, all miners are carefully shipped in shockproof packaging material to prevent damage during transport."
    },
    {
      question: "Is there a guarantee on the miners?",
      answer: "Yes, new miners usually come with a manufacturer's warranty of 6-12 months, depending on the model and manufacturer."
    },
    {
      question: "What are pre-order orders?",
      answer: "Pre-orders are advance orders for mining equipment that is not yet available. This means you can secure stocks in advance, usually at a lower price, before they are officially released. The advantage: You benefit from lower prices and ensure you receive the latest hardware as soon as it becomes available. Please note: Since these are pre-orders, delivery delays may occur, and the market price of the miners may change before delivery."
    },
    {
      question: "Energy efficiency in ASIC miners – what does it mean?",
      answer: "Energy efficiency in ASIC miners is expressed in Joules per terahash (J/TH) and describes how much energy a miner consumes to generate 1 TH/s (terahash per second) of computing power. Lower J/TH value = Higher efficiency. A miner with 20 J/TH is more efficient than one with 30 J/TH because it needs less electricity to achieve the same computing power."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-secondary/20 py-12 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">FAQs</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Frequently asked questions about ordering, shipping, and our products.
          </p>
        </div>
      </div>

      <div className="container py-16 max-w-4xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-bold hover:text-primary transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
