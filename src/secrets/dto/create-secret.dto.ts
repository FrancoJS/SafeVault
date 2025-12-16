import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSecretDto {
  @ApiProperty({
    description: 'Nombre del secreto',
    example: 'API_KEY',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @ApiProperty({
    description: 'Valor del secreto',
    example: 'my-super-secret-value',
  })
  @IsString()
  @IsNotEmpty({ message: 'El valor no puede estar vacío' })
  @MinLength(6, { message: 'El valor debe tener al menos 6 caracteres' })
  value: string;
}
