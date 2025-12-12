import { InternalServerErrorException, Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {
  private algorithm = 'aes-256-cbc';
  private key: Buffer;

  constructor(private configService: ConfigService) {
    const keyString = this.configService.get<string>('ENCRYPTION_KEY');

    if (!keyString) {
      throw new InternalServerErrorException('FATAL: La variable ENCRYPTION_KEY no está definida en el archivo .env');
    }

    // Convertir la clave de hex a Buffer
    this.key = Buffer.from(keyString, 'hex');
  }

  encrypt(text: string): { encryptedData: string; iv: string } {
    // Generar un IV aleatorio
    const iv = randomBytes(16);

    // Crear el cifrador con el algoritmo, la clave y el IV
    const cipher = createCipheriv(this.algorithm, this.key, iv);

    // Cifrar el texto plano
    let encrypted = cipher.update(text, 'utf8', 'hex');

    // Añadir el relleno final
    encrypted += cipher.final('hex');

    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
    };
  }

  decrypt(encryptedData: string, ivHex: string): string {
    // Convertir el IV de hex a Buffer
    const iv = Buffer.from(ivHex, 'hex');

    // Crear el descifrador con el algoritmo, la clave y el IV
    const decipher = createDecipheriv(this.algorithm, this.key, iv);

    // Descifrar el texto cifrado
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');

    // Quitar el relleno
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
