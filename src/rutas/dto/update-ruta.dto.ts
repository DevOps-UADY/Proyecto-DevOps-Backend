import { PartialType } from '@nestjs/swagger';
import { CreateRutaDto } from './create-ruta.dto';
import { Max, Min, IsString, MinLength, IsOptional } from "class-validator";

export class UpdateRutaDto extends PartialType(CreateRutaDto) {

    @IsString()
    @MinLength(1)
    @IsOptional()
    NombreRuta?: string;

    @IsOptional()
    EstadoRuta?: boolean;

    @Min(-90)
    @Max(90)
    @IsOptional()
    LatitudInicio?: number;

    @Min(-180)
    @Max(180)
    @IsOptional()
    LongitudInicio?: number;

    @Min(-90)
    @Max(90)
    @IsOptional()
    LatitudDestino?: number;

    @Min(-180)
    @Max(180)
    @IsOptional()
    LongitudDestino?: number;
}
