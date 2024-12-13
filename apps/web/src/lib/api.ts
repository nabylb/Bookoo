import { Bookmark, Category, Task } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`)
  }

  return res.json()
}

// Bookmark APIs
export async function getBookmarks(): Promise<Bookmark[]> {
  return fetchAPI('/bookmarks')
}

export async function getBookmark(id: string): Promise<Bookmark> {
  return fetchAPI(`/bookmarks/${id}`)
}

export async function createBookmark(data: Partial<Bookmark>): Promise<Bookmark> {
  return fetchAPI('/bookmarks', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateBookmark(id: string, data: Partial<Bookmark>): Promise<Bookmark> {
  return fetchAPI(`/bookmarks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteBookmark(id: string): Promise<void> {
  return fetchAPI(`/bookmarks/${id}`, {
    method: 'DELETE',
  })
}

// Category APIs
export async function getCategories(): Promise<Category[]> {
  return fetchAPI('/categories')
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  return fetchAPI('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Task APIs
export async function getTasks(): Promise<Task[]> {
  return fetchAPI('/tasks')
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  return fetchAPI('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  return fetchAPI(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// Summarization API
export async function generateSummary(url: string): Promise<string> {
  const response = await fetchAPI('/summarize', {
    method: 'POST',
    body: JSON.stringify({ url }),
  })
  return response.summary
}