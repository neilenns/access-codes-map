import { z } from "zod";

export const LocationFormDataSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  note: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  hasToilet: z.boolean(),
  modifiedById: z.string().optional(),
});

export type LocationFormData = z.infer<typeof LocationFormDataSchema>;
