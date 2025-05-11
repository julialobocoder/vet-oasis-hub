
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, PlusCircle, Filter, CalendarDays, Users, Activity, Settings, Image, Type } from 'lucide-react';
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

const CRM = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Landing page settings state
  const [heroTitle, setHeroTitle] = useState("Podemos Oferecer Serviços de Qualidade para Pets");
  const [heroDescription, setHeroDescription] = useState("Oferecemos os melhores cuidados para seus pets com nossos veterinários especialistas e equipe profissional. A saúde e felicidade do seu pet são nossa prioridade.");
  const [heroImageUrl, setHeroImageUrl] = useState("https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500");
  const [aboutTitle1, setAboutTitle1] = useState("Nosso Progresso");
  const [aboutTitle2, setAboutTitle2] = useState("Oferecemos o Melhor Cuidado");
  const [aboutDescription1, setAboutDescription1] = useState("Desde 2014, oferecemos serviços excepcionais de cuidados para pets com foco em qualidade e bem-estar do seu animal. Nossa equipe de profissionais está dedicada a dar aos seus pets o cuidado que eles merecem.");
  const [aboutDescription2, setAboutDescription2] = useState("Entendemos que seus pets são membros da família, e os tratamos com o amor e respeito que merecem. Nossas instalações modernas e equipe experiente garantem o atendimento da mais alta qualidade.");
  
  // Services data for settings
  const [services, setServices] = useState([
    { title: "Creche para Pets", description: "Serviços profissionais de creche para seus pets enquanto você está ocupado com trabalho ou outros compromissos.", color: "orange", index: "01" },
    { title: "Vacinação", description: "Serviços completos de vacinação para manter seus pets saudáveis e protegidos de várias doenças.", color: "blue", index: "02" },
    { title: "Hospedagem para Pets", description: "Instalações confortáveis para seus pets quando você precisa viajar ou ficar longe de casa.", color: "green", index: "03" },
    { title: "Serviço Veterinário", description: "Serviços veterinários completos incluindo check-ups, tratamentos, cirurgias e atendimento de emergência.", color: "purple", index: "04" }
  ]);
  
  // Stats data for settings
  const [stats, setStats] = useState([
    { value: "24/7", label: "Atendimento ao Cliente", color: "orange" },
    { value: "4.9", label: "Avaliação", color: "blue" },
    { value: "30k", label: "Clientes", color: "green" },
    { value: "7+", label: "Anos de Experiência", color: "purple" }
  ]);
  
  const form = useForm({
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
  
  const appointments = [
    { id: 1, petName: "Max", petType: "Golden Retriever", ownerName: "João Silva", service: "Vacinação", date: "Hoje, 10:00", status: "confirmed" },
    { id: 2, petName: "Luna", petType: "Gato Persa", ownerName: "Emily Johnson", service: "Banho", date: "Hoje, 14:30", status: "confirmed" },
    { id: 3, petName: "Rocky", petType: "Bulldog", ownerName: "Miguel Marron", service: "Check-up", date: "Amanhã, 09:15", status: "pending" },
    { id: 4, petName: "Bella", petType: "Gato Siamês", ownerName: "Sara Wilson", service: "Limpeza Dental", date: "Amanhã, 13:00", status: "confirmed" },
    { id: 5, petName: "Charlie", petType: "Labrador", ownerName: "David Miller", service: "Castração", date: "15 Mai, 11:30", status: "pending" }
  ];
  
  const clients = [
    { id: 1, petName: "Max", petType: "Golden Retriever", ownerName: "João Silva", joinDate: "Jan 2023", visits: 8 },
    { id: 2, petName: "Luna", petType: "Gato Persa", ownerName: "Emily Johnson", joinDate: "Mar 2023", visits: 5 },
    { id: 3, petName: "Rocky", petType: "Bulldog", ownerName: "Miguel Marron", joinDate: "Fev 2023", visits: 7 },
    { id: 4, petName: "Bella", petType: "Gato Siamês", ownerName: "Sara Wilson", joinDate: "Abr 2023", visits: 4 },
    { id: 5, petName: "Charlie", petType: "Labrador", ownerName: "David Miller", joinDate: "Dez 2022", visits: 10 },
    { id: 6, petName: "Lucy", petType: "Beagle", ownerName: "Jessica Lee", joinDate: "Mai 2023", visits: 3 },
    { id: 7, petName: "Cooper", petType: "Maine Coon", ownerName: "Roberto Taylor", joinDate: "Fev 2023", visits: 6 },
  ];
  
  const inventoryItems = [
    { id: 1, name: "Ração para Cães - Premium", category: "Alimentos", stock: 32, status: "In Stock" },
    { id: 2, name: "Areia para Gatos", category: "Suprimentos", stock: 15, status: "Low Stock" },
    { id: 3, name: "Tratamento contra Pulgas", category: "Medicamentos", stock: 28, status: "In Stock" },
    { id: 4, name: "Shampoo para Pets", category: "Higiene", stock: 8, status: "Low Stock" },
    { id: 5, name: "Pacote de Brinquedos para Cães", category: "Brinquedos", stock: 45, status: "In Stock" }
  ];
  
  const staffMembers = [
    { id: 1, name: "Dra. Jennifer Wilson", role: "Veterinária", schedule: "Seg-Sex, 9h-17h" },
    { id: 2, name: "Marcos Johnson", role: "Tosador", schedule: "Seg-Qua, 10h-18h" },
    { id: 3, name: "Lisa Brown", role: "Recepcionista", schedule: "Seg-Sex, 8h-16h" },
    { id: 4, name: "Dr. Roberto Lee", role: "Veterinário Sênior", schedule: "Ter-Sáb, 9h-17h" },
  ];

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
      stats
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
    }
  }, []);

  const handleUpdateService = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const handleUpdateStat = (index, field, value) => {
    const updatedStats = [...stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setStats(updatedStats);
  };
  
  const handleAddClient = (data) => {
    toast({
      title: "Cliente Adicionado",
      description: `${data.petName} foi adicionado à lista de clientes`,
    });
  };
  
  const handleScheduleAppointment = () => {
    toast({
      title: "Consulta Agendada",
      description: "A consulta foi agendada com sucesso",
    });
  };

  const filteredClients = clients.filter(client => 
    client.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.petType.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <CalendarDays className="h-4 w-4" />
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
                        <p className="font-medium">Total de Clientes: 128</p>
                        <p className="text-sm text-gray-600">Cães: 76, Gatos: 42, Outros: 10</p>
                      </div>
                      <div className="pb-3 border-b">
                        <p className="font-medium">Novos neste mês: 15</p>
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
                          handleScheduleAppointment();
                        }}
                      >
                        Nova Consulta
                      </Button>
                      <Collapsible
                        open={isExpanded}
                        onOpenChange={setIsExpanded}
                        className="w-full"
                      >
                        <CollapsibleTrigger asChild>
                          <Button className="w-full bg-pet-green hover:bg-pet-green/90">
                            Adicionar Cliente
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 mt-2 bg-gray-50 rounded-md">
                          <form onSubmit={form.handleSubmit(handleAddClient)} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium">Nome do Pet</label>
                                <Input 
                                  placeholder="Nome do pet"
                                  {...form.register("petName")}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Tipo de Pet</label>
                                <Input 
                                  placeholder="Espécie/Raça"
                                  {...form.register("petType")}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Nome do Dono</label>
                              <Input 
                                placeholder="Nome completo do dono"
                                {...form.register("ownerName")}
                              />
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Checkbox id="vaccinated" {...form.register("vaccinated")} />
                              <label htmlFor="vaccinated" className="text-sm font-medium">
                                Vacinado
                              </label>
                            </div>
                            <Button type="submit" className="w-full bg-pet-green">
                              Salvar
                            </Button>
                          </form>
                        </CollapsibleContent>
                      </Collapsible>
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
                    <div className="flex justify-between items-center">
                      <CardTitle>Consultas</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex gap-1">
                          <Filter className="h-4 w-4" />
                          Filtrar
                        </Button>
                        <Button size="sm" className="flex gap-1 bg-pet-blue hover:bg-pet-blue/90">
                          <PlusCircle className="h-4 w-4" />
                          Nova Consulta
                        </Button>
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
                        {appointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {appointment.petName}
                              <div className="text-xs text-gray-500">{appointment.petType}</div>
                            </TableCell>
                            <TableCell>{appointment.ownerName}</TableCell>
                            <TableCell>{appointment.service}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>
                              <Badge className={appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                                {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Ver</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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
                        <Button className="bg-pet-green hover:bg-pet-green/90">
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
                                <Button variant="outline" size="sm">Ver</Button>
                                <Button variant="outline" size="sm">Editar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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
                    <div className="flex justify-between items-center">
                      <CardTitle>Gerenciamento de Equipe</CardTitle>
                      <Button className="bg-pet-orange hover:bg-pet-orange/90">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Adicionar Membro
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Função</TableHead>
                          <TableHead>Horário</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffMembers.map((staff) => (
                          <TableRow key={staff.id}>
                            <TableCell className="font-medium">{staff.name}</TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>{staff.schedule}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Ver</Button>
                                <Button variant="outline" size="sm">Editar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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
                              <Button variant="outline" className="flex items-center gap-2">
                                <Image className="h-4 w-4" />
                                Visualizar
                              </Button>
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
