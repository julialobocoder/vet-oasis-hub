import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Price = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      
      <div className="mt-16 mb-20">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Link to="/" className="hover:text-pet-orange">Home</Link>
          <span>/</span>
          <span className="text-pet-orange">Valores</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Nossos Valores</h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          Oferecemos serviços de alta qualidade com preços justos e transparentes. 
          Conheça nossas opções e escolha o que melhor atende às necessidades do seu pet.
        </p>
        
        {/* Serviços Veterinários */}
        <h2 className="text-3xl font-bold mb-8">Serviços Veterinários</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Consulta Padrão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">R$ 150,00</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Avaliação clínica completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Exame físico detalhado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Orientações nutricionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Retorno em 15 dias incluso</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Consulta Especializada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">R$ 250,00</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Atendimento com especialista</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Avaliação específica por área</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Plano de tratamento detalhado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Retorno em 30 dias incluso</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Check-up Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">R$ 450,00</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Consulta clínica</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Exames laboratoriais básicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Ultrassom abdominal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Avaliação cardiológica</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Banho & Tosa */}
        <h2 className="text-3xl font-bold mb-8">Banho & Tosa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Banho Básico</CardTitle>
              <p className="text-sm text-gray-500">Cães de pequeno porte</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">R$ 180,00</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Shampoo e condicionador premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Secagem e escovação</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Limpeza de ouvidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Corte de unhas</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Banho & Tosa Higiênica</CardTitle>
              <p className="text-sm text-gray-500">Cães de pequeno porte</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">R$ 220,00</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Banho completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Tosa higiênica</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Hidratação</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Perfumação especial</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Banho & Tosa Completa</CardTitle>
              <p className="text-sm text-gray-500">Cães de pequeno porte</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">R$ 280,00</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Banho premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Tosa na máquina ou tesoura</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Hidratação profunda</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Escovação de dentes</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Planos de Saúde Pet */}
        <h2 className="text-3xl font-bold mb-8">Planos de Saúde Pet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-md">
            <CardHeader className="pb-4 bg-gray-100">
              <CardTitle>Plano Básico</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1">R$ 199,00</p>
              <p className="text-gray-500 mb-6">por mês</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>2 consultas por mês</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Vacinas anuais incluídas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Desconto de 15% em exames</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Desconto de 10% em medicamentos</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contratar</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md border-pet-orange">
            <div className="bg-pet-orange text-white text-center py-2 text-sm font-bold">
              MAIS POPULAR
            </div>
            <CardHeader className="pb-4 bg-gray-100">
              <CardTitle>Plano Premium</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1">R$ 349,00</p>
              <p className="text-gray-500 mb-6">por mês</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Consultas ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Vacinas e vermífugos incluídos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Desconto de 30% em exames</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Desconto de 20% em medicamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>1 banho mensal incluso</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-pet-orange hover:bg-pet-orange/90">Contratar</Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-4 bg-gray-100">
              <CardTitle>Plano Família</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1">R$ 499,00</p>
              <p className="text-gray-500 mb-6">por mês</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Cobertura para até 3 pets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Consultas ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Vacinas e vermífugos incluídos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Desconto de 40% em exames</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-pet-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Desconto de 25% em medicamentos</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contratar</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Price;
