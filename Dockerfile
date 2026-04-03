# ─── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client, then build Next.js
RUN npx prisma generate
RUN npm run build

# ─── Stage 3: Production runner ───────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup -g 1001 -S nodejs \
 && adduser  -u 1001 -S nextjs -G nodejs

# Standalone Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

# Prisma: migrations schema + query engine
COPY --from=builder --chown=nextjs:nodejs /app/prisma                  ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma    ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma    ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma     ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/bcryptjs   ./node_modules/bcryptjs

# Writable dirs for SQLite DB and user uploads (mounted as volumes in production)
RUN mkdir -p /data /app/public/uploads \
 && chown -R nextjs:nodejs /data /app/public/uploads

USER nextjs
EXPOSE 3000

# Run migrations then start
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node prisma/seed.js && node server.js"]
