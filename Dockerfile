FROM node:22-alpine AS runtime

WORKDIR /app
ARG APP_VERSION=0.0.0
ARG APP_GIT_SHA=local
ARG APP_BUILD_TIME=unknown
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5173
ENV APP_VERSION=$APP_VERSION
ENV APP_GIT_SHA=$APP_GIT_SHA
ENV APP_BUILD_TIME=$APP_BUILD_TIME

COPY package*.json ./
RUN npm install --omit=dev

COPY index.html app.js styles.css server.js ./
COPY scripts ./scripts

EXPOSE 5173
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:5173/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]


