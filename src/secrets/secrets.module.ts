import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secret } from './entities/secret.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([Secret]), EncryptionModule],
  controllers: [SecretsController],
  providers: [SecretsService],
})
export class SecretsModule {}
