import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, MinLength } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateVehiculoDto {
    @IsString({ message: 'La marca del auto debe ser una cadena de texto' })
    @MinLength(1, { message: 'La marca del auto es obligatoria' })
    @IsNotEmpty({ message: 'La marca  del auto es obligatoria' })
    marca: string;

    @IsString({ message: 'El modelo del auto debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El modelo del auto es obligatorio' })
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'El modelo no puede contener caracteres especiales.'
      })
    modelo: string;

    @IsString({ message: 'El vin del auto debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El vin del auto es obligatorio' })
    vin: string;

    @IsString({ message: 'La placa del auto debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La placa del auto es obligatoria' })
    @Matches(/^[a-zA-Z0-9\-]*$/, {
        message: 'La placa no puede contener caracteres especiales excepto guiones medios.'
      })
    @Transform(({ value }) => value.toUpperCase())
    placa: string;

    @IsDateString()
    @IsOptional()
    fechaCompra?: string;

    @IsInt({ message: 'El costo del auto debe ser un número entero' })
    @IsPositive({ message: 'El costo del auto debe ser un número positivo' })
    @IsNotEmpty({ message: 'El costo del auto es obligatorio' })
    costo: number;

    @HasMimeType(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'], {
        message: 'La fotografia debe ser una imagen con formato JPEG, PNG, WEBP o JPG'
    })
    @IsFile({ message: 'La imagen es obligatoria', always: false })
    fotografia: MemoryStoredFile;

    @IsBoolean({ message: 'El estado de asignación debe ser un valor booleano' })
    @IsOptional()
    estatusAsignacion?: boolean;
}
