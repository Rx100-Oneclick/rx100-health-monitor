import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, Shield, FileText, Bell, Users, Lock, Mail } from "lucide-react";

type SettingsSection = "roles" | "policies" | "notifications";

const menuItems = [
  { id: "roles" as SettingsSection, label: "Roles & Permissions", icon: Shield },
  { id: "policies" as SettingsSection, label: "Policies", icon: FileText },
  { id: "notifications" as SettingsSection, label: "Notifications", icon: Bell }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("roles");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const renderRolesContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">User Roles & Permissions</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="default-role">Default Role for New Users</Label>
            <Select defaultValue="employee">
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select default role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="hr">HR Manager</SelectItem>
                <SelectItem value="manager">Department Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="max-leave-days">Maximum Leave Days per Year</Label>
            <Input
              id="max-leave-days"
              type="number"
              defaultValue="25"
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Self-Service Leave Requests</Label>
              <p className="text-sm text-muted-foreground">Employees can submit leave requests</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Require Manager Approval</Label>
              <p className="text-sm text-muted-foreground">All requests need manager approval</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Attendance Editing</Label>
              <p className="text-sm text-muted-foreground">HR can edit attendance records</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPoliciesContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Company Policies</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="work-hours">Standard Work Hours</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-sm text-muted-foreground">Start Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">End Time</Label>
              <Input type="time" defaultValue="17:00" />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="late-policy">Late Arrival Policy</Label>
          <Select defaultValue="15min">
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select late policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5min">5 minutes grace period</SelectItem>
              <SelectItem value="15min">15 minutes grace period</SelectItem>
              <SelectItem value="30min">30 minutes grace period</SelectItem>
              <SelectItem value="strict">No grace period</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="leave-policy">Leave Request Policy</Label>
          <Textarea
            id="leave-policy"
            className="mt-2"
            placeholder="Enter leave request guidelines..."
            defaultValue="Leave requests must be submitted at least 7 days in advance. Emergency leave requests will be considered on a case-by-case basis."
            rows={4}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Weekend Work Tracking</Label>
            <p className="text-sm text-muted-foreground">Track attendance on weekends</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );

  const renderNotificationsContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Settings</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="notification-email">Notification Email</Label>
          <Input
            id="notification-email"
            type="email"
            defaultValue="hr@company.com"
            className="mt-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <div>
                <Label>Leave Request Notifications</Label>
                <p className="text-sm text-muted-foreground">Email when leave requests are submitted</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <Label>Attendance Alerts</Label>
                <p className="text-sm text-muted-foreground">Daily attendance summary emails</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-primary" />
              <div>
                <Label>Late Arrival Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify when employees are late</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-4 w-4 text-primary" />
              <div>
                <Label>System Updates</Label>
                <p className="text-sm text-muted-foreground">Security and feature update notifications</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div>
          <Label htmlFor="notification-frequency">Notification Frequency</Label>
          <Select defaultValue="daily">
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="daily">Daily Digest</SelectItem>
              <SelectItem value="weekly">Weekly Summary</SelectItem>
              <SelectItem value="monthly">Monthly Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "roles":
        return renderRolesContent();
      case "policies":
        return renderPoliciesContent();
      case "notifications":
        return renderNotificationsContent();
      default:
        return renderRolesContent();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure system preferences and policies</p>
        </div>
      </div>

      {/* Main Content */}
      <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardContent className="p-6">
          {renderRolesContent()}
          
          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-border/50 mt-8">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}