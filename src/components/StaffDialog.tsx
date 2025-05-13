import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the staff member type
interface StaffMember {
  id: number;
  name: string;
  role: string;
  schedule: string;
  email?: string;
  phone?: string;
  specialization?: string;
  startDate?: string;
  avatar?: string;
}

// Props for the StaffDialog component
interface StaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStaffMember: (staffMember: Omit<StaffMember, 'id' | 'startDate' | 'avatar'>) => void;
  toast: any;
}

const StaffDialog: React.FC<StaffDialogProps> = ({
  open,
  onOpenChange,
  onAddStaffMember,
  toast
}) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialization: '',
    email: '',
    phone: '',
    schedule: ''
  });
  
  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);
  
  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      specialization: '',
      email: '',
      phone: '',
      schedule: ''
    });
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, informe o nome completo",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.role.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, selecione o cargo",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.email.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, informe o email",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.schedule.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, informe o horário de trabalho",
        variant: "destructive"
      });
      return;
    }
    
    // Create new staff member
    const newStaffMember = {
      name: formData.name,
      role: formData.role,
      specialization: formData.specialization,
      email: formData.email,
      phone: formData.phone,
      schedule: formData.schedule
    };
    
    // Add the staff member
    onAddStaffMember(newStaffMember);
    
    // Close dialog and reset form
    onOpenChange(false);
    
    // Show success message
    toast({
      title: "Membro da Equipe Adicionado",
      description: `${formData.name} foi adicionado à equipe`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="text-lg">Adicionar Membro da Equipe</span>
            <Button 
              variant="ghost" 
              className="ml-auto h-8 w-8 p-0" 
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome completo"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="role" className="text-sm font-medium">Cargo</label>
              <Select onValueChange={handleSelectChange} value={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veterinário">Veterinário</SelectItem>
                  <SelectItem value="Veterinária">Veterinária</SelectItem>
                  <SelectItem value="Auxiliar Veterinário">Auxiliar Veterinário</SelectItem>
                  <SelectItem value="Tosador">Tosador</SelectItem>
                  <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Adestrador">Adestrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label htmlFor="specialization" className="text-sm font-medium">Especialização</label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="Ex: Cirurgia, Clínica Geral"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email profissional"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="schedule" className="text-sm font-medium">Horário de Trabalho</label>
            <Input
              id="schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              placeholder="Ex: Seg-Sex, 9h-17h"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-pet-orange hover:bg-pet-orange/90">
              Adicionar Membro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDialog;
