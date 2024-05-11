import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, MinLength } from "class-validator";
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
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'El modelo no puede contener caracteres especiales.'
      })
    modelo: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    vin: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9\-]*$/, {
        message: 'La placa no puede contener caracteres especiales excepto guiones medios.'
      })
    @Transform(({ value }) => value.toUpperCase())
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
