 import { lazy, Suspense } from "react";
 import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
 import NotFound from "./pages/NotFound";
 
 // Lazy load project pages
 const AutomationProjects = lazy(() => import("./pages/AutomationProjects"));
 const ChatAgents = lazy(() => import("./pages/ChatAgents"));
 const VoiceAgents = lazy(() => import("./pages/VoiceAgents"));
 const VibecodedProjects = lazy(() => import("./pages/VibecodedProjects"));
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <>
    <CustomCursor />
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
         <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/automation-projects" element={<AutomationProjects />} />
           <Route path="/chat-agents" element={<ChatAgents />} />
           <Route path="/voice-agents" element={<VoiceAgents />} />
           <Route path="/vibecoded-projects" element={<VibecodedProjects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
         </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </>
);

export default App;
