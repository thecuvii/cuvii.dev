# ---- Base Stage ----
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS base

RUN corepack enable

WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ---- Builder Stage ----

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY . .

ARG R2_BUCKET_NAME
ARG R2_ENDPOINT
ARG R2_ACCESS_KEY_ID
ARG R2_SECRET_ACCESS_KEY
ENV R2_BUCKET_NAME=${R2_BUCKET_NAME}
ENV R2_ENDPOINT=${R2_ENDPOINT}
ENV R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
ENV R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}

RUN corepack prepare

RUN pnpm build

# ---- Runner Stage ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}

CMD ["node", "server.js"]
