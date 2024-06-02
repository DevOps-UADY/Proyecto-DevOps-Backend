import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";

export class LoginUsuarioDto {
    @IsEmail()
    @MaxLength(50)
    correo:string

    @IsStrongPassword()
    @MaxLength(20)
    contrasenia:string  
}
