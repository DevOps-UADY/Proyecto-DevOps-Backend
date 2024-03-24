import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreateVehiculoDto {
    @IsString()
    @MinLength(1)
    marca: string;

    @IsString()
    modelo: string;

    @IsString()
    vin: string;

    @IsString()
    placa: string;

    @IsInt()
    @IsPositive()
    costo: number;

    @IsString()
    fotografria: string;
}
