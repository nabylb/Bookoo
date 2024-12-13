import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/error';

const router = Router();

const BookmarkSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  description: z.string().optional(),
  image: z.string().url().optional(),
  favicon: z.string().url().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Get all bookmarks for the current user
router.get('/', async (req, res) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: req.user!.id },
    include: {
      category: true,
    },
    orderBy: { savedAt: 'desc' },
  });

  res.json(bookmarks);
});

// Get a single bookmark
router.get('/:id', async (req, res) => {
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
    include: {
      category: true,
    },
  });

  if (!bookmark) {
    throw new AppError(404, 'Bookmark not found');
  }

  res.json(bookmark);
});

// Create a new bookmark
router.post('/', async (req, res) => {
  const data = BookmarkSchema.parse(req.body);

  const bookmark = await prisma.bookmark.create({
    data: {
      ...data,
      userId: req.user!.id,
    },
    include: {
      category: true,
    },
  });

  res.status(201).json(bookmark);
});

// Update a bookmark
router.put('/:id', async (req, res) => {
  const data = BookmarkSchema.partial().parse(req.body);

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!bookmark) {
    throw new AppError(404, 'Bookmark not found');
  }

  const updated = await prisma.bookmark.update({
    where: { id: req.params.id },
    data,
    include: {
      category: true,
    },
  });

  res.json(updated);
});

// Delete a bookmark
router.delete('/:id', async (req, res) => {
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!bookmark) {
    throw new AppError(404, 'Bookmark not found');
  }

  await prisma.bookmark.delete({
    where: { id: req.params.id },
  });

  res.status(204).end();
});

export { router as bookmarkRoutes };