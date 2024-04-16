import { IsString, MinLength, IsNumber, IsDateString } from "class-validator";

export class CreateCorridaDto {

    @IsNumber()
    IDRuta: number;

    @IsString()
    @MinLength(10)
    Comentarios: string;
 
    @IsDateString()
    Fecha: string;
}
