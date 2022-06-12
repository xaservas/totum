FROM node:16-alpine3.15
WORKDIR /api_totum
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
