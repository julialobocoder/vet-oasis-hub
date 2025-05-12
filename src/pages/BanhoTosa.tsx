import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bath, Scissors, SprayCan, Heart, Shield, Clock } from 'lucide-react';

const BanhoTosa = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      <div className="mt-16 mb-20">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Link to="/" className="hover:text-pet-orange">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-pet-orange">Serviu00e7os</Link>
          <span>/</span>
          <span className="text-pet-orange">Banho & Tosa</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Banho & Tosa</h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          Cuidamos da higiene e beleza do seu pet com todo o carinho e atenu00e7u00e3o que este membro especial da sua famu00edlia merece.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Banho e tosa para pets" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Serviu00e7o Premium para seu Pet</h2>
            <p className="text-gray-600 mb-6">
              Nosso serviu00e7o de banho e tosa u00e9 realizado por profissionais altamente qualificados que tratam seu pet como um membro da famu00edlia. Entendemos que cada animal tem suas particularidades e necessidades especu00edficas, por isso oferecemos um atendimento personalizado.
            </p>
            <p className="text-gray-600 mb-6">
              Utilizamos produtos de alta qualidade, hipo-alergu00eanicos e adequados para cada tipo de pelagem e pele. Nosso objetivo u00e9 garantir nu00e3o apenas a beleza, mas principalmente o bem-estar e sau00fade do seu melhor amigo.
            </p>
            <div className="flex gap-4">
              <Button className="bg-pet-orange hover:bg-pet-orange/90">Agendar Banho & Tosa</Button>
              <Button variant="outline">Ver Preu00e7os</Button>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-10">Nossos Serviu00e7os de Banho & Tosa</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Bath className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Banho Completo</h3>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Banho com shampoo e condicionador especu00edficos para o tipo de pelagem, secagem completa, escovau00e7u00e3o, limpeza de ouvidos, corte de unhas e perfume hipoalergu00eanico.
              </p>
              <p className="text-sm text-gray-500">
                Durau00e7u00e3o aproximada: 1h - 1h30 (dependendo do porte e pelagem)
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Scissors className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tosa Higiu00eanica</h3>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Tosa das regiu00f5es u00edntimas, patas, barriga e face para maior higiene e conforto do pet. Ideal para manter entre as tosas completas.
              </p>
              <p className="text-sm text-gray-500">
                Durau00e7u00e3o aproximada: 30min - 45min
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Scissors className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tosa Estu00e9tica</h3>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Tosa personalizada de acordo com o padru00e3o da rau00e7a ou preferu00eancia do tutor. Realizada por profissionais especializados em estu00e9tica animal.
              </p>
              <p className="text-sm text-gray-500">
                Durau00e7u00e3o aproximada: 1h30 - 2h30
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <SprayCan className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hidratau00e7u00e3o</h3>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Tratamento especial para pelagens ressecadas ou danificadas. Devolve brilho, maciez e sau00fade aos pelos do seu pet.
              </p>
              <p className="text-sm text-gray-500">
                Durau00e7u00e3o aproximada: 1h - 1h30 (alu00e9m do tempo de banho)
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Bath className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Banho Terapu00eautico</h3>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Banho medicamentoso com produtos especu00edficos para tratamento de problemas de pele, alergias ou parasitas. Recomendado por veterinu00e1rios.
              </p>
              <p className="text-sm text-gray-500">
                Durau00e7u00e3o aproximada: 1h - 1h30
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
              <Scissors className="text-pet-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Desembarau00e7amento</h3>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Serviu00e7o especializado para remover nu00f3s e embarau00e7os da pelagem, evitando a necessidade de tosa rente em casos de pelagem muito emaranhada.
              </p>
              <p className="text-sm text-gray-500">
                Durau00e7u00e3o aproximada: 1h - 2h (dependendo da condiu00e7u00e3o da pelagem)
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-pet-orange/10 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Por que Escolher Nosso Serviu00e7o de Banho & Tosa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="text-pet-orange h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Cuidado Familiar</h3>
                <p className="text-gray-600">
                  Tratamos seu pet como um membro da famu00edlia que ele u00e9, com carinho, paciu00eancia e respeito u00e0s suas necessidades individuais.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="text-pet-orange h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Produtos Premium</h3>
                <p className="text-gray-600">
                  Utilizamos apenas produtos de alta qualidade, testadu00ados dermatologicamente e adequados para cada tipo de pelagem e pele.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="text-pet-orange h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Tempo Adequado</h3>
                <p className="text-gray-600">
                  Nu00e3o apressamos o serviu00e7o. Dedicamos o tempo necessu00e1rio para que seu pet tenha uma experiu00eancia tranquila e confortu00e1vel.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Agende um Serviu00e7o de Banho & Tosa</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Queremos conhecer seu pet e oferecer o melhor cuidado possu00edvel. Entre em contato conosco para agendar um horu00e1rio ou tirar suas du00favidas.
          </p>
          <Button className="bg-pet-orange hover:bg-pet-orange/90 px-8 py-6 text-lg">
            Agendar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BanhoTosa;
