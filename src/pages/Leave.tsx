import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const leaveData = [
  {
    id: 1,
    employee: "John Smith",
    leaveType: "Sick Leave",
    dates: "01–03 Sep",
    status: "Pending",
    duration: "3 days",
    reason: "Medical appointment"
  },
  {
    id: 2,
    employee: "Priya Rao",
    leaveType: "Annual",
    dates: "10–15 Sep",
    status: "Approved",
    duration: "6 days",
    reason: "Family vacation"
  },
  {
    id: 3,
    employee: "Mike Johnson",
    leaveType: "Personal",
    dates: "05–06 Sep",
    status: "Pending",
    duration: "2 days",
    reason: "Personal matters"
  },
  {
    id: 4,
    employee: "Sarah Wilson",
    leaveType: "Annual",
    dates: "20–25 Aug",
    status: "Rejected",
    duration: "6 days",
    reason: "Insufficient leave balance"
  },
  {
    id: 5,
    employee: "David Chen",
    leaveType: "Sick Leave",
    dates: "28–29 Aug",
    status: "Approved",
    duration: "2 days",
    reason: "Flu recovery"
  },
  {
    id: 6,
    employee: "Lisa Garcia",
    leaveType: "Maternity",
    dates: "01 Sep–01 Dec",
    status: "Approved",
    duration: "90 days",
    reason: "Maternity leave"
  }
];

export default function Leave() {
  const [requests, setRequests] = useState(leaveData);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleApprove = (id: number, employeeName: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
    toast({
      title: "Leave Approved",
      description: `${employeeName}'s leave request has been approved.`,
    });
  };

  const handleReject = (id: number, employeeName: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
    toast({
      title: "Leave Rejected",
      description: `${employeeName}'s leave request has been rejected.`,
      variant: "destructive",
    });
  };

  const handleView = (id: number, employeeName: string) => {
    navigate(`/leave/${id}`);
  };

  const renderActions = (request: any) => {
    if (request.status === "Pending") {
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleApprove(request.id, request.employee)}
            className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
          >
            <Check className="h-4 w-4" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleReject(request.id, request.employee)}
            className="text-red-400 border-red-500/30 hover:bg-red-500/10"
          >
            <X className="h-4 w-4" />
            Reject
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleView(request.id, request.employee)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
      );
    }
  };

  const pendingCount = requests.filter(r => r.status === "Pending").length;
  const approvedCount = requests.filter(r => r.status === "Approved").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
          <p className="text-muted-foreground mt-1">Manage employee leave applications and approvals</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Calendar className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
                <p className="text-2xl font-bold text-emerald-400">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-primary">{requests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <CardTitle className="text-primary">Leave Applications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request, index) => (
                  <TableRow 
                    key={request.id} 
                    className="border-border/50 hover:bg-card-hover animate-fade-in"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <TableCell className="font-medium">{request.employee}</TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell className="font-mono text-sm">{request.dates}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{request.duration}</TableCell>
                    <TableCell>
                      {getStatusBadge(request.status)}
                    </TableCell>
                    <TableCell>
                      {renderActions(request)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}