# Bookoo - Smart Web Bookmarking Platform

Bookoo is a modern web bookmarking platform that helps you organize your online reading and tasks efficiently. Similar to Pocket, but with additional features for task management and content summarization.

## ✨ Features

- 📑 Smart bookmark organization with categories and tags
- ✅ Task management integrated with bookmarks
- 🔍 Content summarization using AI
- 🔄 Real-time updates via WebSocket
- 📱 Chrome extension for easy bookmarking
- 🌓 Dark/Light mode support
- 🚪 Authentication with Google and Email
- 📊 Reading progress tracking
- 🎯 Priority-based task management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js, TypeScript, MongoDB with Prisma
- **Extension**: Chrome Extensions Manifest V3
- **Authentication**: NextAuth.js, JWT
- **Real-time**: WebSocket for live updates
- **CI/CD**: GitHub Actions, Docker
- **Infrastructure**: Vercel (Frontend), MongoDB Atlas

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MongoDB
- Docker (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nabylb/Bookoo.git
   cd Bookoo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   # Root directory
   cp .env.example .env

   # Frontend
   cd apps/web
   cp .env.example .env.local

   # Backend
   cd ../api
   cp .env.example .env
   ```

4. Start development servers:
   ```bash
   # From root directory
   pnpm dev
   ```

### Setting up the Chrome Extension

1. Build the extension:
   ```bash
   cd apps/extension
   pnpm build
   ```

2. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `apps/extension/dist` directory

## 🔧 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Backend (.env)
```bash
PORT=3001
NODE_ENV=development
JWT_SECRET=your-jwt-secret
DATABASE_URL=mongodb://localhost:27017/bookoo
CORS_ORIGINS=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OPENAI_API_KEY=your-openai-api-key
```

## 🌐 API Routes

### Bookmarks
- `GET /api/bookmarks` - Get all bookmarks
- `GET /api/bookmarks/:id` - Get a specific bookmark
- `POST /api/bookmarks` - Create a bookmark
- `PUT /api/bookmarks/:id` - Update a bookmark
- `DELETE /api/bookmarks/:id` - Delete a bookmark

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🚢 Deployment

### Frontend (Vercel)
1. Push your changes to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Docker)
1. Build the image:
   ```bash
   docker build -t bookoo-api ./apps/api
   ```

2. Run the container:
   ```bash
   docker run -p 3001:3001 --env-file ./apps/api/.env bookoo-api
   ```

### Chrome Extension
1. Build for production:
   ```bash
   cd apps/extension
   pnpm build
   ```

2. Create ZIP file:
   ```bash
   cd dist
   zip -r ../bookoo-extension.zip .
   ```

3. Upload to Chrome Web Store

## 📁 Project Structure
```
/
├── apps/
│   ├── extension/     # Chrome extension
│   ├── web/          # Next.js frontend
│   └── api/          # Express.js backend
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── ui/           # Shared UI components
└── docker/           # Docker configurations
```

## 🧪 Running Tests
```bash
# Run all tests
pnpm test

# Run specific project tests
pnpm --filter @bookoo/web test
pnpm --filter @bookoo/api test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Inspired by Pocket and other bookmarking tools
- Built with modern web technologies
- UI components from shadcn/ui
- Icons from Lucide