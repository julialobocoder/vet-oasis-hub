
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import StatsCard from '@/components/StatsCard';
import { Play } from 'lucide-react';

const Index = () => {
  // Default values
  const defaultHeroTitle = "Podemos Oferecer Serviços de Qualidade para Pets";
  const defaultHeroDescription = "Oferecemos os melhores cuidados para seus pets com nossos veterinários especialistas e equipe profissional. A saúde e felicidade do seu pet são nossa prioridade.";
  const defaultHeroImageUrl = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500";
  const defaultAboutTitle1 = "Nosso Progresso";
  const defaultAboutSubtitle1 = "Oferecemos o Melhor Cuidado";
  const defaultAboutDescription1 = "Desde 2014, oferecemos serviços excepcionais de cuidados para pets com foco em qualidade e bem-estar do seu animal. Nossa equipe de profissionais está dedicada a dar aos seus pets o cuidado que eles merecem.";
  const defaultAboutTitle2 = "Dê ao seu pet o";
  const defaultAboutSubtitle2 = "melhor serviço de cuidados desde 2014";
  const defaultAboutDescription2 = "Entendemos que seus pets são membros da família, e os tratamos com o amor e respeito que merecem. Nossas instalações modernas e equipe experiente garantem o atendimento da mais alta qualidade.";
  
  const defaultServices = [
    { title: "Creche para Pets", description: "Serviços profissionais de creche para seus pets enquanto você está ocupado com trabalho ou outros compromissos.", color: "orange", index: "01" },
    { title: "Vacinação", description: "Serviços completos de vacinação para manter seus pets saudáveis e protegidos de várias doenças.", color: "blue", index: "02" },
    { title: "Hospedagem para Pets", description: "Instalações confortáveis para seus pets quando você precisa viajar ou ficar longe de casa.", color: "green", index: "03" },
    { title: "Serviço Veterinário", description: "Serviços veterinários completos incluindo check-ups, tratamentos, cirurgias e atendimento de emergência.", color: "purple", index: "04" }
  ];
  
  const defaultStats = [
    { value: "24/7", label: "Atendimento ao Cliente", color: "orange" },
    { value: "4.9", label: "Avaliação", color: "blue" },
    { value: "30k", label: "Clientes", color: "green" },
    { value: "7+", label: "Anos de Experiência", color: "purple" }
  ];
  
  // State to store content
  const [heroTitle, setHeroTitle] = useState(defaultHeroTitle);
  const [heroDescription, setHeroDescription] = useState(defaultHeroDescription);
  const [heroImageUrl, setHeroImageUrl] = useState(defaultHeroImageUrl);
  const [aboutTitle1, setAboutTitle1] = useState(defaultAboutTitle1);
  const [aboutSubtitle1, setAboutSubtitle1] = useState(defaultAboutSubtitle1);
  const [aboutDescription1, setAboutDescription1] = useState(defaultAboutDescription1);
  const [aboutTitle2, setAboutTitle2] = useState(defaultAboutTitle2);
  const [aboutSubtitle2, setAboutSubtitle2] = useState(defaultAboutSubtitle2);
  const [aboutDescription2, setAboutDescription2] = useState(defaultAboutDescription2);
  const [services, setServices] = useState(defaultServices);
  const [stats, setStats] = useState(defaultStats);
  
  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('landingPageSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        
        setHeroTitle(parsedSettings.heroTitle || defaultHeroTitle);
        setHeroDescription(parsedSettings.heroDescription || defaultHeroDescription);
        setHeroImageUrl(parsedSettings.heroImageUrl || defaultHeroImageUrl);
        setAboutTitle1(parsedSettings.aboutTitle1 || defaultAboutTitle1);
        setAboutSubtitle1(parsedSettings.aboutTitle2 || defaultAboutSubtitle1);
        setAboutDescription1(parsedSettings.aboutDescription1 || defaultAboutDescription1);
        setAboutTitle2(parsedSettings.aboutTitle2 || defaultAboutTitle2);
        setAboutSubtitle2(parsedSettings.aboutSubtitle2 || defaultAboutSubtitle2);
        setAboutDescription2(parsedSettings.aboutDescription2 || defaultAboutDescription2);
        
        if (parsedSettings.services && Array.isArray(parsedSettings.services)) {
          setServices(parsedSettings.services);
        }
        
        if (parsedSettings.stats && Array.isArray(parsedSettings.stats)) {
          setStats(parsedSettings.stats);
        }
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-pet-cream">
      <div className="container px-4 mx-auto">
        {/* Navigation */}
        <Navbar />
        
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 py-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-pet-dark text-5xl font-bold leading-tight mb-4">
              {heroTitle.split(' ').map((word, i) => 
                i % 3 === 0 ? <span key={i}>{word}<br /></span> : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="text-slate-600 mb-8 max-w-md">
              {heroDescription}
            </p>
            <div className="flex gap-4 items-center">
              <Button size="lg" className="bg-pet-orange hover:bg-pet-orange/90 rounded-full px-8">
                Agendar Agora
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="bg-pet-orange text-white rounded-full p-2">
                  <Play size={16} />
                </div>
                <span>Assistir Vídeo</span>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-pet-orange rounded-full w-[80%] aspect-square absolute top-[10%] left-[10%] -z-10"></div>
            <img 
              src={heroImageUrl} 
              alt="Pessoa com pet" 
              className="rounded-full w-[80%] mx-auto"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500";
              }}
            />
          </div>
        </div>
        
        {/* Services Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                color={service.color}
                index={service.index}
              />
            ))}
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatsCard 
                key={index}
                value={stat.value}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </div>
        </div>
        
        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-8 py-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">{aboutTitle1}</h2>
            <h3 className="text-2xl font-bold mb-6">{aboutSubtitle1}</h3>
            <p className="text-slate-600 mb-8">
              {aboutDescription1}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{aboutTitle2}</h2>
            <h3 className="text-2xl font-bold mb-6">{aboutSubtitle2}</h3>
            <p className="text-slate-600 mb-8">
              {aboutDescription2}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-pet-orange border-opacity-20 rounded-xl p-4">
                <div className="text-pet-orange text-2xl font-bold">3000+</div>
                <div className="text-sm text-slate-500">Clientes Satisfeitos</div>
              </div>
              <div className="border border-pet-blue border-opacity-20 rounded-xl p-4">
                <div className="text-pet-blue text-2xl font-bold">15+</div>
                <div className="text-sm text-slate-500">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="text-center text-slate-500 text-sm">
            © 2023 PETISS. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
