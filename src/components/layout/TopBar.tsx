import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopBar() {
  return (
    <header className="bg-topbar border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          HR Management
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            PR
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}