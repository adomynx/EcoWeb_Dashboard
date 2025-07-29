
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bolt, LogOut, Bell, AlertTriangle, XCircle, FileWarning, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const notifications = [
  {
    type: 'Critical',
    message: 'Main power failure in Sector A.',
    time: '2 mins ago',
    icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
  },
  {
    type: 'Failure',
    message: 'Sensor #12 reporting inaccurate data.',
    time: '15 mins ago',
    icon: <XCircle className="h-5 w-5 text-yellow-500" />,
  },
  {
    type: 'Maintenance',
    message: 'Scheduled maintenance for HVAC at 2 AM.',
    time: '1 hour ago',
    icon: <Bell className="h-5 w-5 text-accent" />,
  },
];

export function Header() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    router.push('/');
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download Initiated",
      description: "Your report download has started.",
    });

    const blob = new Blob([""], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <TooltipProvider>
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Bolt className="size-8 text-primary" />
          <h1 className="text-3xl font-bold text-slate-50 font-headline">EcoView Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <FileWarning className="h-5 w-5" />
                <span className="sr-only">View Error Logs</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Error Logs</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleDownloadReport}>
                <Download className="h-5 w-5" />
                <span className="sr-only">Download Reports</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Reports</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification, index) => (
                <DropdownMenuItem key={index} className="flex items-start gap-3 py-2 focus:bg-card focus:text-card-foreground cursor-default">
                  {notification.icon}
                  <div className="flex flex-col">
                    <p className="font-semibold">{notification.type}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-3">
              <Avatar>
              <AvatarImage src={`https://placehold.co/100x100/A8D5BA/000000.png?text=AU`} alt="Admin User" data-ai-hint="profile picture" />
              <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div>
              <p className="text-sm font-medium text-slate-50">Admin User</p>
              <p className="text-xs text-muted-foreground">Logged In</p>
              </div>
          </div>
          <Button variant="outline" size="icon" onClick={handleLogout} aria-label="Log Out">
              <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>
    </TooltipProvider>
  );
}
