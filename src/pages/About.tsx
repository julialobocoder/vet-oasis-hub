import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Clock, Heart, Users, Star, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      <div className="mt-16 mb-20">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Link to="/" className="hover:text-pet-orange">Home</Link>
          <span>/</span>
          <span className="text-pet-orange">Quem Somos</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Nossa História</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Há mais de uma década, nascemos com um sonho: transformar o cuidado animal em uma experiência extraordinária. O que começou como uma pequena clínica veterinária se expandiu para um centro de referência completo, unindo excelência médica e amor incondicional pelos pets.
            </p>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Nossa jornada tem sido marcada por momentos inesquecíveis, histórias de superação e o privilégio de fazer parte da vida de milhares de famílias e seus companheiros peludos. A cada ano, crescemos não apenas em estrutura, mas em paixão e compromisso.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Hoje, somos reconhecidos com orgulho como referência em atendimento veterinário e pet shop na região, um título que carregamos com responsabilidade e que nos motiva a continuar inovando e oferecendo o melhor para seu melhor amigo.
            </p>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              alt="Equipe veterinária" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <div className="bg-pet-orange/10 rounded-xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Nossa Missão e Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
                    <Heart className="text-pet-orange h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Cuidado com Amor</h3>
                  <p className="text-gray-600">
                    Tratamos cada pet como se fosse nosso, com dedicação, respeito e o mais sincero carinho. Acreditamos que o amor é o ingrediente essencial em tudo o que fazemos.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
                    <Award className="text-pet-orange h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Excelência Técnica</h3>
                  <p className="text-gray-600">
                    Investimos constantemente em tecnologia, capacitação e infraestrutura para oferecer o que há de melhor em medicina veterinária e cuidados com pets.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="text-pet-orange h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Atendimento Familiar</h3>
                  <p className="text-gray-600">
                    Construímos relacionamentos duradouros com nossos clientes, baseados em confiança e transparência. Aqui, você e seu pet são parte da nossa família.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-10">Nossa Trajetória de Sucesso</h2>
        
        <div className="space-y-12 mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="text-pet-orange h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">De Pequena Clínica a Centro de Referência</h3>
              <p className="text-gray-600 text-lg">
                Começamos com apenas duas salas e três colaboradores apaixonados por animais. Hoje, contamos com uma estrutura completa, equipamentos de última geração e uma equipe multidisciplinar de especialistas. Nossa evolução foi impulsionada pelo carinho dos tutores que confiaram seus pets aos nossos cuidados e pelo compromisso inabalável com a qualidade.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="text-pet-orange h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Reconhecimento que nos Enche de Orgulho</h3>
              <p className="text-gray-600 text-lg">
                Ser reconhecidos como referência em atendimento na região é nossa maior conquista. Este reconhecimento vem das histórias de recuperação, dos momentos de alegria compartilhados e da confiança depositada em nosso trabalho. Cada elogio, indicação e retorno positivo nos motiva a continuar superando expectativas e estabelecendo novos padrões de excelência no cuidado animal.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-pet-orange h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Inovação Constante</h3>
              <p className="text-gray-600 text-lg">
                Nossa paixão por inovação nos mantém sempre à frente. Implementamos novas técnicas, trazemos produtos exclusivos e desenvolvemos protocolos personalizados para cada necessidade. Acreditamos que a combinação de tecnologia avançada com atendimento humanizado é o segredo para proporcionar uma experiência verdadeiramente transformadora para pets e tutores.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nossa Equipe</h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Por trás de cada atendimento excepcional está uma equipe apaixonada, qualificada e dedicada ao bem-estar animal. Conheça alguns dos profissionais que fazem a diferença na vida do seu pet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Dr. Carlos Mendes" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Carlos Mendes</h3>
                <p className="text-pet-orange mb-3">Diretor Clínico</p>
                <p className="text-gray-600">
                  Especialista em cirurgia e medicina interna, com mais de 15 anos de experiência. Liderando nossa equipe com paixão e excelência técnica.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                alt="Dra. Ana Oliveira" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dra. Ana Oliveira</h3>
                <p className="text-pet-orange mb-3">Especialista em Dermatologia</p>
                <p className="text-gray-600">
                  Referência em tratamentos dermatológicos, desenvolvendo protocolos inovadores para proporcionar qualidade de vida aos pets com problemas de pele.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
                alt="Juliana Santos" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Juliana Santos</h3>
                <p className="text-pet-orange mb-3">Coordenadora de Bem-Estar</p>
                <p className="text-gray-600">
                  Especialista em comportamento animal, responsável por garantir que cada pet tenha uma experiência tranquila e feliz durante sua estadia conosco.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Faça Parte da Nossa História</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Queremos cuidar do seu pet e construir uma relação de confiança e carinho com você. Venha nos conhecer e descubra por que somos referência em atendimento na região.
          </p>
          <Button className="bg-pet-orange hover:bg-pet-orange/90 px-8 py-6 text-lg">
            Agende uma Visita
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
