import { IsEmail, IsStrongPassword, IsUUID, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @IsEmail()
    @MaxLength(50)
    correo:string

    @IsStrongPassword()
    @MaxLength(20)
    contrasenia:string

    @IsUUID()
    codigoInvitacion:string;
}
