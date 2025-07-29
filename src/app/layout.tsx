
'use client';

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextmenu)
    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
