# Multi-stage Dockerfile for building and running a Next.js (app directory) production build
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Install build tools for any native modules (kept minimal)
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package manifests first to leverage Docker cache
COPY package*.json ./

# Install dependencies (including devDeps needed for the build)
RUN npm install --no-audit --prefer-offline

# Copy rest of the source code
COPY . .

# Build the Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

## Production image
FROM node:20-bullseye-slim AS runner
WORKDIR /app

# Only set NODE_ENV for runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary artifacts from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose default Next.js port
EXPOSE 3000
ENV PORT=3000

# Start Next.js production server. Dokploy or hosting can override PORT env.
CMD ["sh", "-lc", "node node_modules/next/dist/bin/next start -p ${PORT:-3000}"]
