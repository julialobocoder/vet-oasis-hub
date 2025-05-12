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
import About from "./pages/About";
import Price from "./pages/Price";
import Contact from "./pages/Contact";
import React, { useEffect, Suspense } from "react";
import { initDB } from "./services/db";
import { checkImageExists } from './utils/exportImages';
import { loadImage } from './services/db';

const queryClient = new QueryClient();

const App = () => {
  // Initialize the database when the app starts
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB();
        console.log('Database initialized successfully');
        
        // Verifica se as imagens existem no sistema de arquivos
        const logoExists = await checkImageExists('logo.png');
        const heroExists = await checkImageExists('hero.png');
        
        console.log(`Logo existe no sistema de arquivos: ${logoExists}`);
        console.log(`Hero existe no sistema de arquivos: ${heroExists}`);
        
        // Se as imagens existirem no sistema de arquivos, atualiza as configurações
        if (logoExists || heroExists) {
          // Carrega as configurações atuais
          const savedSettings = localStorage.getItem('landingPageSettings');
          if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            
            // Atualiza as URLs das imagens para apontar para o sistema de arquivos
            if (logoExists) {
              parsedSettings.logoUrl = `/assets/images/logo.png?t=${Date.now()}`;
            }
            
            if (heroExists) {
              parsedSettings.heroImageUrl = `/assets/images/hero.png?t=${Date.now()}`;
            }
            
            // Salva as configurações atualizadas
            localStorage.setItem('landingPageSettings', JSON.stringify(parsedSettings));
            console.log('Configurações atualizadas para usar imagens do sistema de arquivos');
          }
        }
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
          <Route path="/about" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <About />
            </Suspense>
          } />
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
          <Route path="/price" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Price />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Contact />
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
