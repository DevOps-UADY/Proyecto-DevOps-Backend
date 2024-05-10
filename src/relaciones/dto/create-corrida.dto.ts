import { IsString, MinLength, IsNumber, IsDateString } from "class-validator";

export class CreateCorridaDto {

    @IsNumber()
    idRuta: number;

    @IsString()
    @MinLength(10)
    comentarios: string;
 
    @IsDateString()
    fecha: string;
}
