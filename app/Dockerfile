FROM node:carbon

WORKDIR /usr/gtfs_app

COPY package.json .
RUN npm install --quiet

COPY . .