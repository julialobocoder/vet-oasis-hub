import React, { useState } from 'react';
import ClientDialog from '@/components/ClientDialog';
import StaffDialog from '@/components/StaffDialog';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { storeImage, retrieveImage } from '../utils/imageStorage';
import { exportImagesOnSave } from '../utils/export-local-images';
import { ArrowLeft, Search, PlusCircle, Filter, CalendarDays, Users, Activity, Settings, Image, X, CalendarCheck } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Appointment {
  id: number;
  petName: string;
  petType: string;
  ownerName: string;
  service: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface Client {
  id: number;
  petName: string;
  petType: string;
  ownerName: string;
  ownerEmail?: string;
  ownerPhone?: string;
  joinDate: string;
  visits: number;
  lastVisit?: string;
  notes?: string;
}

interface StaffMember {
  id: number;
  name: string;
  role: string;
  schedule: string;
  email?: string;
  phone?: string;
  specialization?: string;
  startDate?: string;
  avatar?: string;
}

const CRM = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date());
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  
  // Initialize the form with React Hook Form
  const appointmentForm = useForm({
    defaultValues: {
      petName: '',
      petType: '',
      ownerName: '',
      service: '',
      time: '',
      notes: ''
    }
  });
  
  // Function to handle appointment form submission
  const onAppointmentFormSubmit = (data: any) => {
    // Format the appointment date
    const formattedDate = appointmentDate ? format(appointmentDate, "dd 'de' MMM", { locale: pt }) : '';
    
    // Verify if service was selected
    if (!data.service) {
      toast({
        title: "Erro no Agendamento",
        description: "Por favor, selecione um serviço para a consulta",
        variant: "destructive"
      });
      return;
    }
    
    // Verify if time was selected
    if (!data.time) {
      toast({
        title: "Erro no Agendamento",
        description: "Por favor, selecione um horário para a consulta",
        variant: "destructive"
      });
      return;
    }
    
    // Check for conflicting appointments
    const conflictingAppointment = appointments.find(
      app => app.date === `${formattedDate}, ${data.time}` && app.status !== "cancelled"
    );
    
    if (conflictingAppointment) {
      toast({
        title: "Horário Indisponível",
        description: `Já existe uma consulta agendada para ${formattedDate} às ${data.time}`,
        variant: "destructive"
      });
      return;
    }
    
    // Create the new appointment
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      petName: data.petName,
      petType: data.petType,
      ownerName: data.ownerName,
      service: data.service,
      date: `${formattedDate}, ${data.time}`,
      status: "pending"
    };
    
    // Add the new appointment to the list
    setAppointments([...appointments, newAppointment]);
    
    // Show success message
    toast({
      title: "Consulta Agendada",
      description: `Consulta para ${data.petName} agendada com sucesso para ${formattedDate} às ${data.time}`,
    });
    
    // Close the dialog
    setShowAppointmentDialog(false);
    
    // Reset the form
    appointmentForm.reset();
  };

  // Landing page settings state
  const [heroTitle, setHeroTitle] = useState("Podemos Oferecer Serviços de Qualidade para Pets");
  const [heroDescription, setHeroDescription] = useState("Oferecemos os melhores cuidados para seus pets com nossos veterinários especialistas e equipe profissional. A saúde e felicidade do seu pet são nossa prioridade.");
  // Removida a imagem padrão do Unsplash
  const [heroImageUrl, setHeroImageUrl] = useState("");  // Inicializa com string vazia para forçar o uso da imagem configurada
  const [aboutTitle1, setAboutTitle1] = useState("Nosso Progresso");
  const [aboutTitle2, setAboutTitle2] = useState("Oferecemos o Melhor Cuidado");
  const [aboutDescription1, setAboutDescription1] = useState("Desde 2014, oferecemos serviços excepcionais de cuidados para pets com foco em qualidade e bem-estar do seu animal. Nossa equipe de profissionais está dedicada a dar aos seus pets o cuidado que eles merecem.");
  const [aboutDescription2, setAboutDescription2] = useState("Entendemos que seus pets são membros da família, e os tratamos com o amor e respeito que merecem. Nossas instalações modernas e equipe experiente garantem o atendimento da mais alta qualidade.");
  
  // Services data for settings
  const [services, setServices] = useState<Service[]>([
    { title: "Banho & Tosa Premium", description: "Serviços de banho e tosa com produtos premium, perfumação especial e hidratação profunda para seu pet em Lauro de Freitas.", color: "orange", index: "01" },
    { title: "Vacinação Completa", description: "Programa completo de vacinação para cães e gatos com vacinas importadas e certificado internacional, disponível em nossa clínica em Lauro de Freitas.", color: "blue", index: "02" },
    { title: "Hospedagem Pet Resort", description: "Hospedagem de luxo com monitoramento 24h, área de lazer, alimentação premium e passeios diários para seu pet se sentir em casa enquanto você viaja.", color: "green", index: "03" },
    { title: "Clínica Veterinária 24h", description: "Atendimento veterinário completo com equipamentos de última geração, laboratório próprio, cirurgias, exames de imagem e pronto-socorro 24h em Lauro de Freitas.", color: "purple", index: "04" },
    { title: "Day Care Pet", description: "Creche diária com atividades recreativas, socialização, treinamento básico e alimentação balanceada para seu pet enquanto você trabalha.", color: "orange", index: "05" },
    { title: "Transporte Pet", description: "Serviço de busca e entrega do seu pet em casa com veículos climatizados e adaptados para o conforto e segurança do seu animal em toda região de Lauro de Freitas.", color: "blue", index: "06" }
  ]);
  
  // Stats data for settings
  const [stats, setStats] = useState<Stat[]>([
    { value: "24/7", label: "Atendimento Veterinário", color: "orange" },
    { value: "4.9", label: "Avaliação no Google", color: "blue" },
    { value: "5000+", label: "Pets Atendidos", color: "green" },
    { value: "12+", label: "Anos em Lauro de Freitas", color: "purple" },
    { value: "8", label: "Veterinários Especialistas", color: "orange" },
    { value: "98%", label: "Satisfação dos Clientes", color: "blue" }
  ]);
  
  // Header customization settings
  const [headerHeight, setHeaderHeight] = useState<number>(80);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [logoWidth, setLogoWidth] = useState<number>(120);
  const [logoHorizontalOffset, setLogoHorizontalOffset] = useState<number>(0);
  
  // Menu items customization
  const [menuItems, setMenuItems] = useState([
    { id: 'home', text: 'Início', link: '/' },
    { id: 'about', text: 'Quem Somos', link: '/about' },
    { id: 'services', text: 'Serviços', link: '/services' },
    { id: 'price', text: 'Valores', link: '/price' },
    { id: 'contact', text: 'Contato', link: '/contact' }
  ]);
  
  // Forms
  const clientForm = useForm({
    defaultValues: {
      petName: '',
      petType: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      notes: '',
      vaccinated: false
    }
  });

  // Estado para o formulu00e1rio de agendamento
  const [appointmentFormData, setAppointmentFormData] = useState({
    petName: '',
    petType: '',
    ownerName: '',
    service: '',
    time: '',
    notes: ''
  });
  
  // Funu00e7u00e3o para atualizar os campos do formulu00e1rio
  const handleAppointmentFormChange = (field: string, value: string) => {
    setAppointmentFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Funu00e7u00e3o para resetar o formulu00e1rio
  const resetAppointmentForm = () => {
    setAppointmentFormData({
      petName: '',
      petType: '',
      ownerName: '',
      service: '',
      time: '',
      notes: ''
    });
    setAppointmentDate(new Date());
  };

  // Efeito para limpar o formulário quando o diálogo é fechado
  useEffect(() => {
    if (!showAppointmentDialog) {
      // Resetar o formulário quando o diálogo é fechado
      resetAppointmentForm();
    }
  }, [showAppointmentDialog]);

  const staffForm = useForm({
    defaultValues: {
      name: '',
      role: '',
      specialization: '',
      email: '',
      phone: '',
      schedule: ''
    }
  });
  
  // Data models
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, petName: "Max", petType: "Golden Retriever", ownerName: "João Silva", service: "Vacinação", date: "Hoje, 10:00", status: "confirmed" },
    { id: 2, petName: "Luna", petType: "Gato Persa", ownerName: "Emily Johnson", service: "Banho", date: "Hoje, 14:30", status: "confirmed" },
    { id: 3, petName: "Rocky", petType: "Bulldog", ownerName: "Miguel Marron", service: "Check-up", date: "Amanhã, 09:15", status: "pending" },
    { id: 4, petName: "Bella", petType: "Gato Siamês", ownerName: "Sara Wilson", service: "Limpeza Dental", date: "Amanhã, 13:00", status: "confirmed" },
    { id: 5, petName: "Charlie", petType: "Labrador", ownerName: "David Miller", service: "Castração", date: "15 Mai, 11:30", status: "pending" },
    { id: 6, petName: "Thor", petType: "Rottweiler", ownerName: "Ana Oliveira", service: "Exame de Sangue", date: "16 Mai, 09:00", status: "confirmed" }
  ]);
  
  const [clients, setClients] = useState<Client[]>([
    { id: 1, petName: "Max", petType: "Golden Retriever", ownerName: "João Silva", ownerEmail: "joao.silva@email.com", ownerPhone: "(11) 98765-4321", joinDate: "Jan 2023", visits: 8, lastVisit: "04/05/2023" },
    { id: 2, petName: "Luna", petType: "Gato Persa", ownerName: "Emily Johnson", ownerEmail: "emily.j@email.com", ownerPhone: "(11) 91234-5678", joinDate: "Mar 2023", visits: 5, lastVisit: "01/05/2023" },
    { id: 3, petName: "Rocky", petType: "Bulldog", ownerName: "Miguel Marron", ownerEmail: "miguel.m@email.com", ownerPhone: "(11) 97890-1234", joinDate: "Fev 2023", visits: 7, lastVisit: "03/05/2023" },
    { id: 4, petName: "Bella", petType: "Gato Siamês", ownerName: "Sara Wilson", ownerEmail: "sara.w@email.com", ownerPhone: "(11) 95678-9012", joinDate: "Abr 2023", visits: 4, lastVisit: "02/05/2023" },
    { id: 5, petName: "Charlie", petType: "Labrador", ownerName: "David Miller", ownerEmail: "david.m@email.com", ownerPhone: "(11) 93456-7890", joinDate: "Dez 2022", visits: 10, lastVisit: "05/05/2023" },
    { id: 6, petName: "Lucy", petType: "Beagle", ownerName: "Jessica Lee", ownerEmail: "jessica.l@email.com", ownerPhone: "(11) 92345-6789", joinDate: "Mai 2023", visits: 3, lastVisit: "03/05/2023" },
    { id: 7, petName: "Cooper", petType: "Maine Coon", ownerName: "Roberto Taylor", ownerEmail: "roberto.t@email.com", ownerPhone: "(11) 94567-8901", joinDate: "Fev 2023", visits: 6, lastVisit: "01/05/2023" },
    { id: 8, petName: "Thor", petType: "Rottweiler", ownerName: "Ana Oliveira", ownerEmail: "ana.o@email.com", ownerPhone: "(11) 99876-5432", joinDate: "Abr 2023", visits: 4, lastVisit: "05/05/2023" }
  ]);
  
  const inventoryItems = [
    { id: 1, name: "Ração para Cães - Premium", category: "Alimentos", stock: 32, status: "In Stock" },
    { id: 2, name: "Areia para Gatos", category: "Suprimentos", stock: 15, status: "Low Stock" },
    { id: 3, name: "Tratamento contra Pulgas", category: "Medicamentos", stock: 28, status: "In Stock" },
    { id: 4, name: "Shampoo para Pets", category: "Higiene", stock: 8, status: "Low Stock" },
    { id: 5, name: "Pacote de Brinquedos para Cães", category: "Brinquedos", stock: 45, status: "In Stock" }
  ];
  
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { id: 1, name: "Dra. Jennifer Wilson", role: "Veterinária", specialization: "Clínica Geral", schedule: "Seg-Sex, 9h-17h", email: "jennifer.w@clinica.com", phone: "(11) 98765-4321", startDate: "Jan 2020", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 2, name: "Marcos Johnson", role: "Tosador", specialization: "Tosagem Profissional", schedule: "Seg-Qua, 10h-18h", email: "marcos.j@clinica.com", phone: "(11) 97654-3210", startDate: "Mar 2021", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 3, name: "Lisa Brown", role: "Recepcionista", specialization: "Atendimento ao Cliente", schedule: "Seg-Sex, 8h-16h", email: "lisa.b@clinica.com", phone: "(11) 96543-2109", startDate: "Jun 2022", avatar: "https://i.pravatar.cc/150?img=9" },
    { id: 4, name: "Dr. Roberto Lee", role: "Veterinário Sênior", specialization: "Cirurgia", schedule: "Ter-Sáb, 9h-17h", email: "roberto.l@clinica.com", phone: "(11) 95432-1098", startDate: "Fev 2018", avatar: "https://i.pravatar.cc/150?img=60" },
    { id: 5, name: "Mariana Santos", role: "Auxiliar Veterinária", specialization: "Cuidados Intensivos", schedule: "Qua-Dom, 8h-16h", email: "mariana.s@clinica.com", phone: "(11) 94321-0987", startDate: "Ago 2022", avatar: "https://i.pravatar.cc/150?img=23" },
    { id: 6, name: "Carlos Oliveira", role: "Adestrador", specialization: "Comportamento Canino", schedule: "Seg, Qua, Sex, 13h-19h", email: "carlos.o@clinica.com", phone: "(11) 93210-9876", startDate: "Out 2021", avatar: "https://i.pravatar.cc/150?img=41" }
  ]);

  // Modal states
  const [showClientDetailDialog, setShowClientDetailDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  const [showStaffDetailDialog, setShowStaffDetailDialog] = useState(false);
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);
  
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);

  // Save settings to localStorage and database
  const saveSettings = async () => {
    try {
      // Store images in the database if they are data URLs
      let heroImageRef = heroImageUrl;
      let logoImageRef = logoUrl;
      
      // Store hero image if it's a data URL
      if (heroImageUrl && heroImageUrl.startsWith('data:')) {
        heroImageRef = await storeImage(heroImageUrl, 'hero');
        
        // Exportar a imagem do herói para o sistema de arquivos (para commit no repositório)
        try {
          const publicDir = '/assets/images';
          const heroPath = `${publicDir}/hero.png`;
          console.log(`Imagem do herói salva para commit no repositório: ${heroPath}`);
          
          // Em um ambiente real, aqui faríamos uma chamada para salvar o arquivo
          // Como estamos no navegador, isso será feito pelo script export-images.js
        } catch (exportError) {
          console.error('Erro ao exportar imagem do herói:', exportError);
        }
      }
      
      // Store logo image if it's a data URL
      if (logoUrl && logoUrl.startsWith('data:')) {
        logoImageRef = await storeImage(logoUrl, 'logo');
        
        // Exportar a logo para o sistema de arquivos (para commit no repositório)
        try {
          const publicDir = '/assets/images';
          const logoPath = `${publicDir}/logo.png`;
          console.log(`Logo salva para commit no repositório: ${logoPath}`);
          
          // Em um ambiente real, aqui faríamos uma chamada para salvar o arquivo
          // Como estamos no navegador, isso será feito pelo script export-images.js
        } catch (exportError) {
          console.error('Erro ao exportar logo:', exportError);
        }
      }
      
      // Create settings object with image references
      const landingPageSettings = {
        heroTitle,
        heroDescription,
        heroImageUrl: heroImageRef,
        aboutTitle1,
        aboutTitle2,
        aboutDescription1,
        aboutDescription2,
        services,
        stats,
        // Header customization settings
        headerHeight,
        logoUrl: logoImageRef,
        logoWidth,
        logoHorizontalOffset,
        menuItems
      };
      
      // Save to localStorage
      localStorage.setItem('landingPageSettings', JSON.stringify(landingPageSettings));
      
      // Exportar as imagens para o sistema de arquivos
      await exportImagesOnSave();
      
      toast({
        title: "Configurações Salvas",
        description: "As imagens e configurações foram salvas com sucesso no banco de dados",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar as configurações",
        variant: "destructive"
      });
    }
  };
  
  // Load settings from localStorage and database
  useEffect(() => {
    const loadSettings = async () => {
      console.log('Carregando configurações...');
      
      // Verificar se há imagens exportadas no localStorage
      const exportedImagesStr = localStorage.getItem('exportedImages');
      let exportedImages = {};
      if (exportedImagesStr) {
        try {
          exportedImages = JSON.parse(exportedImagesStr);
          console.log('Imagens exportadas encontradas no localStorage:', Object.keys(exportedImages));
        } catch (error) {
          console.error('Erro ao analisar imagens exportadas:', error);
        }
      }
      
      const savedSettings = localStorage.getItem('landingPageSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setHeroTitle(parsedSettings.heroTitle || heroTitle);
          setHeroDescription(parsedSettings.heroDescription || heroDescription);
          
          // Handle hero image - check if it's a database reference
          if (parsedSettings.heroImageUrl) {
            console.log('Carregando imagem do herói de:', parsedSettings.heroImageUrl);
            
            if (parsedSettings.heroImageUrl.startsWith('db-image://')) {
              // Load from database
              const imageData = await retrieveImage(parsedSettings.heroImageUrl);
              if (imageData) {
                console.log('Imagem do herói carregada com sucesso do IndexedDB');
                setHeroImageUrl(imageData);
              } else if (exportedImages['hero.png']) {
                // Tentar usar a imagem do localStorage se disponível
                console.log('Usando imagem do herói do localStorage');
                setHeroImageUrl(exportedImages['hero.png']);
              } else {
                // Tentar carregar do sistema de arquivos
                const timestamp = Date.now();
                const heroPath = `/assets/images/hero.png?t=${timestamp}`;
                console.log('Tentando carregar imagem do herói do sistema de arquivos:', heroPath);
                setHeroImageUrl(heroPath);
              }
            } else {
              setHeroImageUrl(parsedSettings.heroImageUrl);
            }
          }
          
          setAboutTitle1(parsedSettings.aboutTitle1 || aboutTitle1);
          setAboutTitle2(parsedSettings.aboutTitle2 || aboutTitle2);
          setAboutDescription1(parsedSettings.aboutDescription1 || aboutDescription1);
          setAboutDescription2(parsedSettings.aboutDescription2 || aboutDescription2);
          setServices(parsedSettings.services || services);
          setStats(parsedSettings.stats || stats);
          
          // Load header customization settings
          if (parsedSettings.headerHeight) setHeaderHeight(parsedSettings.headerHeight);
          
          // Handle logo image - check if it's a database reference
          if (parsedSettings.logoUrl) {
            console.log('Carregando imagem do logo de:', parsedSettings.logoUrl);
            
            if (parsedSettings.logoUrl.startsWith('db-image://')) {
              // Load from database
              const logoData = await retrieveImage(parsedSettings.logoUrl);
              if (logoData) {
                console.log('Imagem do logo carregada com sucesso do IndexedDB');
                setLogoUrl(logoData);
              } else if (exportedImages['logo.png']) {
                // Tentar usar a imagem do localStorage se disponível
                console.log('Usando imagem do logo do localStorage');
                setLogoUrl(exportedImages['logo.png']);
              } else {
                // Tentar carregar do sistema de arquivos
                const timestamp = Date.now();
                const logoPath = `/assets/images/logo.png?t=${timestamp}`;
                console.log('Tentando carregar imagem do logo do sistema de arquivos:', logoPath);
                setLogoUrl(logoPath);
              }
            } else {
              setLogoUrl(parsedSettings.logoUrl);
            }
          }
          
          if (parsedSettings.logoWidth) setLogoWidth(parsedSettings.logoWidth);
          if (parsedSettings.logoHorizontalOffset) setLogoHorizontalOffset(parsedSettings.logoHorizontalOffset);
          if (parsedSettings.menuItems && Array.isArray(parsedSettings.menuItems)) {
            setMenuItems(parsedSettings.menuItems);
          }
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
    };
    
    loadSettings();
  }, []);

  const handleUpdateService = (index: number, field: keyof Service, value: string) => {
    const updatedServices = [...services];
    if (field === 'color' && (value === 'orange' || value === 'blue' || value === 'green' || value === 'purple')) {
      updatedServices[index] = { ...updatedServices[index], [field]: value };
    } else if (field !== 'color') {
      updatedServices[index] = { ...updatedServices[index], [field]: value };
    }
    setServices(updatedServices);
  };

  const handleUpdateStat = (index: number, field: keyof Stat, value: string) => {
    const updatedStats = [...stats];
    if (field === 'color' && (value === 'orange' || value === 'blue' || value === 'green' || value === 'purple')) {
      updatedStats[index] = { ...updatedStats[index], [field]: value };
    } else if (field !== 'color') {
      updatedStats[index] = { ...updatedStats[index], [field]: value };
    }
    setStats(updatedStats);
  };
  
  // Function to update menu items
  const handleUpdateMenuItem = (index: number, field: 'text' | 'link', value: string) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index] = { ...updatedMenuItems[index], [field]: value };
    setMenuItems(updatedMenuItems);
  };
  
  // Client handling functions
  
  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetailDialog(true);
  };
  
  // Staff handling functions
  const handleAddStaffMember = (data: any) => {
    const newStaffMember: StaffMember = {
      id: staffMembers.length + 1,
      name: data.name,
      role: data.role,
      specialization: data.specialization,
      email: data.email,
      phone: data.phone,
      schedule: data.schedule,
      startDate: format(new Date(), 'MMM yyyy', { locale: pt }),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setStaffMembers([...staffMembers, newStaffMember]);
    setShowAddStaffDialog(false);
    staffForm.reset();
    
    toast({
      title: "Membro da Equipe Adicionado",
      description: `${data.name} foi adicionado à equipe`,
    });
  };
  
  const handleViewStaffMember = (staffMember: StaffMember) => {
    setSelectedStaffMember(staffMember);
    setShowStaffDetailDialog(true);
  };
  
  // Appointment handling functions
  const handleScheduleAppointment = (data: typeof appointmentFormData) => {
    // Verificar se a data foi selecionada
    if (!appointmentDate) {
      toast({
        title: "Erro no Agendamento",
        description: "Por favor, selecione uma data para a consulta",
        variant: "destructive"
      });
      return;
    }
    
    // Verificar se o horário foi selecionado
    if (!data.time) {
      toast({
        title: "Erro no Agendamento",
        description: "Por favor, selecione um horário para a consulta",
        variant: "destructive"
      });
      return;
    }
    
    // Verificar se o serviço foi selecionado
    if (!data.service) {
      toast({
        title: "Erro no Agendamento",
        description: "Por favor, selecione um serviço para a consulta",
        variant: "destructive"
      });
      return;
    }
    
    // Formatar a data para exibição
    const formattedDate = format(appointmentDate, "dd 'de' MMM", { locale: pt });
      
    // Verificar se já existe uma consulta no mesmo horário
    const conflictingAppointment = appointments.find(
      app => app.date === `${formattedDate}, ${data.time}` && app.status !== "cancelled"
    );
    
    if (conflictingAppointment) {
      toast({
        title: "Horário Indisponível",
        description: `Já existe uma consulta agendada para ${formattedDate} às ${data.time}`,
        variant: "destructive"
      });
      return;
    }
    
    // Criar a nova consulta
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      petName: data.petName,
      petType: data.petType,
      ownerName: data.ownerName,
      service: data.service,
      date: `${formattedDate}, ${data.time}`,
      status: "pending"
    };
    
    // Adicionar a nova consulta à lista
    setAppointments([...appointments, newAppointment]);
    
    // Verificar se o cliente já existe e atualizar o número de visitas
    const existingClient = clients.find(
      client => client.petName.toLowerCase() === data.petName.toLowerCase() && 
               client.ownerName.toLowerCase() === data.ownerName.toLowerCase()
    );
    
    if (existingClient) {
      // Atualizar o cliente existente
      const updatedClients = clients.map(client => {
        if (client.id === existingClient.id) {
          return {
            ...client,
            visits: client.visits + 1,
            lastVisit: format(new Date(), 'dd/MM/yyyy')
          };
        }
        return client;
      });
      
      setClients(updatedClients);
    } else {
      // Se o cliente não existir, perguntar se deseja cadastrá-lo
      toast({
        title: "Novo Cliente",
        description: `${data.petName} não está cadastrado. Deseja adicionar aos clientes?`,
        action: (
          <Button 
            onClick={() => {
              // Adicionar novo cliente
              const newClient: Client = {
                id: clients.length + 1,
                petName: data.petName,
                petType: data.petType,
                ownerName: data.ownerName,
                joinDate: format(new Date(), 'MMM yyyy', { locale: pt }),
                visits: 1,
                lastVisit: format(new Date(), 'dd/MM/yyyy')
              };
              
              setClients([...clients, newClient]);
              
              toast({
                title: "Cliente Adicionado",
                description: `${data.petName} foi adicionado à lista de clientes`
              });
            }}
            variant="outline"
            size="sm"
          >
            Adicionar
          </Button>
        )
      });
    }
    
    // Fechar o diálogo e resetar o formulário
    setShowAppointmentDialog(false);
    resetAppointmentForm();
    
    // Mostrar mensagem de sucesso
    toast({
      title: "Consulta Agendada",
      description: `Consulta para ${data.petName} foi agendada com sucesso para ${formattedDate} às ${data.time}`,
    });
  };
  
  const handleConfirmAppointment = (id: number) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: "confirmed" as const } : appointment
    );
    setAppointments(updatedAppointments);
    
    toast({
      title: "Consulta Confirmada",
      description: "A consulta foi confirmada com sucesso",
    });
  };
  
  const handleCancelAppointment = (id: number) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: "cancelled" as const } : appointment
    );
    setAppointments(updatedAppointments);
    
    toast({
      title: "Consulta Cancelada",
      description: "A consulta foi cancelada",
    });
  };

  // Filtered data
  const filteredClients = clients.filter(client => 
    client.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.petType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAppointments = appointments.filter(appointment => 
    appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-pet-cream">
      <div className="container px-4 mx-auto">
        <Navbar />
        
        <div className="py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-pet-dark">Gerenciamento de Serviços para Pets</h1>
          </div>
          
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="dashboard">
              <TabsList className="mb-4">
                <TabsTrigger value="dashboard" className="flex gap-2">
                  <Activity className="h-4 w-4" />
                  Painel
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex gap-2">
                  <CalendarCheck className="h-4 w-4" />
                  Consultas
                </TabsTrigger>
                <TabsTrigger value="clients" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  Clientes
                </TabsTrigger>
                <TabsTrigger value="inventory" className="flex gap-2">
                  <Settings className="h-4 w-4" />
                  Inventário
                </TabsTrigger>
                <TabsTrigger value="staff" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  Equipe
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Consultas Recentes</h3>
                    <div className="space-y-4">
                      <div className="pb-3 border-b">
                        <p className="font-medium">Max (Golden Retriever)</p>
                        <p className="text-sm text-gray-600">Vacinação - Hoje, 10:00</p>
                      </div>
                      <div className="pb-3 border-b">
                        <p className="font-medium">Luna (Gato Persa)</p>
                        <p className="text-sm text-gray-600">Banho - Hoje, 14:30</p>
                      </div>
                      <div className="pb-3 border-b">
                        <p className="font-medium">Rocky (Bulldog)</p>
                        <p className="text-sm text-gray-600">Check-up - Amanhã, 09:15</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Clientes</h3>
                    <div className="space-y-4">
                      <div className="pb-3 border-b">
                        <p className="font-medium">Total de Clientes: {clients.length}</p>
                        <p className="text-sm text-gray-600">Cães: {clients.filter(c => c.petType.toLowerCase().includes("ca") || c.petType.toLowerCase().includes("dog")).length}, 
                          Gatos: {clients.filter(c => c.petType.toLowerCase().includes("gato") || c.petType.toLowerCase().includes("cat")).length}, 
                          Outros: {clients.filter(c => !c.petType.toLowerCase().includes("ca") && !c.petType.toLowerCase().includes("dog") && !c.petType.toLowerCase().includes("gato") && !c.petType.toLowerCase().includes("cat")).length}</p>
                      </div>
                      <div className="pb-3 border-b">
                        <p className="font-medium">Novos neste mês: {clients.filter(c => c.joinDate.includes("Mai")).length}</p>
                      </div>
                      <Button 
                        className="bg-pet-orange hover:bg-pet-orange/90"
                        onClick={() => setActiveTab("clients")}
                      >
                        Ver Todos os Clientes
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Ações Rápidas</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-pet-blue hover:bg-pet-blue/90"
                        onClick={() => {
                          setActiveTab("appointments");
                          setShowAppointmentDialog(true);
                        }}
                      >
                        Nova Consulta
                      </Button>
                      <Button 
                        className="w-full bg-pet-green hover:bg-pet-green/90"
                        onClick={() => {
                          setActiveTab("clients");
                          setShowAddClientDialog(true);
                        }}
                      >
                        Adicionar Cliente
                      </Button>
                      <Button 
                        className="w-full bg-pet-purple hover:bg-pet-purple/90"
                        onClick={() => setActiveTab("inventory")}
                      >
                        Gerenciar Inventário
                      </Button>
                      <Button 
                        className="w-full bg-pet-orange hover:bg-pet-orange/90"
                        onClick={() => setActiveTab("staff")}
                      >
                        Agenda da Equipe
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <CardTitle>Consultas</CardTitle>
                      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input 
                            placeholder="Buscar consultas..." 
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex gap-1">
                            <Filter className="h-4 w-4" />
                            Filtrar
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex gap-1 bg-pet-blue hover:bg-pet-blue/90"
                            onClick={() => {
                              // Resetar o formulário antes de abrir o diálogo
                              resetAppointmentForm();
                              
                              // Abrir o diálogo de agendamento
                              setShowAppointmentDialog(true);
                            }}
                          >
                            <PlusCircle className="h-4 w-4" />
                            Nova Consulta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pet</TableHead>
                          <TableHead>Dono</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Data & Hora</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {appointment.petName}
                              <div className="text-xs text-gray-500">{appointment.petType}</div>
                            </TableCell>
                            <TableCell>{appointment.ownerName}</TableCell>
                            <TableCell>{appointment.service}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>
                              <Badge className={
                                appointment.status === 'confirmed' 
                                  ? 'bg-green-500' 
                                  : appointment.status === 'cancelled'
                                  ? 'bg-red-500'
                                  : 'bg-yellow-500'
                              }>
                                {appointment.status === 'confirmed' 
                                  ? 'Confirmada' 
                                  : appointment.status === 'cancelled'
                                  ? 'Cancelada'
                                  : 'Pendente'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {appointment.status === 'pending' && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-green-600 border-green-600 hover:bg-green-50"
                                      onClick={() => handleConfirmAppointment(appointment.id)}
                                    >
                                      Confirmar
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                      onClick={() => handleCancelAppointment(appointment.id)}
                                    >
                                      Cancelar
                                    </Button>
                                  </>
                                )}
                                {appointment.status === 'confirmed' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                  >
                                    Cancelar
                                  </Button>
                                )}
                                {appointment.status === 'cancelled' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                    onClick={() => handleConfirmAppointment(appointment.id)}
                                  >
                                    Reagendar
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Nova Consulta Dialog */}
                <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
                  <DialogContent className="sm:max-w-[500px]" aria-describedby="appointment-dialog-description">
                    <DialogHeader>
                      <DialogTitle className="text-center">Agendar Nova Consulta</DialogTitle>
                      <DialogDescription id="appointment-dialog-description" className="text-center">
                        Preencha os dados abaixo para agendar uma nova consulta
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleScheduleAppointment(appointmentFormData);
                    }}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="petName" className="text-sm font-medium">Nome do Pet</label>
                            <Input
                              id="petName"
                              name="petName"
                              value={appointmentFormData.petName}
                              onChange={(e) => handleAppointmentFormChange(e.target.name, e.target.value)}
                              placeholder="Nome do pet"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="petType" className="text-sm font-medium">Tipo do Pet</label>
                            <Input
                              id="petType"
                              name="petType"
                              value={appointmentFormData.petType}
                              onChange={(e) => handleAppointmentFormChange(e.target.name, e.target.value)}
                              placeholder="Ex: Gato, Cachorro"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="ownerName" className="text-sm font-medium">Nome do Proprietário</label>
                          <Input
                            id="ownerName"
                            name="ownerName"
                            value={appointmentFormData.ownerName}
                            onChange={(e) => handleAppointmentFormChange(e.target.name, e.target.value)}
                            placeholder="Nome completo do proprietário"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="service" className="text-sm font-medium">Serviço</label>
                          <Select
                            value={appointmentFormData.service}
                            onValueChange={(value) => handleAppointmentFormChange("service", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Vacinação">Vacinação</SelectItem>
                              <SelectItem value="Banho e Tosa">Banho e Tosa</SelectItem>
                              <SelectItem value="Consulta Clínica">Consulta Clínica</SelectItem>
                              <SelectItem value="Exames">Exames</SelectItem>
                              <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                              <SelectItem value="Castração">Castração</SelectItem>
                              <SelectItem value="Higiene Dental">Higiene Dental</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-medium">Data</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                  {appointmentDate ? (
                                    format(appointmentDate, "dd 'de' MMMM, yyyy", { locale: pt })
                                  ) : (
                                    "Selecione uma data"
                                  )}
                                  <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={appointmentDate}
                                  onSelect={setAppointmentDate}
                                  locale={pt}
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="time" className="text-sm font-medium">Horário</label>
                            <Select
                              value={appointmentFormData.time}
                              onValueChange={(value) => handleAppointmentFormChange("time", value)}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o horário" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">09:00</SelectItem>
                                <SelectItem value="10:00">10:00</SelectItem>
                                <SelectItem value="11:00">11:00</SelectItem>
                                <SelectItem value="13:00">13:00</SelectItem>
                                <SelectItem value="14:00">14:00</SelectItem>
                                <SelectItem value="15:00">15:00</SelectItem>
                                <SelectItem value="16:00">16:00</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="notes" className="text-sm font-medium">Observações</label>
                          <Textarea
                            id="notes"
                            name="notes"
                            value={appointmentFormData.notes}
                            onChange={(e) => handleAppointmentFormChange(e.target.name, e.target.value)}
                            placeholder="Observações adicionais"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          type="button" 
                          onClick={() => setShowAppointmentDialog(false)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" className="bg-pet-green hover:bg-pet-green/90">
                          Agendar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <CardTitle>Clientes</CardTitle>
                      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input 
                            placeholder="Buscar clientes..." 
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button 
                          className="bg-pet-green hover:bg-pet-green/90"
                          onClick={() => setShowAddClientDialog(true)}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Adicionar Cliente
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Pet</TableHead>
                          <TableHead>Tipo/Raça</TableHead>
                          <TableHead>Dono</TableHead>
                          <TableHead>Cliente Desde</TableHead>
                          <TableHead>Total de Visitas</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.petName}</TableCell>
                            <TableCell>{client.petType}</TableCell>
                            <TableCell>{client.ownerName}</TableCell>
                            <TableCell>{client.joinDate}</TableCell>
                            <TableCell>{client.visits}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewClient(client)}
                                >
                                  Ver
                                </Button>
                                <Button variant="outline" size="sm">Editar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Usando o novo componente ClientDialog para cadastro de clientes */}
                <ClientDialog 
                  open={showAddClientDialog}
                  onOpenChange={setShowAddClientDialog}
                  onAddClient={(newClient) => {
                    // Criar novo cliente com dados adicionais
                    const client: Client = {
                      id: clients.length + 1,
                      ...newClient,
                      joinDate: format(new Date(), 'MMM yyyy', { locale: pt }),
                      visits: 0,
                      lastVisit: undefined
                    };
                    
                    // Adicionar o cliente à lista
                    setClients([...clients, client]);
                  }}
                  toast={toast}
                />

                {/* Detalhes do Cliente Dialog */}
                <Dialog open={showClientDetailDialog} onOpenChange={setShowClientDetailDialog}>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <span className="text-lg">Detalhes do Cliente</span>
                        <Button 
                          variant="ghost" 
                          className="ml-auto h-8 w-8 p-0" 
                          onClick={() => setShowClientDetailDialog(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </DialogTitle>
                    </DialogHeader>
                    
                    {selectedClient && (
                      <div className="mt-2">
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h3 className="font-bold text-xl mb-2">{selectedClient.petName}</h3>
                          <p className="text-gray-500">{selectedClient.petType}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Proprietário</p>
                            <p className="font-medium">{selectedClient.ownerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Cliente Desde</p>
                            <p className="font-medium">{selectedClient.joinDate}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedClient.ownerEmail || "—"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Telefone</p>
                            <p className="font-medium">{selectedClient.ownerPhone || "—"}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Total de Visitas</p>
                          <p className="font-medium">{selectedClient.visits}</p>
                        </div>
                        
                        {selectedClient.lastVisit && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-500">Última Visita</p>
                            <p className="font-medium">{selectedClient.lastVisit}</p>
                          </div>
                        )}
                        
                        {selectedClient.notes && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-500">Observações</p>
                            <p className="bg-gray-50 p-2 rounded">{selectedClient.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-end gap-3 mt-6">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setShowClientDetailDialog(false);
                              setShowAppointmentDialog(true);
                              appointmentForm.setValue("petName", selectedClient.petName);
                              appointmentForm.setValue("petType", selectedClient.petType);
                              appointmentForm.setValue("ownerName", selectedClient.ownerName);
                            }}
                          >
                            Agendar Consulta
                          </Button>
                          <Button className="bg-pet-blue hover:bg-pet-blue/90">
                            Editar Cliente
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="inventory">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Gerenciamento de Inventário</CardTitle>
                      <Button className="bg-pet-purple hover:bg-pet-purple/90">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Adicionar Item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Item</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Em Estoque</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inventoryItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>
                              <Badge className={item.status === 'In Stock' ? 'bg-green-500' : 'bg-yellow-500'}>
                                {item.status === 'In Stock' ? 'Em Estoque' : 'Estoque Baixo'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Atualizar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="staff">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <CardTitle>Gerenciamento de Equipe</CardTitle>
                      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input 
                            placeholder="Buscar membros..." 
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button 
                          className="bg-pet-orange hover:bg-pet-orange/90"
                          onClick={() => setShowAddStaffDialog(true)}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Adicionar Membro
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredStaff.map((staff) => (
                        <Card key={staff.id} className="overflow-hidden">
                          <div className="p-4 flex flex-col items-center bg-gray-50">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                              <img 
                                src={staff.avatar} 
                                alt={`${staff.name}`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name)}&background=random`;
                                }}
                              />
                            </div>
                            <h3 className="font-medium text-lg">{staff.name}</h3>
                            <p className="text-gray-500">{staff.role}</p>
                          </div>
                          <CardContent className="pt-4">
                            <div className="grid gap-2">
                              {staff.specialization && (
                                <div>
                                  <p className="text-xs text-gray-500">Especialização</p>
                                  <p className="text-sm">{staff.specialization}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-xs text-gray-500">Horário</p>
                                <p className="text-sm">{staff.schedule}</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewStaffMember(staff)}
                              >
                                Detalhes
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-pet-orange/10 text-pet-orange hover:bg-pet-orange/20"
                              >
                                Horários
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Usando o novo componente StaffDialog para cadastro de funcionários */}
                <StaffDialog 
                  open={showAddStaffDialog}
                  onOpenChange={setShowAddStaffDialog}
                  onAddStaffMember={(newStaffMember) => {
                    // Criar novo membro da equipe com dados adicionais
                    const staffMember: StaffMember = {
                      id: staffMembers.length + 1,
                      ...newStaffMember,
                      startDate: format(new Date(), 'MMM yyyy', { locale: pt }),
                      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
                    };
                    
                    // Adicionar o membro à equipe
                    setStaffMembers([...staffMembers, staffMember]);
                  }}
                  toast={toast}
                />

                {/* Detalhes do Membro da Equipe Dialog */}
                <Dialog open={showStaffDetailDialog} onOpenChange={setShowStaffDetailDialog}>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <span className="text-lg">Detalhes do Profissional</span>
                        <Button 
                          variant="ghost" 
                          className="ml-auto h-8 w-8 p-0" 
                          onClick={() => setShowStaffDetailDialog(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </DialogTitle>
                    </DialogHeader>
                    
                    {selectedStaffMember && (
                      <div className="mt-2">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-20 h-20 rounded-full overflow-hidden">
                            <img 
                              src={selectedStaffMember.avatar} 
                              alt={selectedStaffMember.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedStaffMember.name)}&background=random`;
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{selectedStaffMember.name}</h3>
                            <p className="text-gray-500">{selectedStaffMember.role}</p>
                            {selectedStaffMember.specialization && (
                              <p className="text-sm text-gray-500">{selectedStaffMember.specialization}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedStaffMember.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Telefone</p>
                            <p className="font-medium">{selectedStaffMember.phone || "—"}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Horário de Trabalho</p>
                            <p className="font-medium">{selectedStaffMember.schedule}</p>
                          </div>
                          {selectedStaffMember.startDate && (
                            <div>
                              <p className="text-sm text-gray-500">Na Equipe Desde</p>
                              <p className="font-medium">{selectedStaffMember.startDate}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 mt-6">
                          <h4 className="font-medium mb-2">Esta Semana</h4>
                          <div className="grid grid-cols-7 gap-1">
                            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => {
                              // Determina se o dia atual está na programação do funcionário
                              const isWorkDay = selectedStaffMember.schedule.toLowerCase().includes(day.toLowerCase());
                              return (
                                <div 
                                  key={index} 
                                  className={`text-center p-2 rounded ${isWorkDay ? 'bg-pet-orange/20 text-pet-orange' : 'bg-gray-100'}`}
                                >
                                  <div className="text-xs mb-1">{day}</div>
                                  <div className="text-sm">{isWorkDay ? "✓" : "—"}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                          <Button className="bg-pet-orange hover:bg-pet-orange/90">
                            Definir Horários
                          </Button>
                          <Button className="bg-pet-blue hover:bg-pet-blue/90">
                            Editar Perfil
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações da Página Principal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Hero Section Settings */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Seção de Destaque</h3>
                        <Separator className="mb-4" />
                        <div className="grid gap-4">
                          <div>
                            <label className="text-sm font-medium">Título</label>
                            <Input 
                              value={heroTitle} 
                              onChange={(e) => setHeroTitle(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Descrição</label>
                            <Textarea 
                              value={heroDescription} 
                              onChange={(e) => setHeroDescription(e.target.value)}
                              className="mt-1"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">URL da Imagem</label>
                            <div className="flex gap-2 mt-1">
                              <Input 
                                value={heroImageUrl} 
                                onChange={(e) => setHeroImageUrl(e.target.value)}
                                className="flex-1"
                              />
                              <Button variant="outline" className="flex items-center gap-2" onClick={() => document.getElementById('imageUpload')?.click()}>
                                <Image className="h-4 w-4" />
                                Selecionar Imagem
                              </Button>
                              <input
                                id="imageUpload"
                                type="file"
                                accept="image/jpeg,image/png"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = async (event) => {
                                      if (event.target?.result) {
                                        const imageUrl = event.target.result.toString();
                                        
                                        // Atualizar o estado local
                                        setHeroImageUrl(imageUrl);
                                        
                                        try {
                                          // Salvar a imagem no IndexedDB
                                          const heroImageRef = await storeImage(imageUrl, 'hero');
                                          
                                          // Salvar no localStorage
                                          const currentSettings = localStorage.getItem('landingPageSettings');
                                          const parsedSettings = currentSettings ? JSON.parse(currentSettings) : {};
                                          
                                          // Atualizar as configurações com a nova URL da imagem
                                          const updatedSettings = {
                                            ...parsedSettings,
                                            heroImageUrl: heroImageRef // Usar a referência do IndexedDB
                                          };
                                          
                                          // Salvar as configurações atualizadas
                                          localStorage.setItem('landingPageSettings', JSON.stringify(updatedSettings));
                                          
                                          // Salvar a imagem diretamente no localStorage para exportação
                                          try {
                                            const exportedImages = JSON.parse(localStorage.getItem('exportedImages') || '{}');
                                            exportedImages['hero.png'] = imageUrl;
                                            localStorage.setItem('exportedImages', JSON.stringify(exportedImages));
                                            
                                            // Criar um objeto localStorage para exportação
                                            const localStorageData = {
                                              landingPageSettings: JSON.stringify(updatedSettings)
                                            };
                                            localStorage.setItem('localStorageExport', JSON.stringify(localStorageData));
                                            
                                            console.log('Imagem do herói salva para exportação');
                                            
                                            // Chamar a função de exportação de imagens
                                            await exportImagesOnSave();
                                          } catch (exportError) {
                                            console.error('Erro ao preparar imagem do herói para exportação:', exportError);
                                          }
                                          
                                          // Mostrar toast de sucesso
                                          toast({
                                            title: "Imagem Atualizada",
                                            description: "A imagem foi atualizada e salva com sucesso"
                                          });
                                          
                                          // Executar o script de exportação de imagens
                                          console.log('Executando script de exportação de imagens...');
                                          
                                          // Exportar as imagens para o sistema de arquivos
                                          // Em um ambiente real, isso seria feito pelo script export-images.mjs
                                        } catch (error) {
                                          console.error('Erro ao salvar imagem:', error);
                                          toast({
                                            title: "Erro ao Salvar",
                                            description: "Ocorreu um erro ao salvar a imagem",
                                            variant: "destructive"
                                          });
                                        }
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </div>
                            <div className="mt-2 bg-gray-100 p-2 rounded text-center">
                              <img 
                                src={heroImageUrl} 
                                alt="Preview" 
                                className="max-h-32 rounded mx-auto"
                                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150?text=Imagem+Inválida"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Services Section Settings */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Seção de Serviços</h3>
                        <Separator className="mb-4" />
                        <div className="space-y-4">
                          {services.map((service, idx) => (
                            <Card key={idx} className="bg-gray-50">
                              <CardContent className="pt-6">
                                <div className="grid gap-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full bg-pet-${service.color} text-xs flex items-center justify-center text-white`}>
                                      {service.index}
                                    </div>
                                    <Input 
                                      value={service.title} 
                                      onChange={(e) => handleUpdateService(idx, 'title', e.target.value)}
                                      className="font-medium"
                                      placeholder="Título do serviço"
                                    />
                                  </div>
                                  <Textarea 
                                    value={service.description} 
                                    onChange={(e) => handleUpdateService(idx, 'description', e.target.value)}
                                    placeholder="Descrição do serviço"
                                    rows={2}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Stats Section Settings */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Seção de Estatísticas</h3>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {stats.map((stat, idx) => (
                            <Card key={idx} className="bg-gray-50">
                              <CardContent className="pt-6">
                                <div className="grid gap-3">
                                  <Input 
                                    value={stat.value} 
                                    onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                                    className="font-bold text-center text-lg"
                                  />
                                  <Input 
                                    value={stat.label} 
                                    onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                                    className="text-center text-sm"
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* About Section Settings */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Seção Sobre Nós</h3>
                        <Separator className="mb-4" />
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium">Título Principal</label>
                              <Input 
                                value={aboutTitle1} 
                                onChange={(e) => setAboutTitle1(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Subtítulo</label>
                              <Input 
                                value={aboutTitle2} 
                                onChange={(e) => setAboutTitle2(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Descrição</label>
                              <Textarea 
                                value={aboutDescription1} 
                                onChange={(e) => setAboutDescription1(e.target.value)}
                                className="mt-1"
                                rows={4}
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium">Título Secundário</label>
                              <Input 
                                value={aboutTitle2} 
                                onChange={(e) => setAboutTitle2(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Descrição</label>
                              <Textarea 
                                value={aboutDescription2} 
                                onChange={(e) => setAboutDescription2(e.target.value)}
                                className="mt-1"
                                rows={4}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Header Customization Settings */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Cabeçalho</h3>
                        <Separator className="mb-4" />
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Altura do Cabeçalho</label>
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="range"
                                min="60"
                                max="120"
                                value={headerHeight}
                                onChange={(e) => setHeaderHeight(parseInt(e.target.value))}
                                className="flex-1"
                              />
                              <span className="text-sm text-gray-500 w-10 text-right">{headerHeight}px</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Logo</label>
                            <div className="flex gap-2 mt-1">
                              <Input 
                                value={logoUrl} 
                                onChange={(e) => setLogoUrl(e.target.value)}
                                className="flex-1"
                                placeholder="URL da imagem do logo"
                              />
                              <Button variant="outline" className="flex items-center gap-2" onClick={() => document.getElementById('logoUpload')?.click()}>
                                <Image className="h-4 w-4" />
                                Selecionar Logo
                              </Button>
                              <input
                                id="logoUpload"
                                type="file"
                                accept="image/jpeg,image/png"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = async (event) => {
                                      if (event.target?.result) {
                                        const imageUrl = event.target.result.toString();
                                        
                                        // Atualizar o estado local
                                        setLogoUrl(imageUrl);
                                        
                                        try {
                                          // Salvar a imagem no IndexedDB
                                          const logoImageRef = await storeImage(imageUrl, 'logo');
                                          
                                          // Salvar no localStorage
                                          const currentSettings = localStorage.getItem('landingPageSettings');
                                          const parsedSettings = currentSettings ? JSON.parse(currentSettings) : {};
                                          
                                          // Atualizar as configurações com a nova URL da logo
                                          const updatedSettings = {
                                            ...parsedSettings,
                                            logoUrl: logoImageRef // Usar a referência do IndexedDB
                                          };
                                          
                                          // Salvar as configurações atualizadas
                                          localStorage.setItem('landingPageSettings', JSON.stringify(updatedSettings));
                                          
                                          // Salvar a imagem diretamente no localStorage para exportação
                                          try {
                                            const exportedImages = JSON.parse(localStorage.getItem('exportedImages') || '{}');
                                            exportedImages['logo.png'] = imageUrl;
                                            localStorage.setItem('exportedImages', JSON.stringify(exportedImages));
                                            
                                            // Criar um objeto localStorage para exportação
                                            const localStorageData = {
                                              landingPageSettings: JSON.stringify(updatedSettings)
                                            };
                                            localStorage.setItem('localStorageExport', JSON.stringify(localStorageData));
                                            
                                            console.log('Logo salva para exportação');
                                            
                                            // Chamar a função de exportação de imagens
                                            await exportImagesOnSave();
                                          } catch (exportError) {
                                            console.error('Erro ao preparar logo para exportação:', exportError);
                                          }
                                          
                                          // Mostrar toast de sucesso
                                          toast({
                                            title: "Logo Atualizado",
                                            description: "O logo foi atualizado e salvo com sucesso"
                                          });
                                          
                                          // Executar o script de exportação de imagens
                                          console.log('Executando script de exportação de imagens...');
                                          
                                          // Exportar as imagens para o sistema de arquivos
                                          // Em um ambiente real, isso seria feito pelo script export-images.mjs
                                        } catch (error) {
                                          console.error('Erro ao salvar logo:', error);
                                          toast({
                                            title: "Erro ao Salvar",
                                            description: "Ocorreu um erro ao salvar o logo",
                                            variant: "destructive"
                                          });
                                        }
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </div>
                            
                            {logoUrl && (
                              <div className="mt-2 bg-gray-100 p-2 rounded text-center">
                                <img 
                                  src={logoUrl} 
                                  alt="Logo Preview" 
                                  className="max-h-16 rounded mx-auto"
                                  onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150?text=Logo+Inválido"}
                                />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Largura do Logo</label>
                              <div className="flex items-center gap-2 mt-1">
                                <input
                                  type="range"
                                  min="80"
                                  max="200"
                                  value={logoWidth}
                                  onChange={(e) => setLogoWidth(parseInt(e.target.value))}
                                  className="flex-1"
                                />
                                <span className="text-sm text-gray-500 w-10 text-right">{logoWidth}px</span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Deslocamento Horizontal</label>
                              <div className="flex items-center gap-2 mt-1">
                                <input
                                  type="range"
                                  min="-50"
                                  max="50"
                                  value={logoHorizontalOffset}
                                  onChange={(e) => setLogoHorizontalOffset(parseInt(e.target.value))}
                                  className="flex-1"
                                />
                                <span className="text-sm text-gray-500 w-10 text-right">{logoHorizontalOffset}px</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Menu de Navegação</label>
                            <div className="space-y-2 mt-2">
                              {menuItems.map((item, idx) => (
                                <Card key={idx} className="bg-gray-50">
                                  <CardContent className="pt-4 pb-4">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="text-xs text-gray-500">Texto do Menu</label>
                                        <Input 
                                          value={item.text} 
                                          onChange={(e) => handleUpdateMenuItem(idx, 'text', e.target.value)}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-xs text-gray-500">Link</label>
                                        <Input 
                                          value={item.link} 
                                          onChange={(e) => handleUpdateMenuItem(idx, 'link', e.target.value)}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={saveSettings} 
                        className="bg-pet-green hover:bg-pet-green/90 w-full"
                      >
                        Salvar Configurações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Diálogo de Agendamento de Consulta */}
      <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <span className="text-lg">Agendar Nova Consulta</span>
              <Button 
                variant="ghost" 
                className="ml-auto h-8 w-8 p-0" 
                onClick={() => setShowAppointmentDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <Form {...appointmentForm}>
            <form onSubmit={appointmentForm.handleSubmit(onAppointmentFormSubmit)} className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={appointmentForm.control}
                  name="petName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Pet</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: Max"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={appointmentForm.control}
                  name="petType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Pet</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: Cachorro, Gato, etc."
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={appointmentForm.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Dono</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Nome completo do dono"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={appointmentForm.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serviço</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Consulta Geral">Consulta Geral</SelectItem>
                        <SelectItem value="Vacinação">Vacinação</SelectItem>
                        <SelectItem value="Banho e Tosa">Banho e Tosa</SelectItem>
                        <SelectItem value="Exames">Exames</SelectItem>
                        <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                        <SelectItem value="Castração">Castração</SelectItem>
                        <SelectItem value="Limpeza Dental">Limpeza Dental</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        type="button"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {appointmentDate ? format(appointmentDate, "PPP", { locale: pt }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={appointmentDate}
                        onSelect={setAppointmentDate}
                        initialFocus
                        locale={pt}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <FormField
                  control={appointmentForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={appointmentForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Observações adicionais sobre a consulta"
                        rows={3}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowAppointmentDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-pet-blue hover:bg-pet-blue/90">
                  Agendar Consulta
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRM;
