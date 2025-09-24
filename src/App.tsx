import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";

import Index from "./pages/Index";
import OrderPage from "./pages/OrderPage";
import ThankYouPage from "./pages/ThankYouPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import CustomQuotePage from "./pages/CustomQuotePage";
import CulturalHeritagePage from "./pages/CulturalHeritagePage";
import NutritionalValuePage from "./pages/NutritionalValuePage";
import InnovationTraditionPage from "./pages/InnovationTraditionPage";
import AdminPage from "./pages/AdminPage";
import BakeryGalleryPage from "./pages/BakeryGalleryPage";
import CatalogPage from "./pages/CatalogPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/order" element={<OrderPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/custom-quote" element={<CustomQuotePage />} />
          <Route path="/cultural-heritage" element={<CulturalHeritagePage />} />
          <Route path="/nutritional-value" element={<NutritionalValuePage />} />
          <Route path="/innovation-tradition" element={<InnovationTraditionPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bakery-gallery" element={<BakeryGalleryPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
