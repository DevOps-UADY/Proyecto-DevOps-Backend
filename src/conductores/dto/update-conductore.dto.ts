import { PartialType } from '@nestjs/swagger';
import { CreateConductoreDto } from './create-conductore.dto';
import { Min, IsString, MinLength, IsOptional, IsNumber } from "class-validator";

export class UpdateConductoreDto extends PartialType(CreateConductoreDto) {

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreConductor?: string;

    @IsOptional()
    fechaNacimiento?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    curp?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    direccionCasa?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    salario?: number

    @IsNumber()
    @Min(1)
    @IsOptional()
    numeroLicencia?: number;
}
