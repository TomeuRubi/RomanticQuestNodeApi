FROM node:21.5.0

COPY package.json .
RUN npm install
COPY . .
CMD npm start