
"use client"

import { useState } from 'react';
import { generateEnergySavingTips, type EnergySavingTipsOutput } from '@/ai/flows/generate-energy-saving-tips';
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2, Sparkles, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { InteractiveCard } from '@/components/ui/interactive-card';

export function AiTips() {
  const [consumption, setConsumption] = useState('');
  const [tips, setTips] = useState<EnergySavingTipsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consumption.trim()) {
      setError("Please describe your energy usage.");
      return;
    }
    setLoading(true);
    setError(null);
    setTips(null);
    try {
      const result = await generateEnergySavingTips({ consumptionPatterns: consumption });
      setTips(result);
    } catch (err) {
      setError('Failed to generate tips. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InteractiveCard className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">AI-Powered Energy Tips</CardTitle>
          </div>
          <CardDescription>AI/ML algorithms analyze patterns to find savings.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View History</DropdownMenuItem>
            <DropdownMenuItem>Clear</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            placeholder="e.g., Our factory runs two shifts from 6 AM to 10 PM. The stamping press is our highest consumer, followed by the ventilation systems..."
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            rows={3}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Tips
              </>
            )}
          </Button>
        </form>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </CardContent>
      {tips && (
        <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t">
            <h3 className="font-semibold">Your Personalized Tips:</h3>
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">{tips.tips}</div>
        </CardFooter>
      )}
    </InteractiveCard>
  );
}
