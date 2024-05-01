import { PartialType } from '@nestjs/swagger';
import { CreateRutaDto } from './create-ruta.dto';
import { Max, Min, IsString, MinLength, IsOptional } from "class-validator";

export class UpdateRutaDto extends PartialType(CreateRutaDto) {

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreRuta?: string;

    @IsOptional()
    estadoRuta?: boolean;

    @Min(-90)
    @Max(90)
    @IsOptional()
    latitudDestino?: number;

    @Min(-180)
    @Max(180)
    @IsOptional()
    longitudDestino?: number;
}
