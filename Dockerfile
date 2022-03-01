FROM node:16.14.0-alpine3.14 
WORKDIR /app
COPY package.json ./
RUN npm install
EXPOSE 3000
CMD npm run start
