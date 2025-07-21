# Stage 1: Base image with Node.js
FROM node:18-alpine AS base
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Stage 2: Dependencies installation
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 3: Build stage
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 4: Production stage
FROM base AS production
ENV NODE_ENV=production
USER nestjs

# Copy production dependencies
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/package*.json ./

# Expose port 3000
EXPOSE 3000

# Healthcheck?

# Start the application
CMD ["node", "dist/main"]