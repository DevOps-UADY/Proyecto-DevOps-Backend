import { Min, IsString, MinLength, IsDateString, IsNumber } from "class-validator";

export class CreateConductoreDto {
    @IsString()
    @MinLength(1)
    NombreConductor: string;

    @IsDateString()
    FechaNacimiento: Date;

    @IsString()
    @MinLength(1)
    CURP: string;

    @IsString()
    @MinLength(1)
    DireccionCasa: string;

    @IsNumber()
    @Min(0)
    Salario: number

    @IsString()
    @MinLength(1)
    NumLicencia: string;

    @IsDateString()
    FechaIngresoSistemaConductor: Date;

}
