import { IsEmail, IsStrongPassword, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsEmail()
    @MaxLength(50)
    correo:string

    
    @IsStrongPassword()
    @MaxLength(20)
    @MinLength(5)
    contrasenia:string

    @IsUUID()
    codigoInvitacion:string;
}
