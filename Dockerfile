FROM node:20-alpine AS dependencies-env

ARG GITHUB_TOKEN

WORKDIR /app

COPY package.json package-lock.json ./

RUN echo "@saloonik:registry=https://npm.pkg.github.com" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc && \
    npm ci && \
    rm -f .npmrc


FROM node:20-alpine AS build-env

# NEXT_PUBLIC_* są wklejane do kodu w czasie buildu
ARG NEXT_PUBLIC_GSC_VERIFICATION
ENV NEXT_PUBLIC_GSC_VERIFICATION=${NEXT_PUBLIC_GSC_VERIFICATION}
ENV NEXT_TELEMETRY_DISABLED=1

COPY . /app/
COPY --from=dependencies-env /app/node_modules /app/node_modules

WORKDIR /app

RUN npm run build


FROM node:20-alpine

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app

COPY --from=build-env --chown=node:node /app/.next/standalone ./
COPY --from=build-env --chown=node:node /app/.next/static ./.next/static
COPY --from=build-env --chown=node:node /app/public ./public

USER node

EXPOSE 3000

CMD ["node", "server.js"]
