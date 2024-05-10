import { PartialType } from '@nestjs/swagger';
import { CreateCorridaDto } from './create-corrida.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateCorridaDto extends PartialType(CreateCorridaDto) {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    idRuta?: number;

    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    @IsOptional()
    comentarios?: string;

    @IsOptional()
    fecha?: string;
}
