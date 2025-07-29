'use client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bolt, LogIn, User } from 'lucide-react';
import { IndustrialSphere } from '@/components/login/IndustrialSphere';
import { useEffect, useRef, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = card;
        
        const centerX = offsetLeft + offsetWidth / 2;
        const centerY = offsetTop + offsetHeight / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        
        const rotateX = (deltaY / (offsetHeight / 2)) * -5; // Max rotation 5 degrees
        const rotateY = (deltaX / (offsetWidth / 2)) * 5; // Max rotation 5 degrees

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };
    
    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden">
        <IndustrialSphere />
        <Card 
            ref={cardRef}
            className="w-full max-w-sm z-10 bg-card/80 backdrop-blur-sm transition-transform duration-200 ease-out"
            style={{ transform }}
        >
            <CardHeader className="text-center">
                <div className="flex justify-center items-center gap-3 mb-2">
                    <Bolt className="size-8 text-primary" />
                    <CardTitle className="text-3xl font-bold text-slate-50 font-headline">EcoView</CardTitle>
                </div>
            <CardDescription>Click below to log in as Admin.</CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                    <User className="mr-3 text-primary" />
                    <span className="font-medium">Admin</span>
                </div>
                <Button type="submit" className="w-full">
                <LogIn className="mr-2" />
                Login
                </Button>
            </form>
            </CardContent>
            <CardFooter className="flex-col text-xs text-center text-muted-foreground pt-4">
                <p>No password required for this demo.</p>
                <p className="mt-2">For demo representation purposes only.</p>
            </CardFooter>
        </Card>
    </div>
  );
}
