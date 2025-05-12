
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CRM from "./pages/CRM";
import Services from "./pages/Services";
import BanhoTosa from "./pages/BanhoTosa";
import Hospedagem from "./pages/Hospedagem";
import React, { useEffect, Suspense } from "react";
import { initDB } from "./services/db";

const queryClient = new QueryClient();

const App = () => {
  // Initialize the database when the app starts
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/services" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Services />
            </Suspense>
          } />
          <Route path="/banho-tosa" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <BanhoTosa />
            </Suspense>
          } />
          <Route path="/hospedagem" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Hospedagem />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
