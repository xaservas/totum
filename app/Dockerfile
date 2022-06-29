FROM node:16-alpine3.15
WORKDIR /front_totum
COPY ./yarn.lock .
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
