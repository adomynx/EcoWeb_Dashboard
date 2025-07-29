
"use client"

import { useState } from 'react';
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { InteractiveCard } from '@/components/ui/interactive-card';

interface Admin {
  id: string;
  name: string;
  avatar: string;
  shift: string;
  active: boolean;
}

const initialAdmins: Admin[] = [
    { id: 'admin1', name: 'Alex Johnson', avatar: 'https://placehold.co/100x100/A8D5BA/000000/png?text=AJ', shift: '06:00 - 14:00', active: true },
    { id: 'admin2', name: 'Maria Garcia', avatar: 'https://placehold.co/100x100/F4B8A9/000000/png?text=MG', shift: '06:00 - 14:00', active: true },
    { id: 'admin3', name: 'David Smith', avatar: 'https://placehold.co/100x100/AEC6F2/000000/png?text=DS', shift: '14:00 - 22:00', active: false },
    { id: 'admin4', name: 'Chen Wei', avatar: 'https://placehold.co/100x100/F2E4A7/000000/png?text=CW', shift: '14:00 - 22:00', active: true },
    { id: 'admin5', name: 'Fatima Al-Fassi', avatar: 'https://placehold.co/100x100/DDA2F2/000000/png?text=FA', shift: '22:00 - 06:00', active: false },
];

export function TeamShiftManagement() {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const { toast } = useToast();

  const toggleAdminStatus = (id: string) => {
    const admin = admins.find(admin => admin.id === id);
    if (!admin) return;

    const newActiveState = !admin.active;

    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, active: newActiveState } : admin
    ));

    toast({
      title: newActiveState ? "Logged In" : "Shift Off",
      description: `${admin.name} has ${newActiveState ? 'logged in' : 'ended their shift'}.`,
    });
  };

  return (
    <InteractiveCard className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline">Team & Shifts</CardTitle>
        </div>
        <CardDescription>Manage on-duty administrators and their shifts.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 overflow-y-auto">
        {admins.map(admin => (
          <div key={admin.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg h-[66px]">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={admin.avatar} alt={admin.name} data-ai-hint="profile picture" />
                <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{admin.name}</p>
                <p className="text-xs text-muted-foreground">{admin.shift}</p>
              </div>
            </div>
            <Switch
              checked={admin.active}
              onCheckedChange={() => toggleAdminStatus(admin.id)}
              aria-label={`${admin.name} status`}
            />
          </div>
        ))}
      </CardContent>
    </InteractiveCard>
  );
}
