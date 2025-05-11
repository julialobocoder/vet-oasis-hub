
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CRM = () => {
  return (
    <div className="min-h-screen bg-pet-cream">
      <div className="container px-4 mx-auto">
        <Navbar />
        
        <div className="py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-pet-dark">Pet Services CRM</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Recent Appointments</h3>
              <div className="space-y-4">
                <div className="pb-3 border-b">
                  <p className="font-medium">Max (Golden Retriever)</p>
                  <p className="text-sm text-gray-600">Vaccination - Today, 10:00 AM</p>
                </div>
                <div className="pb-3 border-b">
                  <p className="font-medium">Luna (Persian Cat)</p>
                  <p className="text-sm text-gray-600">Grooming - Today, 2:30 PM</p>
                </div>
                <div className="pb-3 border-b">
                  <p className="font-medium">Rocky (Bulldog)</p>
                  <p className="text-sm text-gray-600">Check-up - Tomorrow, 9:15 AM</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Pet Clients</h3>
              <div className="space-y-4">
                <div className="pb-3 border-b">
                  <p className="font-medium">Total Clients: 128</p>
                  <p className="text-sm text-gray-600">Dogs: 76, Cats: 42, Others: 10</p>
                </div>
                <div className="pb-3 border-b">
                  <p className="font-medium">New This Month: 15</p>
                </div>
                <Button className="bg-pet-orange hover:bg-pet-orange/90">
                  View All Clients
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-pet-blue hover:bg-pet-blue/90">
                  New Appointment
                </Button>
                <Button className="w-full bg-pet-green hover:bg-pet-green/90">
                  Add Pet Client
                </Button>
                <Button className="w-full bg-pet-purple hover:bg-pet-purple/90">
                  Manage Inventory
                </Button>
                <Button className="w-full bg-pet-orange hover:bg-pet-orange/90">
                  Staff Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
