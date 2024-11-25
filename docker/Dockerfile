
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm i

#only for local development
FROM deps AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]

FROM deps AS prod-builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM prod-builder AS production
COPY --from=prod-builder /app/dist .
RUN npm install -g serve
ENV PORT=5174
EXPOSE 5174
CMD ["serve","-s","dist"]

# 