# Ocupar una imagen pequena y eficiente de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Construir la aplicacion para produccion
RUN npm run build

# Exponer el puerto en el que la aplicacion se ejecutara
EXPOSE 3000

# Comando para iniciar la aplicacion en modo produccion
CMD ["npm", "run", "start:prod"]