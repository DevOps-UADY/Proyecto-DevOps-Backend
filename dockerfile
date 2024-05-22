FROM node:19-alpine3.15
WORKDIR /app
COPY package*.json ./
COPY .env.development.example /app/.env.development
COPY logs/application.log /app/logs/application.log
RUN npm install
COPY . .
EXPOSE 3000
CMD ["sh", "./start.sh"]