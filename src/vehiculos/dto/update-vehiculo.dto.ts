import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UpdateVehiculoDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    marca: string;

    @IsString()
    @IsNotEmpty()
    modelo: string;

    @IsString()
    @IsNotEmpty()
    vin: string;

    @IsString()
    @IsNotEmpty()
    placa: string;

    @IsDate()
    @IsOptional()
    fechaCompra?: Date;
S
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
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
