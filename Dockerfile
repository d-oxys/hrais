FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

COPY . .

COPY .env /app/.env
RUN npm install


# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]

# FROM node:20-alpine as builder
# WORKDIR /usr/src/app

# COPY package.json package-lock.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:20-alpine as runner
# WORKDIR /usr/src/app
# COPY --from=builder /usr/src/app/package.json .
# COPY --from=builder /usr/src/app/package-lock.json .
# COPY --from=builder /usr/src/app/next.config.js ./
# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/.next/standalone ./
# COPY --from=builder /usr/src/app/.next/static ./.next/static
# EXPOSE 3000
# ENTRYPOINT ["npm", "start"]
