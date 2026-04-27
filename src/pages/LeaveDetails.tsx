import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, FileText, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Extended leave data with more details
const detailedLeaveData = [
  {
    id: 1,
    employee: "John Smith",
    employeeId: "EMP001",
    position: "Software Engineer",
    department: "Engineering",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    manager: "Sarah Johnson",
    leaveType: "Sick Leave",
    dates: "01–03 Sep",
    startDate: "2024-09-01",
    endDate: "2024-09-03",
    status: "Pending",
    duration: "3 days",
    reason: "Medical appointment and recovery",
    description: "Scheduled medical procedure requiring 3 days for treatment and recovery. Doctor's note attached.",
    appliedDate: "2024-08-28",
    emergencyContact: "Jane Smith (Spouse) - +1 (555) 987-6543",
    workHandover: "Tasks delegated to Mike Johnson. Code reviews assigned to David Chen.",
    attachments: ["medical_certificate.pdf", "doctor_note.pdf"]
  },
  {
    id: 2,
    employee: "Priya Rao",
    employeeId: "EMP002",
    position: "HR Manager",
    department: "Human Resources",
    email: "priya.rao@company.com",
    phone: "+1 (555) 234-5678",
    manager: "Robert Davis",
    leaveType: "Annual",
    dates: "10–15 Sep",
    startDate: "2024-09-10",
    endDate: "2024-09-15",
    status: "Approved",
    duration: "6 days",
    reason: "Family vacation",
    description: "Annual family vacation to celebrate wedding anniversary. All pending HR matters have been delegated.",
    appliedDate: "2024-08-15",
    emergencyContact: "Raj Rao (Husband) - +1 (555) 876-5432",
    workHandover: "HR operations delegated to Lisa Martinez. Recruitment interviews rescheduled.",
    attachments: ["vacation_itinerary.pdf"]
  },
  {
    id: 3,
    employee: "Mike Johnson",
    employeeId: "EMP003",
    position: "Product Designer",
    department: "Design",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    manager: "Emma Wilson",
    leaveType: "Personal",
    dates: "05–06 Sep",
    startDate: "2024-09-05",
    endDate: "2024-09-06",
    status: "Pending",
    duration: "2 days",
    reason: "Personal matters",
    description: "Family emergency requiring immediate attention. Will be available via phone if urgent matters arise.",
    appliedDate: "2024-09-03",
    emergencyContact: "Susan Johnson (Mother) - +1 (555) 765-4321",
    workHandover: "Design reviews postponed. Current projects status updated in Figma.",
    attachments: []
  },
  {
    id: 4,
    employee: "Sarah Wilson",
    employeeId: "EMP004",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    manager: "Tom Anderson",
    leaveType: "Annual",
    dates: "20–25 Aug",
    startDate: "2024-08-20",
    endDate: "2024-08-25",
    status: "Rejected",
    duration: "6 days",
    reason: "Insufficient leave balance",
    description: "Requested annual leave for personal travel. However, insufficient leave balance available for the requested period.",
    appliedDate: "2024-08-10",
    emergencyContact: "Mark Wilson (Brother) - +1 (555) 654-3210",
    workHandover: "Campaign materials prepared in advance. Social media scheduled.",
    attachments: []
  },
  {
    id: 5,
    employee: "David Chen",
    employeeId: "EMP005",
    position: "Senior Developer",
    department: "Engineering",
    email: "david.chen@company.com",
    phone: "+1 (555) 567-8901",
    manager: "Sarah Johnson",
    leaveType: "Sick Leave",
    dates: "28–29 Aug",
    startDate: "2024-08-28",
    endDate: "2024-08-29",
    status: "Approved",
    duration: "2 days",
    reason: "Flu recovery",
    description: "Diagnosed with flu, need time for recovery to prevent spreading to team members.",
    appliedDate: "2024-08-27",
    emergencyContact: "Linda Chen (Wife) - +1 (555) 543-2109",
    workHandover: "Critical bug fixes completed. Code reviews reassigned to team lead.",
    attachments: ["medical_certificate.pdf"]
  },
  {
    id: 6,
    employee: "Lisa Garcia",
    employeeId: "EMP006",
    position: "Finance Analyst",
    department: "Finance",
    email: "lisa.garcia@company.com",
    phone: "+1 (555) 678-9012",
    manager: "Jennifer Brown",
    leaveType: "Maternity",
    dates: "01 Sep–01 Dec",
    startDate: "2024-09-01",
    endDate: "2024-12-01",
    status: "Approved",
    duration: "90 days",
    reason: "Maternity leave",
    description: "Standard maternity leave following company policy. All financial reports and monthly closings have been delegated to the team.",
    appliedDate: "2024-07-15",
    emergencyContact: "Carlos Garcia (Husband) - +1 (555) 432-1098",
    workHandover: "Financial analysis transferred to John Martinez. Monthly reports template prepared.",
    attachments: ["maternity_certificate.pdf", "doctor_recommendation.pdf"]
  }
];

export default function LeaveDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const leaveRequest = detailedLeaveData.find(req => req.id === parseInt(id || "0"));

  if (!leaveRequest) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Leave Request Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested leave application could not be found.</p>
          <Button onClick={() => navigate("/leave")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leave Requests
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">{status}</Badge>;
      case "Approved":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/leave")}
          className="hover:bg-card-hover"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Leave Requests
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Request Details</h1>
          <p className="text-muted-foreground mt-1">
            Detailed information for {leaveRequest.employee}'s leave application
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leave Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Leave Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Leave Type</label>
                  <p className="text-foreground font-medium">{leaveRequest.leaveType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(leaveRequest.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-foreground font-medium">{leaveRequest.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Applied Date</label>
                  <p className="text-foreground font-medium">{leaveRequest.appliedDate}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                  <p className="text-foreground font-medium">{leaveRequest.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Date</label>
                  <p className="text-foreground font-medium">{leaveRequest.endDate}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Reason</label>
                <p className="text-foreground">{leaveRequest.reason}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-foreground leading-relaxed">{leaveRequest.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Work Handover */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Work Handover Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{leaveRequest.workHandover}</p>
            </CardContent>
          </Card>

          {/* Attachments */}
          {leaveRequest.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Attachments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaveRequest.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-card-hover rounded-md">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{attachment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Employee Information Sidebar */}
        <div className="space-y-6">
          {/* Employee Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Employee Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-foreground font-medium">{leaveRequest.employee}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                <p className="text-foreground">{leaveRequest.employeeId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Position</label>
                <p className="text-foreground">{leaveRequest.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                <p className="text-foreground">{leaveRequest.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Manager</label>
                <p className="text-foreground">{leaveRequest.manager}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground text-sm">{leaveRequest.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground text-sm">{leaveRequest.phone}</span>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                <p className="text-foreground text-sm">{leaveRequest.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {leaveRequest.status === "Pending" && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
                  Approve Request
                </Button>
                <Button variant="outline" className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10">
                  Reject Request
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}