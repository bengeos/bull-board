FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

ENV REDIS_HOST 127.0.0.1
ENV REDIS_PORT 6379
ENV BULL_QUEUE "queue1, queue2, queue3"

EXPOSE 3000
CMD [ "node", "app.js" ]
