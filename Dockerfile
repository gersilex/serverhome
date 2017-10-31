FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

VOLUME [ "/app/config.yml" ]

CMD ["npm", "start"]
