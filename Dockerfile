FROM node:18-alpine

# Add wget for health checks
RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"] 