FROM node:14
WORKDIR /app
COPY src/package.json ./
COPY src/yarn.lock ./
RUN yarn install --production
COPY src/ ./
CMD ["node", "index.js"]