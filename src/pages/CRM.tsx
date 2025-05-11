
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, PlusCircle, Filter, CalendarDays, Users, Activity, Settings } from 'lucide-react';
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

const CRM = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
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
    { id: 1, petName: "Max", petType: "Golden Retriever", ownerName: "John Smith", service: "Vaccination", date: "Today, 10:00 AM", status: "confirmed" },
    { id: 2, petName: "Luna", petType: "Persian Cat", ownerName: "Emily Johnson", service: "Grooming", date: "Today, 2:30 PM", status: "confirmed" },
    { id: 3, petName: "Rocky", petType: "Bulldog", ownerName: "Michael Brown", service: "Check-up", date: "Tomorrow, 9:15 AM", status: "pending" },
    { id: 4, petName: "Bella", petType: "Siamese Cat", ownerName: "Sarah Wilson", service: "Dental Cleaning", date: "Tomorrow, 1:00 PM", status: "confirmed" },
    { id: 5, petName: "Charlie", petType: "Labrador", ownerName: "David Miller", service: "Neutering", date: "May 15, 11:30 AM", status: "pending" }
  ];
  
  const clients = [
    { id: 1, petName: "Max", petType: "Golden Retriever", ownerName: "John Smith", joinDate: "Jan 2023", visits: 8 },
    { id: 2, petName: "Luna", petType: "Persian Cat", ownerName: "Emily Johnson", joinDate: "Mar 2023", visits: 5 },
    { id: 3, petName: "Rocky", petType: "Bulldog", ownerName: "Michael Brown", joinDate: "Feb 2023", visits: 7 },
    { id: 4, petName: "Bella", petType: "Siamese Cat", ownerName: "Sarah Wilson", joinDate: "Apr 2023", visits: 4 },
    { id: 5, petName: "Charlie", petType: "Labrador", ownerName: "David Miller", joinDate: "Dec 2022", visits: 10 },
    { id: 6, petName: "Lucy", petType: "Beagle", ownerName: "Jessica Lee", joinDate: "May 2023", visits: 3 },
    { id: 7, petName: "Cooper", petType: "Maine Coon", ownerName: "Robert Taylor", joinDate: "Feb 2023", visits: 6 },
  ];
  
  const inventoryItems = [
    { id: 1, name: "Dog Food - Premium", category: "Food", stock: 32, status: "In Stock" },
    { id: 2, name: "Cat Litter", category: "Supplies", stock: 15, status: "Low Stock" },
    { id: 3, name: "Flea Treatment", category: "Medicine", stock: 28, status: "In Stock" },
    { id: 4, name: "Pet Shampoo", category: "Grooming", stock: 8, status: "Low Stock" },
    { id: 5, name: "Dog Toys Bundle", category: "Toys", stock: 45, status: "In Stock" }
  ];
  
  const staffMembers = [
    { id: 1, name: "Dr. Jennifer Wilson", role: "Veterinarian", schedule: "Mon-Fri, 9AM-5PM" },
    { id: 2, name: "Mark Johnson", role: "Pet Groomer", schedule: "Mon-Wed, 10AM-6PM" },
    { id: 3, name: "Lisa Brown", role: "Receptionist", schedule: "Mon-Fri, 8AM-4PM" },
    { id: 4, name: "Dr. Robert Lee", role: "Senior Veterinarian", schedule: "Tue-Sat, 9AM-5PM" },
  ];
  
  const handleAddClient = (data) => {
    toast({
      title: "Client Added",
      description: `Added ${data.petName} to the client list`,
    });
  };
  
  const handleScheduleAppointment = () => {
    toast({
      title: "Appointment Scheduled",
      description: "The appointment has been scheduled successfully",
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
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-pet-dark">Pet Services CRM</h1>
          </div>
          
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="dashboard">
              <TabsList className="mb-4">
                <TabsTrigger value="dashboard" className="flex gap-2">
                  <Activity className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="clients" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  Clients
                </TabsTrigger>
                <TabsTrigger value="inventory" className="flex gap-2">
                  <Settings className="h-4 w-4" />
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="staff" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  Staff
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
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
                      <Button 
                        className="bg-pet-orange hover:bg-pet-orange/90"
                        onClick={() => setActiveTab("clients")}
                      >
                        View All Clients
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-pet-blue hover:bg-pet-blue/90"
                        onClick={() => {
                          setActiveTab("appointments");
                          handleScheduleAppointment();
                        }}
                      >
                        New Appointment
                      </Button>
                      <Collapsible
                        open={isExpanded}
                        onOpenChange={setIsExpanded}
                        className="w-full"
                      >
                        <CollapsibleTrigger asChild>
                          <Button className="w-full bg-pet-green hover:bg-pet-green/90">
                            Add Pet Client
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 mt-2 bg-gray-50 rounded-md">
                          <form onSubmit={form.handleSubmit(handleAddClient)} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium">Pet Name</label>
                                <Input 
                                  placeholder="Pet name"
                                  {...form.register("petName")}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Pet Type</label>
                                <Input 
                                  placeholder="Species/Breed"
                                  {...form.register("petType")}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Owner Name</label>
                              <Input 
                                placeholder="Owner's full name"
                                {...form.register("ownerName")}
                              />
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Checkbox id="vaccinated" {...form.register("vaccinated")} />
                              <label htmlFor="vaccinated" className="text-sm font-medium">
                                Vaccinated
                              </label>
                            </div>
                            <Button type="submit" className="w-full bg-pet-green">
                              Save
                            </Button>
                          </form>
                        </CollapsibleContent>
                      </Collapsible>
                      <Button 
                        className="w-full bg-pet-purple hover:bg-pet-purple/90"
                        onClick={() => setActiveTab("inventory")}
                      >
                        Manage Inventory
                      </Button>
                      <Button 
                        className="w-full bg-pet-orange hover:bg-pet-orange/90"
                        onClick={() => setActiveTab("staff")}
                      >
                        Staff Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Appointments</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex gap-1">
                          <Filter className="h-4 w-4" />
                          Filter
                        </Button>
                        <Button size="sm" className="flex gap-1 bg-pet-blue hover:bg-pet-blue/90">
                          <PlusCircle className="h-4 w-4" />
                          New Appointment
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pet</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
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
                                {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
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
                      <CardTitle>Pet Clients</CardTitle>
                      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input 
                            placeholder="Search clients..." 
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button className="bg-pet-green hover:bg-pet-green/90">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Client
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pet Name</TableHead>
                          <TableHead>Type/Breed</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Client Since</TableHead>
                          <TableHead>Total Visits</TableHead>
                          <TableHead>Actions</TableHead>
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
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
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
                      <CardTitle>Inventory Management</CardTitle>
                      <Button className="bg-pet-purple hover:bg-pet-purple/90">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>In Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
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
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Update</Button>
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
                      <CardTitle>Staff Management</CardTitle>
                      <Button className="bg-pet-orange hover:bg-pet-orange/90">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Staff Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Actions</TableHead>
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
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
