
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Information from "./pages/Information";
import Results from "./pages/Results";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import ExpertQA from "./pages/ExpertQA";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/information" element={<Information />} />
          <Route path="/results" element={<Results />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/expert-qa" element={<ExpertQA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
