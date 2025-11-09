import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import Offers from "./pages/Offers";
import Payouts from "./pages/Payouts";
import Campaigns from "./pages/Campaigns";
import Trust from "./pages/Trust";
import OpsQueue from "./pages/OpsQueue";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/ops/queue" element={<OpsQueue />} />
          <Route path="/curso" element={<Course />} />
          <Route path="/curso/:slug" element={<Lesson />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
