import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class UpdateUsuarioDto  {
 
    @IsStrongPassword()
    @MaxLength(20)
    @MinLength(10)
    contrasenia:string
}
