import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "../WhatsAppButton";

import BackButton from "../BackButton";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Header />
      <main className="flex-grow pt-[104px] md:pt-[112px]">
        <BackButton />
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
