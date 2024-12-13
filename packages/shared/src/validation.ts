import { z } from 'zod';

export const bookmarkSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  description: z.string().optional(),
  image: z.string().url().optional(),
  favicon: z.string().url().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const categorySchema = z.object({
  name: z.string().min(1),
});

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  bookmarkId: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});