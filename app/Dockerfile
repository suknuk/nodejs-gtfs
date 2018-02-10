FROM node:6.12.2

WORKDIR /usr/gtfs_app

COPY package.json .
RUN npm install --quiet

COPY . .