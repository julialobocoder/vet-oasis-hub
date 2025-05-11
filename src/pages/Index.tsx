
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import StatsCard from '@/components/StatsCard';
import { Play } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-pet-cream">
      <div className="container px-4 mx-auto">
        {/* Navigation */}
        <Navbar />
        
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 py-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-pet-dark text-5xl font-bold leading-tight mb-4">
              We Can <br />
              Experience Pet <br />
              Services
            </h1>
            <p className="text-slate-600 mb-8 max-w-md">
              We provide the best care for your pets with our expert veterinarians and professional staff. 
              Your pet's health and happiness is our top priority.
            </p>
            <div className="flex gap-4 items-center">
              <Button size="lg" className="bg-pet-orange hover:bg-pet-orange/90 rounded-full px-8">
                Service Now
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="bg-pet-orange text-white rounded-full p-2">
                  <Play size={16} />
                </div>
                <span>Watch Video</span>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-pet-orange rounded-full w-[80%] aspect-square absolute top-[10%] left-[10%] -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500" 
              alt="Person with pet" 
              className="rounded-full w-[80%] mx-auto"
            />
          </div>
        </div>
        
        {/* Services Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ServiceCard
              title="Pet Day-care"
              description="Professional daycare services for your pets while you're busy with work or other commitments."
              color="orange"
              index="01"
            />
            <ServiceCard
              title="Vaccination"
              description="Complete vaccination services to keep your pets healthy and protected from various diseases."
              color="blue"
              index="02"
            />
            <ServiceCard
              title="Pet Boarding"
              description="Comfortable boarding facilities for your pets when you need to travel or be away from home."
              color="green"
              index="03"
            />
            <ServiceCard
              title="Veterinary Service"
              description="Full veterinary services including check-ups, treatments, surgeries, and emergency care."
              color="purple"
              index="04"
            />
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard value="24/7" label="Customer Services" color="orange" />
            <StatsCard value="4.9" label="Rating Rate" color="blue" />
            <StatsCard value="30k" label="Customers" color="green" />
            <StatsCard value="7+" label="Years Experience" color="purple" />
          </div>
        </div>
        
        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-8 py-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Progress 1</h2>
            <h3 className="text-2xl font-bold mb-6">Best Care of It</h3>
            <p className="text-slate-600 mb-8">
              Since 2014, we've been providing exceptional pet care services with 
              a focus on quality and your pet's wellbeing. Our team of professionals 
              are dedicated to giving your pets the care they deserve.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Give your pet the</h2>
            <h3 className="text-2xl font-bold mb-6">best care service since 2014</h3>
            <p className="text-slate-600 mb-8">
              We understand that your pets are family members, and we treat them 
              with the love and respect they deserve. Our state-of-the-art facilities 
              and experienced staff ensure the highest quality care.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-pet-orange border-opacity-20 rounded-xl p-4">
                <div className="text-pet-orange text-2xl font-bold">3000+</div>
                <div className="text-sm text-slate-500">Happy Customers</div>
              </div>
              <div className="border border-pet-blue border-opacity-20 rounded-xl p-4">
                <div className="text-pet-blue text-2xl font-bold">15+</div>
                <div className="text-sm text-slate-500">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="text-center text-slate-500 text-sm">
            © 2023 PETISS. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
