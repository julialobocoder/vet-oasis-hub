
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import StatsCard from '@/components/StatsCard';
import { Play } from 'lucide-react';
import { retrieveImage } from '@/utils/imageStorage';
import VideoDialog from '@/components/VideoDialog';

// Definindo tipos para garantir que as cores sejam apenas as permitidas
type ServiceColor = "orange" | "blue" | "green" | "purple";

interface Service {
  title: string;
  description: string;
  color: ServiceColor;
  index: string;
}

interface Stat {
  value: string;
  label: string;
  color: ServiceColor;
}

const Index = () => {
  // Default values
  const defaultHeroTitle = "Podemos Oferecer Serviços de Qualidade para Pets";
  const defaultHeroDescription = "Oferecemos os melhores cuidados para seus pets com nossos veterinários especialistas e equipe profissional. A saúde e felicidade do seu pet são nossa prioridade.";
  // Imagem padrão removida - agora usamos apenas a imagem configurada
  const defaultHeroImageUrl = "";  // String vazia para forçar o uso da imagem configurada
  const defaultAboutTitle1 = "Nosso Progresso";
  const defaultAboutSubtitle1 = "Oferecemos o Melhor Cuidado";
  const defaultAboutDescription1 = "Desde 2014, oferecemos serviços excepcionais de cuidados para pets com foco em qualidade e bem-estar do seu animal. Nossa equipe de profissionais está dedicada a dar aos seus pets o cuidado que eles merecem.";
  const defaultAboutTitle2 = "Dê ao seu pet o";
  const defaultAboutSubtitle2 = "melhor serviço de cuidados desde 2014";
  const defaultAboutDescription2 = "Entendemos que seus pets são membros da família, e os tratamos com o amor e respeito que merecem. Nossas instalações modernas e equipe experiente garantem o atendimento da mais alta qualidade.";
  
  const defaultServices: Service[] = [
    { title: "Creche para Pets", description: "Serviços profissionais de creche para seus pets enquanto você está ocupado com trabalho ou outros compromissos.", color: "orange", index: "01" },
    { title: "Vacinação", description: "Serviços completos de vacinação para manter seus pets saudáveis e protegidos de várias doenças.", color: "blue", index: "02" },
    { title: "Hospedagem para Pets", description: "Instalações confortáveis para seus pets quando você precisa viajar ou ficar longe de casa.", color: "green", index: "03" },
    { title: "Serviço Veterinário", description: "Serviços veterinários completos incluindo check-ups, tratamentos, cirurgias e atendimento de emergência.", color: "purple", index: "04" }
  ];
  
  const defaultStats: Stat[] = [
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
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  
  // Load settings from localStorage
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = localStorage.getItem('landingPageSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          
          setHeroTitle(parsedSettings.heroTitle || defaultHeroTitle);
          setHeroDescription(parsedSettings.heroDescription || defaultHeroDescription);
          
          // Carregar a URL do vídeo
          if (parsedSettings.videoUrl) {
            setVideoUrl(parsedSettings.videoUrl);
          }
          
          // Carregar a imagem do herói
          if (parsedSettings.heroImageUrl) {
            console.log('Tentando carregar imagem:', parsedSettings.heroImageUrl);
            
            // Usar a função retrieveImage para processar a URL da imagem
            const processedImageUrl = await retrieveImage(parsedSettings.heroImageUrl);
            if (processedImageUrl) {
              console.log('Imagem processada com sucesso:', processedImageUrl);
              setHeroImageUrl(processedImageUrl);
            } else {
              console.error('Falha ao processar imagem, usando imagem padrão');
              // Usar imagem padrão do sistema de arquivos
              const timestamp = Date.now();
              setHeroImageUrl(`/assets/images/hero.png?t=${timestamp}`);
            }
          } else {
            // Sem URL, usar default
            setHeroImageUrl(defaultHeroImageUrl);
          }
          
          setAboutTitle1(parsedSettings.aboutTitle1 || defaultAboutTitle1);
          setAboutSubtitle1(parsedSettings.aboutTitle2 || defaultAboutSubtitle1);
          setAboutDescription1(parsedSettings.aboutDescription1 || defaultAboutDescription1);
          setAboutTitle2(parsedSettings.aboutTitle2 || defaultAboutTitle2);
          setAboutSubtitle2(parsedSettings.aboutSubtitle2 || defaultAboutSubtitle2);
          setAboutDescription2(parsedSettings.aboutDescription2 || defaultAboutDescription2);
        
          if (parsedSettings.services && Array.isArray(parsedSettings.services)) {
            // Garantir que as cores sejam válidas
            const safeServices: Service[] = parsedSettings.services.map((service: any) => {
              let safeColor: ServiceColor = "orange";
              if (service.color === "orange" || service.color === "blue" || 
                  service.color === "green" || service.color === "purple") {
                safeColor = service.color as ServiceColor;
              }
              return {
                ...service,
                color: safeColor
              };
            });
            setServices(safeServices);
          }
          
          if (parsedSettings.stats && Array.isArray(parsedSettings.stats)) {
            // Garantir que as cores sejam válidas
            const safeStats: Stat[] = parsedSettings.stats.map((stat: any) => {
              let safeColor: ServiceColor = "orange";
              if (stat.color === "orange" || stat.color === "blue" || 
                  stat.color === "green" || stat.color === "purple") {
                safeColor = stat.color as ServiceColor;
              }
              return {
                ...stat,
                color: safeColor
              };
            });
            setStats(safeStats);
          }
        } catch (error) {
          console.error("Error parsing settings:", error);
        }
      }
    };
    
    loadSettings();
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
              <Button 
                size="lg" 
                className="bg-pet-orange hover:bg-pet-orange/90 rounded-full px-8"
                onClick={() => {
                  // Abrir WhatsApp com o número especificado
                  window.open(`https://wa.me/5571994164434`, '_blank');
                }}
              >
                Agendar Agora
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={() => setShowVideoDialog(true)}
              >
                <div className="bg-pet-orange text-white rounded-full p-2">
                  <Play size={16} />
                </div>
                <span>Assistir Vídeo</span>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-pet-orange rounded-full w-[80%] aspect-square absolute top-[10%] left-[10%] -z-10"></div>
            <div className="relative w-[80%] aspect-square mx-auto">
              {heroImageUrl ? (
                <img 
                  key={`hero-image-${Date.now()}`} // Forçar re-render da imagem
                  src={heroImageUrl} 
                  alt="Pessoa com pet" 
                  className="rounded-full w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Erro ao carregar imagem:', heroImageUrl);
                    
                    // Tentar carregar a imagem do sistema de arquivos diretamente
                    const timestamp = Date.now();
                    const publicImageUrl = `/assets/images/hero.png?t=${timestamp}`;
                    console.log('Tentando carregar do sistema de arquivos:', publicImageUrl);
                    
                    // Verificar se a imagem já está usando o caminho do sistema de arquivos
                    if (heroImageUrl.includes('/assets/images/hero.png')) {
                      console.log('Já está usando imagem do sistema de arquivos, mostrando placeholder');
                      // Já está tentando usar a imagem do sistema de arquivos, mostrar placeholder
                      e.currentTarget.style.display = 'none';
                      
                      // Criar e adicionar o placeholder
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        container.classList.add('bg-pet-orange/10', 'rounded-full', 'flex', 'items-center', 'justify-center');
                        const placeholderSpan = document.createElement('span');
                        placeholderSpan.className = 'text-pet-orange text-xl font-bold';
                        placeholderSpan.innerText = 'Selecione uma imagem na aba CRM';
                        container.appendChild(placeholderSpan);
                      }
                    } else {
                      // Tentar carregar do sistema de arquivos
                      e.currentTarget.src = publicImageUrl;
                      
                      // Se falhar novamente, mostrar placeholder
                      e.currentTarget.onerror = () => {
                        console.log('Falha ao carregar do sistema de arquivos');
                        e.currentTarget.style.display = 'none';
                        
                        // Criar e adicionar o placeholder
                        const container = e.currentTarget.parentElement;
                        if (container) {
                          container.classList.add('bg-pet-orange/10', 'rounded-full', 'flex', 'items-center', 'justify-center');
                          const placeholderSpan = document.createElement('span');
                          placeholderSpan.className = 'text-pet-orange text-xl font-bold';
                          placeholderSpan.innerText = 'Selecione uma imagem na aba CRM';
                          container.appendChild(placeholderSpan);
                        }
                      };
                    }
                  }}
                />
              ) : (
                <div className="bg-pet-orange/10 rounded-full w-full h-full flex items-center justify-center">
                  <span className="text-pet-orange text-xl font-bold">Selecione uma imagem na aba CRM</span>
                </div>
              )}
            </div>
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
      
      {/* Video Dialog */}
      <VideoDialog 
        open={showVideoDialog} 
        onOpenChange={setShowVideoDialog} 
        videoUrl={videoUrl} 
      />
    </div>
  );
};

export default Index;
