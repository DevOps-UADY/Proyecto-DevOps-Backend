import { PartialType } from '@nestjs/swagger';
import { CreateConductoreDto } from './create-conductore.dto';
import { Min, IsString, MinLength, IsOptional, IsNumber } from "class-validator";

export class UpdateConductoreDto extends PartialType(CreateConductoreDto) {

    @IsString()
    @MinLength(1)
    @IsOptional()
    NombreConductor?: string;

    @IsOptional()
    FechaNacimiento?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    CURP?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    DireccionCasa?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    Salario?: number

    @IsString()
    @MinLength(1)
    @IsOptional()
    NumLicencia?: string;
}
