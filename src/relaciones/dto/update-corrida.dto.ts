import { PartialType } from '@nestjs/swagger';
import { CreateCorridaDto } from './create-corrida.dto';
import { IsDateString, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class UpdateCorridaDto extends PartialType(CreateCorridaDto) {
    @IsNumber()
    @IsNotEmpty()
    IDRuta: number;

    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    Comentarios: string;

    @IsDateString()
    @IsNotEmpty()
    Fecha: Date;
}
