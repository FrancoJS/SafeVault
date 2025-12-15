import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSecretDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El valor no puede estar vacío' })
  @MinLength(6, { message: 'El valor debe tener al menos 6 caracteres' })
  value: string;
}
