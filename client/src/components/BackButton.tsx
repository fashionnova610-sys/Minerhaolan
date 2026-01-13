import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function BackButton() {
    const [location] = useLocation();

    // Don't show on home page
    if (location === "/") return null;

    return (
        <div className="container py-2">
            <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors pl-0"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>
        </div>
    );
}
