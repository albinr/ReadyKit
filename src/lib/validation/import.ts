import { z } from "zod";

export const importItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  required: z.boolean().default(true),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().optional(),
  quantity: z.number().int().positive().optional(),
  sortOrder: z.number().int().nonnegative().default(0)
});

export const importSectionSchema = z.object({
  title: z.string().min(1),
  sortOrder: z.number().int().nonnegative().default(0),
  items: z.array(importItemSchema).default([])
});

export const importKitSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  targetDate: z.string().optional(),
  status: z.enum(["planning", "active", "completed", "archived"]).default("planning"),
  sections: z.array(importSectionSchema).default([])
});

export const importPayloadSchema = z.object({
  kits: z.array(importKitSchema)
});

export type ImportPayload = z.infer<typeof importPayloadSchema>;

