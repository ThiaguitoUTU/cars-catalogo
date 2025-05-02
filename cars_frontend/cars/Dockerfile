FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# El puerto que usa Vite (normalmente 5173)
EXPOSE 5173

CMD ["npm", "run", "dev"]