import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secret } from './entities/secret.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Secret])],
  controllers: [SecretsController],
  providers: [SecretsService],
})
export class SecretsModule {}
