/// <reference types="vite/client" />

declare module 'wouter' {
    import { ComponentType, ReactNode } from 'react';

    export interface RouteProps {
        path: string;
        component?: ComponentType<any>;
        children?: ReactNode | ((params: any) => ReactNode);
    }

    export const Link: ComponentType<any>;
    export const Route: ComponentType<RouteProps>;
    export const Switch: ComponentType<{ children: ReactNode }>;
    export const Router: ComponentType<{ children: ReactNode }>;

    export function useRoute(pattern: string): [boolean, Record<string, string> | null];
    export function useLocation(): [string, (to: string, options?: { replace?: boolean }) => void];
    export function useParams(): Record<string, string>;
}

declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type Icon = FC<IconProps>;

    export const ArrowRight: Icon;
    export const Zap: Icon;
    export const ShieldCheck: Icon;
    export const Globe: Icon;
    export const Activity: Icon;
    export const Cpu: Icon;
    export const ShoppingCart: Icon;
    export const GitCompare: Icon;
    export const ArrowLeft: Icon;
    export const Check: Icon;
    export const Truck: Icon;
    export const Shield: Icon;
    export const Wind: Icon;
    export const Package: Icon;
    export const CreditCard: Icon;
    export const Headphones: Icon;
    export const ChevronLeft: Icon;
    export const ChevronRight: Icon;
    export const Filter: Icon;
    export const X: Icon;
    export const ChevronDown: Icon;
    export const ChevronUp: Icon;
    export const Menu: Icon;
    export const Search: Icon;
    export const Instagram: Icon;
    export const Twitter: Icon;
    export const Facebook: Icon;
    export const Mail: Icon;
    export const Phone: Icon;
    export const MapPin: Icon;
    export const Calculator: Icon;
    export const FileText: Icon;
    export const Settings: Icon;
    export const LayoutDashboard: Icon;
    export const Image: Icon;
    export const Plus: Icon;
    export const Trash2: Icon;
    export const Upload: Icon;
    export const Loader2: Icon;
}

declare module 'sonner' {
    export const toast: {
        success: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
        warning: (message: string) => void;
    };
    export const Toaster: React.ComponentType<any>;
}
