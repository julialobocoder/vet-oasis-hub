import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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

// Define the client type
interface Client {
  id: number;
  petName: string;
  petType: string;
  ownerName: string;
  ownerEmail?: string;
  ownerPhone?: string;
  joinDate: string;
  visits: number;
  lastVisit?: string;
  notes?: string;
}

// Props for the ClientDialog component
interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClient: (client: Omit<Client, 'id' | 'visits' | 'joinDate' | 'lastVisit'>) => void;
  toast: any;
}

const ClientDialog: React.FC<ClientDialogProps> = ({
  open,
  onOpenChange,
  onAddClient,
  toast
}) => {
  // State for form data
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    notes: '',
    vaccinated: false
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
      petName: '',
      petType: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      notes: '',
      vaccinated: false
    });
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      vaccinated: checked
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.petName.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, informe o nome do pet",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.petType.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, informe o tipo/raça do pet",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.ownerName.trim()) {
      toast({
        title: "Erro no Cadastro",
        description: "Por favor, informe o nome do proprietário",
        variant: "destructive"
      });
      return;
    }
    
    // Create new client
    const newClient = {
      petName: formData.petName,
      petType: formData.petType,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      notes: formData.notes
    };
    
    // Add the client
    onAddClient(newClient);
    
    // Close dialog and reset form
    onOpenChange(false);
    
    // Show success message
    toast({
      title: "Cliente Adicionado",
      description: `${formData.petName} foi adicionado à lista de clientes`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="text-lg">Adicionar Novo Cliente</span>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="petName" className="text-sm font-medium">Nome do Pet</label>
              <Input
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                placeholder="Nome do pet"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="petType" className="text-sm font-medium">Tipo do Pet</label>
              <Input
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleInputChange}
                placeholder="Ex: Gato Siamês, Labrador"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="ownerName" className="text-sm font-medium">Nome do Proprietário</label>
            <Input
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="Nome completo do proprietário"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="ownerEmail" className="text-sm font-medium">Email</label>
              <Input
                id="ownerEmail"
                name="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={handleInputChange}
                placeholder="Email do proprietário"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="ownerPhone" className="text-sm font-medium">Telefone</label>
              <Input
                id="ownerPhone"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="notes" className="text-sm font-medium">Observações</label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Observações adicionais sobre o pet"
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vaccinated" 
              checked={formData.vaccinated}
              onCheckedChange={handleCheckboxChange}
            />
            <label htmlFor="vaccinated" className="text-sm font-medium">
              Pet vacinado
            </label>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-pet-green hover:bg-pet-green/90">
              Adicionar Cliente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;
