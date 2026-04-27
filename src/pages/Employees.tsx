import { ArrowLeft, Plus, Search, Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddEmployeeDialog } from "@/components/forms/AddEmployeeDialog";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "Active" | "Inactive" | "On Leave";
  email: string;
  joinDate: string;
}

const sampleEmployees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Engineer",
    department: "Robotics",
    status: "Active",
    email: "john.smith@company.com",
    joinDate: "2023-01-15"
  },
  {
    id: "2",
    name: "Priya Rao",
    role: "HR Manager",
    department: "HR",
    status: "Active",
    email: "priya.rao@company.com",
    joinDate: "2022-08-20"
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Product Designer",
    department: "Design",
    status: "Active",
    email: "michael.chen@company.com",
    joinDate: "2023-03-10"
  },
  {
    id: "4",
    name: "Sarah Williams",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "On Leave",
    email: "sarah.williams@company.com",
    joinDate: "2022-11-05"
  },
  {
    id: "5",
    name: "David Rodriguez",
    role: "Senior Developer",
    department: "Engineering",
    status: "Active",
    email: "david.rodriguez@company.com",
    joinDate: "2021-06-12"
  },
  {
    id: "6",
    name: "Emma Thompson",
    role: "Finance Analyst",
    department: "Finance",
    status: "Active",
    email: "emma.thompson@company.com",
    joinDate: "2023-02-28"
  }
];

export default function Employees() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "default";
      case "On Leave":
        return "secondary";
      case "Inactive":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleViewEmployee = (id: string) => {
    console.log("View employee:", id);
    // Navigate to employee detail page when implemented
  };

  const handleEditEmployee = (id: string) => {
    console.log("Edit employee:", id);
    // Navigate to employee edit page when implemented
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  return (
    <div className="space-y-6 page-enter">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-card-hover"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employee Directory</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their information.
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Search Section */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search employees..." 
            className="pl-10 bg-card border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Employee Table */}
      <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-card-foreground">Name</TableHead>
              <TableHead className="font-semibold text-card-foreground">Role</TableHead>
              <TableHead className="font-semibold text-card-foreground">Department</TableHead>
              <TableHead className="font-semibold text-card-foreground">Status</TableHead>
              <TableHead className="font-semibold text-card-foreground">Email</TableHead>
              <TableHead className="font-semibold text-card-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow 
                key={employee.id}
                className="border-border hover:bg-card-hover transition-colors duration-200 animate-in fade-in-0 slide-in-from-left-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <TableCell className="font-medium text-card-foreground">
                  {employee.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.role}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.department}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getStatusBadgeVariant(employee.status)}
                    className="capitalize"
                  >
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.email}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewEmployee(employee.id)}
                      className="hover:bg-card-hover hover:text-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditEmployee(employee.id)}
                      className="hover:bg-card-hover hover:text-primary"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-card-hover"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem className="hover:bg-card-hover">
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-card-hover">
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-card-hover">
                          View Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-card-hover text-destructive">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No employees found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>

      {/* Add Employee Dialog */}
      <AddEmployeeDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onEmployeeAdded={handleAddEmployee}
      />
    </div>
  );
}