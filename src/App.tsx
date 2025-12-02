import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DomainRedirect from "@/components/DomainRedirect";
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
import ResetPassword from "./pages/ResetPassword";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RefundPolicy from "./pages/RefundPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DomainRedirect>
          <Routes>
            {/* Marketing routes (cliptoclick.com) */}
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            
            {/* App routes (cliptoclick.app) */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/ops/queue" element={<OpsQueue />} />
            <Route path="/curso" element={<Course />} />
            <Route path="/curso/:slug" element={<Lesson />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DomainRedirect>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
