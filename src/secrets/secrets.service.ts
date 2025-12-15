import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
// import { UpdateSecretDto } from './dto/update-secret.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Secret } from './entities/secret.entity';
import { Repository } from 'typeorm/repository/Repository';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class SecretsService {
  constructor(
    @InjectRepository(Secret)
    private readonly secretsRepository: Repository<Secret>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(createSecretDto: CreateSecretDto) {
    const { name, value } = createSecretDto;

    const { encryptedData, iv } = this.encryptionService.encrypt(value);

    const newSecret = this.secretsRepository.create({
      name,
      encryptedValue: encryptedData,
      iv,
    });

    return await this.secretsRepository.save(newSecret);
  }

  async findAll() {
    return await this.secretsRepository.find();
  }

  async findOne(id: string) {
    const secret = await this.secretsRepository.findOneBy({ id });

    if (!secret) {
      throw new NotFoundException(`Secreto con el ID ${id} no encontrado`);
    }

    const decryptedValue = this.encryptionService.decrypt(secret.encryptedValue, secret.iv);

    return { ...secret, value: decryptedValue };
  }

  // update(id: number, updateSecretDto: UpdateSecretDto) {
  //   return `This action updates a #${id} secret`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} secret`;
  // }
}
