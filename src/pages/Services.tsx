import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake, Bath, Home, Stethoscope, Scissors } from 'lucide-react';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      <div className="mt-16 mb-20">
        <h1 className="text-4xl font-bold text-center mb-6">Nossos Serviços</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Transformamos o cuidado com seu pet em uma experiência extraordinária! Na Vet Oasis, seu melhor amigo recebe tratamento VIP com nossa equipe apaixonada por animais. De banhos relaxantes a hospedagem premium, cada momento conosco é pensado para mimar seu pet como o membro especial da família que ele é. Descubra o que significa verdadeiro carinho profissional!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="text-pet-orange h-6 w-6" />
              </div>
              <CardTitle>Atendimento Veterinário</CardTitle>
              <CardDescription>Cuidados médicos completos para seu pet</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Nossa equipe de veterinários altamente qualificados oferece consultas, exames, vacinas, cirurgias e tratamentos especializados. Cuidamos da saúde do seu pet com a mesma dedicação que você teria, pois sabemos que ele é parte essencial da sua família.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Saiba Mais</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
                <Bath className="text-pet-orange h-6 w-6" />
              </div>
              <CardTitle>Banho & Tosa</CardTitle>
              <CardDescription>Higiene e beleza com muito carinho</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Nosso serviço de banho e tosa é realizado por profissionais especializados que tratam seu pet com todo o carinho que ele merece. Utilizamos produtos de alta qualidade e técnicas que garantem o bem-estar e conforto do seu melhor amigo durante todo o processo.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/banho-tosa" className="w-full">
                <Button variant="outline" className="w-full">Conhecer Serviço</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-pet-orange/20 rounded-full flex items-center justify-center mb-4">
                <Home className="text-pet-orange h-6 w-6" />
              </div>
              <CardTitle>Hospedagem</CardTitle>
              <CardDescription>Um segundo lar para seu pet</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Na nossa hospedagem, seu pet será tratado como membro da família que ele é. Oferecemos acomodações confortáveis, alimentação balanceada, passeios diários e muito carinho. Tudo para que ele se sinta em casa enquanto você está fora, com monitoramento 24 horas.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/hospedagem" className="w-full">
                <Button variant="outline" className="w-full">Conhecer Serviço</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-pet-orange/10 rounded-xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-pet-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="text-pet-orange h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Nosso Compromisso com o Bem-Estar</h3>
              <p className="text-gray-700">
                Entendemos que seu pet é muito mais que um animal - ele é um membro querido da sua família. Por isso, em cada serviço que oferecemos, nos comprometemos a tratá-lo com o mesmo amor, respeito e cuidado que você dedica a ele em casa. Nossa equipe é formada por profissionais que amam o que fazem e que entendem a importância do vínculo entre você e seu pet.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-pet-orange/20 rounded-full flex items-center justify-center">
                <Scissors className="text-pet-orange h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Tosa Especializada</h3>
            </div>
            <p className="text-gray-600">
              Oferecemos tosas higiênicas e estéticas, adaptadas às necessidades específicas da raça e personalidade do seu pet. Nossos profissionais são treinados para proporcionar uma experiência tranquila e agradável, respeitando o temperamento único de cada animal.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-pet-orange/20 rounded-full flex items-center justify-center">
                <HeartHandshake className="text-pet-orange h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Day Care</h3>
            </div>
            <p className="text-gray-600">
              Não pode deixar seu pet sozinho durante o dia? Nosso serviço de day care oferece um ambiente seguro e divertido para ele socializar com outros pets e receber atenção constante dos nossos cuidadores. Seu pet será tratado como parte da nossa família enquanto você trabalha.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Agende um Serviço</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Queremos conhecer seu pet e oferecer o melhor cuidado possível. Entre em contato conosco para agendar qualquer um dos nossos serviços ou tirar suas dúvidas.
          </p>
          <Button className="bg-pet-orange hover:bg-pet-orange/90 px-8 py-6 text-lg">
            Agendar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
