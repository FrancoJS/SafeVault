import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { CreateSecretDto } from './dto/create-secret.dto';
import { ApiKeyGuard } from 'src/auth/api-key/api-key.guard';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
// import { UpdateSecretDto } from './dto/update-secret.dto';

@ApiTags('secrets')
@ApiSecurity('api-key')
@Controller('secrets')
@UseGuards(ApiKeyGuard)
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear y cifrar un secreto' })
  create(@Body() createSecretDto: CreateSecretDto) {
    return this.secretsService.create(createSecretDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los secretos sin descifrar' })
  findAll() {
    return this.secretsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener y descifrar un secreto por ID' })
  findOne(@Param('id') id: string) {
    return this.secretsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSecretDto: UpdateSecretDto) {
  //   return this.secretsService.update(+id, updateSecretDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.secretsService.remove(+id);
  // }
}
