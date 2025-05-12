import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Camera, Heart, Utensils, Clock, Calendar } from 'lucide-react';

const Hospedagem = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      <div className="mt-16 mb-20">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Link to="/" className="hover:text-pet-orange">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-pet-orange">Serviços</Link>
          <span>/</span>
          <span className="text-pet-orange">Hospedagem</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Hospedagem Pet</h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          Um segundo lar para seu pet, onde ele será tratado como o importante membro da família que ele é.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Hospedagem para pets" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Hospedagem com Amor e Cuidado</h2>
            <p className="text-gray-600 mb-6">
              Sabemos o quanto é difícil deixar seu pet quando você precisa viajar ou se ausentar. Por isso, criamos um ambiente acolhedor e seguro, onde seu melhor amigo receberá todo o carinho e atenção que merece, exatamente como um membro da família.
            </p>
            <p className="text-gray-600 mb-6">
              Nossa hospedagem conta com acomodações confortáveis, áreas de lazer, monitoramento 24 horas e uma equipe apaixonada por animais. Seu pet terá uma rotina saudável, com alimentação balanceada, passeios diários e muito carinho.
            </p>
            <div className="flex gap-4">
              <Button className="bg-pet-orange hover:bg-pet-orange/90">Reservar Hospedagem</Button>
              <Button variant="outline">Ver Preços</Button>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-10">Nossos Diferenciais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Home className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Acomodações Confortáveis</h3>
            <CardContent className="p-0">
              <p className="text-gray-600">
                Oferecemos acomodações individuais, espaçosas e climatizadas, projetadas para garantir o conforto e bem-estar do seu pet. Cada espaço é higienizado diariamente e equipado com caminhas macias e brinquedos.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Camera className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Monitoramento 24h</h3>
            <CardContent className="p-0">
              <p className="text-gray-600">
                Todas as áreas da nossa hospedagem são monitoradas por câmeras 24 horas por dia. Além disso, enviamos fotos e vídeos diários para que você possa acompanhar como seu pet está se divertindo durante a estadia.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cuidado Personalizado</h3>
            <CardContent className="p-0">
              <p className="text-gray-600">
                Cada pet é único e recebe atenção individualizada. Respeitamos a rotina, preferências e necessidades específicas do seu animal, garantindo que ele se sinta seguro e amado, como um verdadeiro membro da família.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Utensils className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Alimentação Premium</h3>
            <CardContent className="p-0">
              <p className="text-gray-600">
                Oferecemos alimentação de alta qualidade, respeitando a dieta habitual do seu pet. Você também pode trazer a ração que seu pet está acostumado, e seguiremos rigorosamente os horários e quantidades indicados.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Recreação Diária</h3>
            <CardContent className="p-0">
              <p className="text-gray-600">
                Seu pet terá momentos diários de recreação e socialização em nossos espaços de lazer. Organizamos brincadeiras, passeios e atividades que estimulam física e mentalmente os animais, combatendo o tédio e a ansiedade.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Estadia Flexível</h3>
            <CardContent className="p-0">
              <p className="text-gray-600">
                Oferecemos opções de hospedagem por diárias, finais de semana ou períodos mais longos. Também disponibilizamos o serviço de day care, para quando você precisar deixar seu pet apenas durante o dia.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-pet-orange/10 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Como Funciona Nossa Hospedagem</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-pet-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Agendamento</h3>
                <p className="text-gray-600">
                  Entre em contato conosco para verificar disponibilidade e fazer a reserva para seu pet. Recomendamos agendar com antecedência, especialmente em períodos de alta demanda como feriados e férias escolares.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-pet-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Entrevista e Reconhecimento</h3>
                <p className="text-gray-600">
                  Agendamos uma visita prévia para que seu pet conheça o ambiente e nossa equipe. Neste momento, coletamos informações importantes sobre rotina, alimentação, medicações e preferências do seu animal.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-pet-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Check-in</h3>
                <p className="text-gray-600">
                  No dia da hospedagem, você trará seu pet junto com a carteira de vacinação atualizada, alimentos (se optar pela ração habitual) e itens pessoais como brinquedos favoritos ou caminha, para que ele se sinta mais à vontade.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-pet-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">4</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Estadia</h3>
                <p className="text-gray-600">
                  Durante a estadia, seu pet seguirá uma rotina saudável com alimentação, passeios, brincadeiras e muito carinho. Enviaremos atualizações diárias com fotos e informações sobre como ele está se adaptando.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-pet-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">5</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Check-out</h3>
                <p className="text-gray-600">
                  No momento da retirada, fornecemos um relatório detalhado sobre a estadia do seu pet, incluindo informações sobre alimentação, comportamento e atividades realizadas. Seu pet voltará para casa feliz e bem cuidado!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Reserve uma Hospedagem</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Garanta um lugar aconchegante e cheio de carinho para seu pet durante sua ausência. Entre em contato conosco para verificar disponibilidade e fazer sua reserva.
          </p>
          <Button className="bg-pet-orange hover:bg-pet-orange/90 px-8 py-6 text-lg">
            Fazer Reserva
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hospedagem;
