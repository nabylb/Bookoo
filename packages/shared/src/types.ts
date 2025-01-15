export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  category?: Category;
  categoryId?: string;
  tags: string[];
  savedAt: string;
  userId: string;
  summary?: string;
  read: boolean;
  readAt?: string;
  task?: Task;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  bookmarks?: Bookmark[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  bookmark?: Bookmark;
  bookmarkId?: string;
  userId: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface WebSocketMessage {
  type: 'bookmark_update' | 'task_update' | 'category_update' | 'connected';
  data?: any;
}

export type APIResponse<T> = {
  data: T;
  error?: never;
} | {
  data?: never;
  error: {
    message: string;
    code?: string;
  };
}