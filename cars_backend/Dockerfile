FROM node:18-alpine

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia TODOS los archivos (excepto los excluidos en .dockerignore)
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto
EXPOSE 8020

# Especifica el comando de inicio (verifica la ruta exacta)
CMD ["node", "src/index.js"]