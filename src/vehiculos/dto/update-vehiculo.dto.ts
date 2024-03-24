import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoDto } from './create-vehiculo.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) {
    @IsString()
    @MinLength(1)
    @IsOptional()
    marca?: string;

    @IsString()
    @IsOptional()
    modelo?: string;

    @IsString()
    @IsOptional()
    vin?: string;

    @IsString()
    @IsOptional()
    placa?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    costo?: number;

    @IsString()
    @IsOptional()
    fotografria?: string;
}
