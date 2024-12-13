import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/error';

const router = Router();

const CategorySchema = z.object({
  name: z.string().min(1),
});

// Get all categories for the current user
router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany({
    where: { userId: req.user!.id },
    include: {
      _count: {
        select: { bookmarks: true },
      },
    },
  });

  res.json(categories);
});

// Create a new category
router.post('/', async (req, res) => {
  const { name } = CategorySchema.parse(req.body);

  // Check for duplicate category names for this user
  const existing = await prisma.category.findFirst({
    where: {
      name,
      userId: req.user!.id,
    },
  });

  if (existing) {
    throw new AppError(409, 'Category already exists');
  }

  const category = await prisma.category.create({
    data: {
      name,
      userId: req.user!.id,
    },
  });

  res.status(201).json(category);
});

// Update a category
router.put('/:id', async (req, res) => {
  const { name } = CategorySchema.parse(req.body);

  const category = await prisma.category.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  const updated = await prisma.category.update({
    where: { id: req.params.id },
    data: { name },
  });

  res.json(updated);
});

// Delete a category
router.delete('/:id', async (req, res) => {
  const category = await prisma.category.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  // Remove category from bookmarks
  await prisma.bookmark.updateMany({
    where: { categoryId: req.params.id },
    data: { categoryId: null },
  });

  // Delete the category
  await prisma.category.delete({
    where: { id: req.params.id },
  });

  res.status(204).end();
});

export { router as categoryRoutes };