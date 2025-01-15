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
- Yarn 3.6.4 (will be installed automatically)
- MongoDB
- Docker (for API)

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nabylb/Bookoo.git
   cd Bookoo
   ```

2. Set up Yarn and install dependencies:
   ```bash
   # Enable corepack for Yarn version management
   corepack enable

   # Set Yarn version
   yarn set version 3.6.4

   # Install dependencies
   yarn install
   ```

### Running the Backend (API)

1. Set up environment variables:
   ```bash
   # Copy the example env file
   cp apps/api/.env.example apps/api/.env

   # Edit the .env file with your values
   # Required variables:
   # - DATABASE_URL=mongodb://localhost:27017/bookoo
   # - JWT_SECRET=your-jwt-secret
   # - GOOGLE_CLIENT_ID=your-google-client-id
   # - GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

2. Run the API using Docker:
   ```bash
   # Build the Docker image
   yarn docker:api:build

   # Run the container
   yarn docker:api:run

   # Or run both commands in sequence
   yarn docker:api
   ```

   The API will be available at `http://localhost:3005`

### Running the Frontend (Web)

1. Set up environment variables:
   ```bash
   # Copy the example env file
   cp apps/web/.env.example apps/web/.env.local

   # Edit .env.local with your values
   # Required variables:
   # - NEXT_PUBLIC_API_URL=http://localhost:3005
   # - NEXTAUTH_URL=http://localhost:3000
   # - NEXTAUTH_SECRET=your-nextauth-secret
   # - GOOGLE_CLIENT_ID=your-google-client-id
   # - GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

2. Start the development server:
   ```bash
   yarn dev:web
   ```

   The web app will be available at `http://localhost:3000`

### Setting up the Chrome Extension

1. Set up environment variables:
   ```bash
   # Copy the example env file
   cp apps/extension/.env.example apps/extension/.env

   # Edit .env with your values
   # Required variables:
   # - VITE_API_URL=http://localhost:3005
   ```

2. Build the extension:
   ```bash
   # Build the extension
   yarn build:extension
   ```

3. Load in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" in the top left
   - Select the `apps/extension/dist` directory

The extension should now appear in your Chrome toolbar.

### Development Workflow

- Run all services in development mode:
  ```bash
  yarn dev
  ```

- Run individual services:
  ```bash
  # API (without Docker)
  yarn dev:api

  # Web app
  yarn dev:web

  # Extension
  yarn dev:extension
  ```

### Troubleshooting

If you encounter any issues:

1. Clean the project:
   ```bash
   # Clean all build outputs and node_modules
   yarn clean

   # Reset Yarn cache and node_modules
   yarn reset

   # Reinstall dependencies
   yarn install
   ```

2. Verify Docker is running:
   ```bash
   docker ps
   ```

3. Check logs:
   ```bash
   # API logs
   docker logs bookoo-api

   # Web logs
   yarn dev:web

   # Extension build logs
   yarn build:extension
   ```

4. Common issues:
   - Port 3005 already in use: Stop other services or change the port in `apps/api/.env`
   - MongoDB connection issues: Ensure MongoDB is running and the connection string is correct
   - Extension not loading: Make sure you've built it and selected the correct directory

## 🔧 Environment Variables

### Setting Up Environment Variables

#### NextAuth Secret
```bash
# Generate a random string for NEXTAUTH_SECRET
openssl rand -base64 32
# or
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

#### Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"

5. Select "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Copy the generated Client ID and Client Secret

Variables:
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

#### MongoDB Setup
1. Local Development:
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/bookoo`

2. Production (MongoDB Atlas):
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (free tier available)
   - Click "Connect" and choose "Connect your application"
   - Copy the connection string
   - Replace <password> with your database user password

Variable:
- `DATABASE_URL`: Your MongoDB connection string

#### JWT Secret
```bash
# Generate a secure random string for JWT_SECRET
openssl rand -base64 32
# or
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

#### OpenAI API Key (for summarization)
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create an account if you don't have one
3. Create a new API key
4. Copy the key (it starts with "sk-")

Variable:
- `OPENAI_API_KEY`: Your OpenAI API key

### Frontend (.env.local)
```bash
# API URLs (development)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000                  # Development
NEXTAUTH_URL=https://your-domain.com               # Production
NEXTAUTH_SECRET=your-generated-nextauth-secret     # From step above

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id             # From Google Cloud Console
GOOGLE_CLIENT_SECRET=your-google-client-secret     # From Google Cloud Console
```

### Backend (.env)
```bash
# Server Configuration
PORT=3001
NODE_ENV=development                               # or 'production'

# Security
JWT_SECRET=your-generated-jwt-secret              # From step above

# Database
DATABASE_URL=mongodb://localhost:27017/bookoo      # Local MongoDB
# or
DATABASE_URL=mongodb+srv://...                    # MongoDB Atlas URL

# CORS (add your frontend URL)
CORS_ORIGINS=http://localhost:3000                # Development
# or
CORS_ORIGINS=https://your-domain.com             # Production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id           # Same as frontend
GOOGLE_CLIENT_SECRET=your-google-client-secret   # Same as frontend

# OpenAI
OPENAI_API_KEY=your-openai-api-key              # From OpenAI
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
   yarn build
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
yarn test

# Run specific project tests
yarn workspace @bookoo/web test
yarn workspace @bookoo/api test
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