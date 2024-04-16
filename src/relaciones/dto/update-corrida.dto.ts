import { PartialType } from '@nestjs/swagger';
import { CreateCorridaDto } from './create-corrida.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateCorridaDto extends PartialType(CreateCorridaDto) {
    @IsNumber()
    @IsNotEmpty()
    IDRuta: number;

    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    Comentarios: string;

    @IsOptional()
    Fecha?: string;
}
