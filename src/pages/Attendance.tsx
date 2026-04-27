import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const attendanceData = [
  {
    id: 1,
    date: "01/09/25",
    employeeName: "John Smith",
    checkIn: "09:01",
    checkOut: "18:10",
    status: "Present"
  },
  {
    id: 2,
    date: "01/09/25",
    employeeName: "Priya Rao",
    checkIn: "09:10",
    checkOut: "17:50",
    status: "Present"
  },
  {
    id: 3,
    date: "01/09/25",
    employeeName: "Mike Johnson",
    checkIn: "08:55",
    checkOut: "17:45",
    status: "Present"
  },
  {
    id: 4,
    date: "01/09/25",
    employeeName: "Sarah Wilson",
    checkIn: "--",
    checkOut: "--",
    status: "Absent"
  },
  {
    id: 5,
    date: "31/08/25",
    employeeName: "David Chen",
    checkIn: "09:15",
    checkOut: "18:00",
    status: "Late"
  },
  {
    id: 6,
    date: "31/08/25",
    employeeName: "Lisa Garcia",
    checkIn: "09:00",
    checkOut: "17:30",
    status: "Present"
  }
];

const departments = ["All Departments", "Robotics", "HR", "Engineering", "Marketing", "Finance"];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{status}</Badge>;
      case "Absent":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{status}</Badge>;
      case "Late":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Logs</h1>
          <p className="text-muted-foreground mt-1">Track employee attendance and work hours</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Calendar */}
        <Card className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-primary">Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0 pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-primary">Daily Attendance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Date</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record, index) => (
                    <TableRow 
                      key={record.id} 
                      className="border-border/50 hover:bg-card-hover animate-fade-in"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.checkIn}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.checkOut}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}