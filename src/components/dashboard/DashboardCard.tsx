import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  children?: ReactNode;
}

export function DashboardCard({ title, description, icon: Icon, onClick, children }: DashboardCardProps) {
  return (
    <Card 
      className="hr-card group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}