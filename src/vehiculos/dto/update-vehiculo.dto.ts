import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoDto } from './create-vehiculo.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

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

    @HasMimeType(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'], {
        message: 'La fotografia debe ser una imagen con formato JPEG, PNG, WEBP o JPG'
    })
    @IsFile()
    @IsOptional()
    fotografia: MemoryStoredFile;
}
