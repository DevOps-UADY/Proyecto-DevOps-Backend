import { Max, Min, IsString, MinLength, IsBoolean } from "class-validator";

export class CreateRutaDto {
    @IsString()
    @MinLength(1)
    nombreRuta: string;

    @IsBoolean()
    estadoRuta: boolean;

    @Min(-90) 
    @Max(90)
    latitudDestino: number;

    @Min(-180) 
    @Max(180)
    longitudDestino: number;
}
