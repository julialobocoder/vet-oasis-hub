import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada",
      description: "Agradecemos seu contato! Retornaremos em breve.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      <div className="mt-16 mb-20">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Link to="/" className="hover:text-pet-orange">Home</Link>
          <span>/</span>
          <span className="text-pet-orange">Contato</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          Estamos aqui para cuidar do seu melhor amigo. Entre em contato conosco para agendar uma consulta ou tirar suas dúvidas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-medium">Nome</label>
                <Input id="name" placeholder="Seu nome completo" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="font-medium">Email</label>
                <Input id="email" type="email" placeholder="seu.email@exemplo.com" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="font-medium">Telefone</label>
                <Input id="phone" placeholder="(71) 99999-9999" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="font-medium">Assunto</label>
                <Input id="subject" placeholder="Assunto da mensagem" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="font-medium">Mensagem</label>
                <Textarea 
                  id="message" 
                  placeholder="Digite sua mensagem aqui..." 
                  className="min-h-[150px]" 
                  required 
                />
              </div>
              
              <Button type="submit" className="bg-pet-orange hover:bg-pet-orange/90 w-full md:w-auto">
                Enviar Mensagem
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-pet-orange/10 p-3 rounded-full">
                  <Phone className="text-pet-orange h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Telefone</h3>
                  <p className="text-gray-600">(71) 99416-4434</p>
                  <p className="text-gray-500 text-sm mt-1">Atendimento via WhatsApp</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pet-orange/10 p-3 rounded-full">
                  <Mail className="text-pet-orange h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">julialobocoder@gmail.com</p>
                  <p className="text-gray-500 text-sm mt-1">Respondemos em até 24 horas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pet-orange/10 p-3 rounded-full">
                  <MapPin className="text-pet-orange h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Endereço</h3>
                  <p className="text-gray-600">Rua Exemplo, 123 - Bairro</p>
                  <p className="text-gray-600">Salvador - BA, 40000-000</p>
                  <p className="text-gray-500 text-sm mt-1">Estacionamento no local</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pet-orange/10 p-3 rounded-full">
                  <Clock className="text-pet-orange h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Horário de Funcionamento</h3>
                  <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-gray-600">Sábado: 8h às 12h</p>
                  <p className="text-gray-500 text-sm mt-1">Domingos e feriados: fechado</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-bold text-lg mb-3">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="#" className="bg-pet-orange/10 p-3 rounded-full hover:bg-pet-orange/20 transition-colors">
                    <Instagram className="text-pet-orange h-6 w-6" />
                  </a>
                  <a href="#" className="bg-pet-orange/10 p-3 rounded-full hover:bg-pet-orange/20 transition-colors">
                    <Facebook className="text-pet-orange h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Veterinarian Information */}
        <div className="bg-pet-orange/5 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Médica Veterinária Responsável</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img 
                src="/placeholder-vet.jpg" 
                alt="Dra. Natalia Sales" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.parentNode as HTMLElement).classList.add('flex', 'justify-center', 'items-center');
                  (e.currentTarget.parentNode as HTMLElement).innerHTML = '<span class="text-pet-orange text-4xl font-bold">NS</span>';
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">Dra. Natalia Sales</h3>
              <p className="text-gray-500 mb-4">CRMV-BA 12345</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Formada pela Universidade Federal da Bahia, a Dra. Natalia Sales possui mais de 10 anos de experiência em clínica de pequenos animais. 
                Especialista em dermatologia veterinária, dedica-se a oferecer o melhor cuidado para seu pet com carinho e profissionalismo.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(71) 99416-4434</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Enviar email</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Localização</h2>
          <div className="bg-gray-200 h-[400px] rounded-xl flex justify-center items-center">
            <p className="text-gray-500">Mapa será carregado aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
