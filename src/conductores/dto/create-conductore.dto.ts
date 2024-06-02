import { Min, IsString, MinLength, IsNumber, IsDateString } from "class-validator";

export class CreateConductoreDto {
    @IsString()
    @MinLength(1)
    nombreConductor: string;

    @IsDateString()
    fechaNacimiento: string;

    @IsString()
    @MinLength(1)
    curp: string;

    @IsString()
    @MinLength(1)
    direccionCasa: string;

    @IsNumber()
    @Min(0)
    salario: number

    @IsNumber()
    @Min(1)
    numeroLicencia: number;

    // @IsDateString()
    // fechaIngresoSistemaConductor: string;

}
