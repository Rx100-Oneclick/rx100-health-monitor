import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeAdded: (employee: any) => void;
}

export function AddEmployeeDialog({ open, onOpenChange, onEmployeeAdded }: AddEmployeeDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active" as "Active" | "Inactive" | "On Leave",
  });

  const departments = [
    "Engineering",
    "Design", 
    "Marketing",
    "HR",
    "Finance",
    "Robotics",
    "Sales",
    "Operations"
  ];

  const roles = [
    "Engineer",
    "Senior Engineer",
    "Lead Engineer", 
    "Product Designer",
    "UX Designer",
    "Marketing Specialist",
    "Marketing Manager",
    "HR Manager",
    "HR Specialist",
    "Finance Analyst",
    "Finance Manager",
    "Sales Representative",
    "Sales Manager"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.role || !formData.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Create new employee object
    const newEmployee = {
      id: Date.now().toString(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
    };

    onEmployeeAdded(newEmployee);
    
    toast({
      title: "Employee Added",
      description: `${formData.name} has been successfully added to the team.`,
    });

    // Reset form and close dialog
    setFormData({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "Active",
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Add New Employee</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the details for the new team member. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-card-foreground">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter full name"
              className="bg-background border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="employee@company.com"
              className="bg-background border-border"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-card-foreground">
                Department *
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleInputChange("department", value)}
                required
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept} className="hover:bg-card-hover">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-card-foreground">
                Job Role *
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                required
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {roles.map((role) => (
                    <SelectItem key={role} value={role} className="hover:bg-card-hover">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-card-foreground">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value as "Active" | "Inactive" | "On Leave")}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Active" className="hover:bg-card-hover">Active</SelectItem>
                <SelectItem value="Inactive" className="hover:bg-card-hover">Inactive</SelectItem>
                <SelectItem value="On Leave" className="hover:bg-card-hover">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border hover:bg-card-hover"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}