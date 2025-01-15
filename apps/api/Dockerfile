FROM node:18-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Copy the API package and shared packages
COPY apps/api ./apps/api
COPY packages ./packages

# Install all dependencies (including dev dependencies)
RUN corepack enable && \
    corepack prepare yarn@3.6.4 --activate && \
    yarn install

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build the application
RUN yarn build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files and Prisma schema
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/prisma ./prisma

# Install production dependencies
RUN yarn init -y && \
    yarn add express@4.18.0 \
    @prisma/client@5.0.0 \
    cors@2.8.5 \
    dotenv@16.0.0 \
    jsonwebtoken@9.0.0 \
    zod@3.22.0 && \
    npx prisma generate

# Copy environment variables
COPY apps/api/.env ./.env

EXPOSE 3005

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3005/api/health || exit 1

CMD ["node", "dist/index.js"]