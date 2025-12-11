# SafeVault API 🛡️

API de gestión de secretos segura construida con NestJS, PostgreSQL y Docker.
Este proyecto implementa prácticas de DevSecOps, incluyendo encriptación AES-256 "at rest" y orquestación con contenedores.

## 🚀 Stack Tecnológico

- **Backend:** NestJS (TypeScript)
- **Database:** PostgreSQL 15 (Dockerized)
- **Security:** AES-256 Encryption, JWT Auth, Bcrypt
- **Infrastructure:** Docker & Docker Compose

## 🛠️ Instalación y Uso

1. **Clonar el repositorio**
2. **Configurar variables de entorno**
   Crea un archivo `.env` basado en el ejemplo y define `DB_PASSWORD` y `ENCRYPTION_KEY`.
3. **Levantar infraestructura**
   ```bash
   docker-compose up -d
   ```
