FROM node:16-alpine3.15
WORKDIR /front_totum
COPY ./package.json .
COPY ./yarn.lock .
RUN npm install
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
