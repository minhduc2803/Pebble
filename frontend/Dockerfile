FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3002
CMD ["yarn", "start"]
