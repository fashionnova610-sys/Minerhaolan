import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/const";


export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // MinerHaolan WhatsApp Business number
  const whatsappNumber = WHATSAPP_NUMBER; // Hong Kong number format
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your ASIC miners.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300 group",
        isHovered ? "px-6 py-4" : "p-4"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 animate-pulse" />
      <span
        className={cn(
          "font-bold text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
          isHovered ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
        )}
      >
        Chat with us
      </span>
    </a>
  );
}
