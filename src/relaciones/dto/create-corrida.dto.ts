import { IsString, MinLength, IsDate, IsNumber } from "class-validator";

export class CreateCorridaDto {

    @IsNumber()
    IDRuta: number;

    @IsString()
    @MinLength(10)
    Comentarios: string;
 
    @IsDate()
    Fecha: Date;
}
