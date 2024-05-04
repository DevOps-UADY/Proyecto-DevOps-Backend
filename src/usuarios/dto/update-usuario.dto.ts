
import { IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class UpdateUsuarioDto  {
 
    @IsStrongPassword()
    @MaxLength(20)
    @MinLength(10)
    contrasenia:string
}
