import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateVehiculoDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty({ message: 'La marca  del auto es obligatoria' })
    marca: string;

    @IsString()
    @IsNotEmpty({ message: 'El modelo del auto es obligatorio' })
    modelo: string;

    @IsString()
    @IsNotEmpty({ message: 'El vin del auto es obligatorio' })
    vin: string;

    @IsString()
    @IsNotEmpty({ message: 'La placa del auto es obligatoria' })
    placa: string;

    @IsDate()
    @IsOptional()
    fechaCompra?: Date;

    @IsInt()
    @IsPositive()
    @IsNotEmpty({ message: 'El costo del auto es obligatorio' })
    costo: number;

    @HasMimeType(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'], {
        message: 'La fotografia debe ser una imagen con formato JPEG, PNG, WEBP o JPG'
    })
    @IsFile({ message: 'La imagen es obligatoria', always: false })
    fotografia: MemoryStoredFile;

    @IsBoolean()
    @IsOptional()
    estatusValidacion?: boolean;
}
