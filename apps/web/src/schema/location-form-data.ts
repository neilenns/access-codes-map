import { z } from "zod";

export const LocationFormDataSchema = z.object({
  id: z.number().optional(),
  title: z.string().trim(),
  note: z.string().trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  hasToilet: z.boolean(),
  modifiedById: z.string().optional(),
});

export type LocationFormData = z.infer<typeof LocationFormDataSchema>;
