
"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import React from "react";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl", className)}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";
