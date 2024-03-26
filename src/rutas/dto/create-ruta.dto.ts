import { Max, Min, IsString, MinLength, IsDateString, IsBoolean } from "class-validator";

export class CreateRutaDto {
    @IsString()
    @MinLength(1)
    NombreRuta: string;

    @IsDateString()
    FechaCreacionRuta: Date;

    @IsBoolean()
    EstadoRuta: boolean;

    @Min(-90) 
    @Max(90) 
    LatitudInicio: number;

    @Min(-180) 
    @Max(180) 
    LongitudInicio: number;

    @Min(-90) 
    @Max(90)
    LatitudDestino: number;

    @Min(-180) 
    @Max(180)
    LongitudDestino: number;
}
