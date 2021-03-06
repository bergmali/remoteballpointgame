FROM node:12.14.1-alpine AS build
WORKDIR /app
COPY ./WebContent ./

RUN npm ci
RUN npx tsc -w false

CMD ["npm", "start"]

EXPOSE 5000