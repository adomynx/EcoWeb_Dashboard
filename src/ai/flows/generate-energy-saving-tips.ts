// A Genkit flow that generates personalized energy-saving tips based on user's consumption patterns.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnergySavingTipsInputSchema = z.object({
  consumptionPatterns: z
    .string()
    .describe(
      'A description of the user energy consumption patterns. Include details about peak usage times, appliances used, and any other relevant information.'
    ),
});
export type EnergySavingTipsInput = z.infer<typeof EnergySavingTipsInputSchema>;

const EnergySavingTipsOutputSchema = z.object({
  tips: z
    .string()
    .describe('A list of personalized energy-saving tips based on the provided consumption patterns.'),
});
export type EnergySavingTipsOutput = z.infer<typeof EnergySavingTipsOutputSchema>;

export async function generateEnergySavingTips(
  input: EnergySavingTipsInput
): Promise<EnergySavingTipsOutput> {
  return generateEnergySavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'energySavingTipsPrompt',
  input: {schema: EnergySavingTipsInputSchema},
  output: {schema: EnergySavingTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized energy-saving tips.

  Based on the following energy consumption patterns, generate a list of actionable tips to help the user reduce their energy usage and lower their bills.

  Consumption Patterns: {{{consumptionPatterns}}}

  Tips:`,
});

const generateEnergySavingTipsFlow = ai.defineFlow(
  {
    name: 'generateEnergySavingTipsFlow',
    inputSchema: EnergySavingTipsInputSchema,
    outputSchema: EnergySavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
