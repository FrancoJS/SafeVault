# --- ETAPA 1: BUILDER (El Constructor) ---
# Usamos una imagen de Node ligera (Alpine Linux)
FROM node:20-alpine AS builder

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copiamos SOLO los archivos de dependencias primero
# Esto aprovecha la caché de Docker. Si no cambias dependencias, este paso se salta.
COPY package*.json ./

# 2. Instalamos TODAS las dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# 3. Copiamos el resto del código fuente
COPY . .

# 4. Compilamos el proyecto (TS -> JS en carpeta /dist)
RUN npm run build

# --- ETAPA 2: RUNNER (El Ejecutor - Producción) ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copiamos solo los archivos de dependencias nuevamente
COPY package*.json ./

# 1. Instalamos SOLO dependencias de producción (más ligero y seguro)
RUN npm ci --only=production

# 2. Copiamos la carpeta compilada (dist) desde la Etapa 1 (builder)
COPY --from=builder /app/dist ./dist

# 3. Exponemos el puerto 3000 (informativo)
EXPOSE 3000

# 4. Comando para iniciar la app en modo producción
CMD ["node", "dist/main"]