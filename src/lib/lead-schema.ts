import { z } from "zod/v4";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  cityOrZip: z.string().min(2, "Please enter your city or zip code"),
  description: z.string().min(10, "Please describe your project briefly"),
  timeframe: z.string().min(1, "Please select a timeframe"),
  budget: z.string().optional(),
  preferredStyle: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const TIMEFRAME_OPTIONS = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 1 month",
  "Within 3 months",
  "Just exploring options",
] as const;

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Not sure yet",
] as const;
