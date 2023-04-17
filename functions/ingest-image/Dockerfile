FROM node:latest

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY . /app
