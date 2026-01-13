import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Compare from "@/pages/Compare";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Repair from "./pages/Repair";
import Calculator from "./pages/Calculator";
import FAQ from "./pages/FAQ";
import OrderSuccess from "./pages/OrderSuccess";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductEditor from "./pages/admin/ProductEditor";
import PageEditor from "./pages/admin/PageEditor";

import Hosting from "./pages/Hosting";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Imprint from "./pages/Imprint";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collections/:category" component={Collection} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/pages/contact" component={Contact} />
      <Route path="/pages/repair-warranty-service" component={Repair} />
      <Route path="/pages/mining-profit-calculator" component={Calculator} />
      <Route path="/pages/faqs" component={FAQ} />
      <Route path="/pages/hosting" component={Hosting} />
      <Route path="/pages/about" component={About} />
      <Route path="/pages/shipping" component={Shipping} />
      <Route path="/pages/terms" component={Terms} />
      <Route path="/pages/privacy" component={Privacy} />
      <Route path="/pages/imprint" component={Imprint} />
      <Route path="/blogs/news" component={Blog} />
      <Route path="/blogs/news/:slug" component={BlogPost} />
      <Route path="/compare" component={Compare} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-success/:orderId" component={OrderSuccess} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/products/new" component={ProductEditor} />
      <Route path="/admin/products/:id/edit" component={ProductEditor} />
      <Route path="/admin/pages/new" component={PageEditor} />
      <Route path="/admin/pages/:id/edit" component={PageEditor} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
