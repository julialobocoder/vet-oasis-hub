
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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

  // Landing page settings state
  const [heroTitle, setHeroTitle] = useState("Podemos Oferecer Serviços de Qualidade para Pets");
  const [heroDescription, setHeroDescription] = useState("Oferecemos os melhores cuidados para seus pets com nossos veterinários especialistas e equipe profissional. A saúde e felicidade do seu pet são nossa prioridade.");
  const [heroImageUrl, setHeroImageUrl] = useState("https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500");
  const [aboutTitle1, setAboutTitle1] = useState("Nosso Progresso");
  const [aboutTitle2, setAboutTitle2] = useState("Oferecemos o Melhor Cuidado");
  const [aboutDescription1, setAboutDescription1] = useState("Desde 2014, oferecemos serviços excepcionais de cuidados para pets com foco em qualidade e bem-estar do seu animal. Nossa equipe de profissionais está dedicada a dar aos seus pets o cuidado que eles merecem.");
  const [aboutDescription2, setAboutDescription2] = useState("Entendemos que seus pets são membros da família, e os tratamos com o amor e respeito que merecem. Nossas instalações modernas e equipe experiente garantem o atendimento da mais alta qualidade.");
  
  // Services data for settings
  const [services, setServices] = useState<Service[]>([
    { title: "Creche para Pets", description: "Serviços profissionais de creche para seus pets enquanto você está ocupado com trabalho ou outros compromissos.", color: "orange", index: "01" },
    { title: "Vacinação", description: "Serviços completos de vacinação para manter seus pets saudáveis e protegidos de várias doenças.", color: "blue", index: "02" },
    { title: "Hospedagem para Pets", description: "Instalações confortáveis para seus pets quando você precisa viajar ou ficar longe de casa.", color: "green", index: "03" },
    { title: "Serviço Veterinário", description: "Serviços veterinários completos incluindo check-ups, tratamentos, cirurgias e atendimento de emergência.", color: "purple", index: "04" }
  ]);
  
  // Stats data for settings
  const [stats, setStats] = useState<Stat[]>([
    { value: "24/7", label: "Atendimento ao Cliente", color: "orange" },
    { value: "4.9", label: "Avaliação", color: "blue" },
    { value: "30k", label: "Clientes", color: "green" },
    { value: "7+", label: "Anos de Experiência", color: "purple" }
  ]);
  
  // Header customization settings
  const [headerHeight, setHeaderHeight] = useState<number>(80);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [logoWidth, setLogoWidth] = useState<number>(120);
  const [logoHorizontalOffset, setLogoHorizontalOffset] = useState<number>(0);
  
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

  const appointmentForm = useForm({
    defaultValues: {
      petName: '',
      petType: '',
      ownerName: '',
      service: '',
      date: new Date(),
      time: '',
      notes: ''
    }
  });

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

  // Save settings to localStorage
  const saveSettings = () => {
    const landingPageSettings = {
      heroTitle,
      heroDescription,
      heroImageUrl,
      aboutTitle1,
      aboutTitle2,
      aboutDescription1,
      aboutDescription2,
      services,
      stats,
      // Header customization settings
      headerHeight,
      logoUrl,
      logoWidth,
      logoHorizontalOffset
    };
    
    localStorage.setItem('landingPageSettings', JSON.stringify(landingPageSettings));
    
    toast({
      title: "Configurações Salvas",
      description: "As alterações foram salvas com sucesso",
    });
  };
  
  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('landingPageSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setHeroTitle(parsedSettings.heroTitle || heroTitle);
      setHeroDescription(parsedSettings.heroDescription || heroDescription);
      setHeroImageUrl(parsedSettings.heroImageUrl || heroImageUrl);
      setAboutTitle1(parsedSettings.aboutTitle1 || aboutTitle1);
      setAboutTitle2(parsedSettings.aboutTitle2 || aboutTitle2);
      setAboutDescription1(parsedSettings.aboutDescription1 || aboutDescription1);
      setAboutDescription2(parsedSettings.aboutDescription2 || aboutDescription2);
      setServices(parsedSettings.services || services);
      setStats(parsedSettings.stats || stats);
      
      // Load header customization settings
      if (parsedSettings.headerHeight) setHeaderHeight(parsedSettings.headerHeight);
      if (parsedSettings.logoUrl) setLogoUrl(parsedSettings.logoUrl);
      if (parsedSettings.logoWidth) setLogoWidth(parsedSettings.logoWidth);
      if (parsedSettings.logoHorizontalOffset) setLogoHorizontalOffset(parsedSettings.logoHorizontalOffset);
    }
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
  
  // Client handling functions
  const handleAddClient = (data: any) => {
    const newClient: Client = {
      id: clients.length + 1,
      petName: data.petName,
      petType: data.petType,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhone: data.ownerPhone,
      joinDate: format(new Date(), 'MMM yyyy', { locale: pt }),
      visits: 0,
      notes: data.notes
    };
    
    setClients([...clients, newClient]);
    setShowAddClientDialog(false);
    clientForm.reset();
    
    toast({
      title: "Cliente Adicionado",
      description: `${data.petName} foi adicionado à lista de clientes`,
    });
  };
  
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
  const handleScheduleAppointment = (data: any) => {
    const formattedDate = appointmentDate 
      ? format(appointmentDate, "dd 'de' MMM", { locale: pt }) 
      : "Data não selecionada";
      
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      petName: data.petName,
      petType: data.petType,
      ownerName: data.ownerName,
      service: data.service,
      date: `${formattedDate}, ${data.time}`,
      status: "pending"
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentDialog(false);
    appointmentForm.reset();
    
    toast({
      title: "Consulta Agendada",
      description: `Consulta para ${data.petName} foi agendada com sucesso`,
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
                            onClick={() => setShowAppointmentDialog(true)}
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
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">Agendar Nova Consulta</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={appointmentForm.handleSubmit(handleScheduleAppointment)}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <FormLabel>Nome do Pet</FormLabel>
                            <Input 
                              {...appointmentForm.register("petName")} 
                              placeholder="Nome do pet" 
                              required 
                            />
                          </div>
                          <div className="space-y-1">
                            <FormLabel>Tipo do Pet</FormLabel>
                            <Input 
                              {...appointmentForm.register("petType")} 
                              placeholder="Ex: Gato, Cachorro" 
                              required 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <FormLabel>Nome do Proprietário</FormLabel>
                          <Input 
                            {...appointmentForm.register("ownerName")} 
                            placeholder="Nome completo do proprietário" 
                            required 
                          />
                        </div>
                        <div className="space-y-1">
                          <FormLabel>Serviço</FormLabel>
                          <Select onValueChange={value => appointmentForm.setValue("service", value)} required>
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
                            <FormLabel>Data</FormLabel>
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
                            <FormLabel>Horário</FormLabel>
                            <Select onValueChange={value => appointmentForm.setValue("time", value)} required>
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
                          <FormLabel>Observações</FormLabel>
                          <Textarea 
                            {...appointmentForm.register("notes")} 
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
                        <Button type="submit" className="bg-pet-blue hover:bg-pet-blue/90">
                          Agendar Consulta
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

                {/* Adicionar Cliente Dialog */}
                <Dialog open={showAddClientDialog} onOpenChange={setShowAddClientDialog}>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">Adicionar Novo Cliente</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={clientForm.handleSubmit(handleAddClient)}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <FormLabel>Nome do Pet</FormLabel>
                            <Input 
                              {...clientForm.register("petName")} 
                              placeholder="Nome do pet" 
                              required 
                            />
                          </div>
                          <div className="space-y-1">
                            <FormLabel>Tipo do Pet</FormLabel>
                            <Input 
                              {...clientForm.register("petType")} 
                              placeholder="Ex: Gato Siamês, Labrador" 
                              required 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <FormLabel>Nome do Proprietário</FormLabel>
                          <Input 
                            {...clientForm.register("ownerName")} 
                            placeholder="Nome completo do proprietário" 
                            required 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <FormLabel>Email</FormLabel>
                            <Input 
                              {...clientForm.register("ownerEmail")} 
                              type="email" 
                              placeholder="Email do proprietário" 
                            />
                          </div>
                          <div className="space-y-1">
                            <FormLabel>Telefone</FormLabel>
                            <Input 
                              {...clientForm.register("ownerPhone")} 
                              placeholder="(00) 00000-0000" 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <FormLabel>Observações</FormLabel>
                          <Textarea 
                            {...clientForm.register("notes")} 
                            placeholder="Observações adicionais sobre o pet"
                            rows={3}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="vaccinated" 
                            {...clientForm.register("vaccinated")} 
                          />
                          <label htmlFor="vaccinated" className="text-sm font-medium">
                            Pet vacinado
                          </label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          type="button" 
                          onClick={() => setShowAddClientDialog(false)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" className="bg-pet-green hover:bg-pet-green/90">
                          Adicionar Cliente
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

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

                {/* Adicionar Membro da Equipe Dialog */}
                <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">Adicionar Membro da Equipe</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={staffForm.handleSubmit(handleAddStaffMember)}>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-1">
                          <FormLabel>Nome Completo</FormLabel>
                          <Input 
                            {...staffForm.register("name")} 
                            placeholder="Nome completo" 
                            required 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <FormLabel>Cargo</FormLabel>
                            <Select onValueChange={value => staffForm.setValue("role", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o cargo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Veterinário">Veterinário</SelectItem>
                                <SelectItem value="Veterinária">Veterinária</SelectItem>
                                <SelectItem value="Auxiliar Veterinário">Auxiliar Veterinário</SelectItem>
                                <SelectItem value="Tosador">Tosador</SelectItem>
                                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                                <SelectItem value="Gerente">Gerente</SelectItem>
                                <SelectItem value="Adestrador">Adestrador</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <FormLabel>Especialização</FormLabel>
                            <Input 
                              {...staffForm.register("specialization")} 
                              placeholder="Ex: Cirurgia, Clínica Geral" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <FormLabel>Email</FormLabel>
                            <Input 
                              {...staffForm.register("email")} 
                              type="email" 
                              placeholder="Email profissional" 
                              required 
                            />
                          </div>
                          <div className="space-y-1">
                            <FormLabel>Telefone</FormLabel>
                            <Input 
                              {...staffForm.register("phone")} 
                              placeholder="(00) 00000-0000" 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <FormLabel>Horário de Trabalho</FormLabel>
                          <Input 
                            {...staffForm.register("schedule")} 
                            placeholder="Ex: Seg-Sex, 9h-17h"
                            required 
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          type="button" 
                          onClick={() => setShowAddStaffDialog(false)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" className="bg-pet-orange hover:bg-pet-orange/90">
                          Adicionar Membro
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

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
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      if (event.target?.result) {
                                        const imageUrl = event.target.result.toString();
                                        setHeroImageUrl(imageUrl);
                                        
                                        // Save to landingPageSettings localStorage
                                        const currentSettings = localStorage.getItem('landingPageSettings');
                                        const parsedSettings = currentSettings ? JSON.parse(currentSettings) : {};
                                        
                                        // Update the settings with the new image URL
                                        const updatedSettings = {
                                          ...parsedSettings,
                                          heroImageUrl: imageUrl
                                        };
                                        
                                        // Save the updated settings
                                        localStorage.setItem('landingPageSettings', JSON.stringify(updatedSettings));
                                        
                                        // Show success toast
                                        toast({
                                          title: "Imagem Atualizada",
                                          description: "A imagem foi atualizada e salva com sucesso"
                                        });
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
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      if (event.target?.result) {
                                        const imageUrl = event.target.result.toString();
                                        setLogoUrl(imageUrl);
                                        
                                        // Save to landingPageSettings localStorage
                                        const currentSettings = localStorage.getItem('landingPageSettings');
                                        const parsedSettings = currentSettings ? JSON.parse(currentSettings) : {};
                                        
                                        // Update the settings with the new logo URL
                                        const updatedSettings = {
                                          ...parsedSettings,
                                          logoUrl: imageUrl
                                        };
                                        
                                        // Save the updated settings
                                        localStorage.setItem('landingPageSettings', JSON.stringify(updatedSettings));
                                        
                                        // Show success toast
                                        toast({
                                          title: "Logo Atualizado",
                                          description: "O logo foi atualizado e salvo com sucesso"
                                        });
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
    </div>
  );
};

export default CRM;
