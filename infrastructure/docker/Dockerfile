# Use Node.js 22 alpine
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy backend dependencies
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install

# Copy backend source
COPY backend/ ./backend/

# Build backend
RUN cd backend && npm run build

# Runner stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy built files and node_modules from builder
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./package.json

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/index.js"]
