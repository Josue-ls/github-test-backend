FROM node:16.14.0-alpine
WORKDIR /app
COPY package* yarn* ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]