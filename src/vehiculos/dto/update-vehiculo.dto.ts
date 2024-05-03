import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UpdateVehiculoDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @IsOptional()
    marca: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    modelo: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    vin: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    placa: string;

    @IsDateString()
    @IsOptional()

    fechaCompra?: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @IsOptional()   
    costo: number;

    @HasMimeType(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'], {
        message: 'La fotografia debe ser una imagen con formato JPEG, PNG, WEBP o JPG'
    })
    @IsFile()
    @IsOptional()
    fotografia?: MemoryStoredFile;

    @IsBoolean()
    @IsOptional()
    estatusAsignacion?: boolean;
}
