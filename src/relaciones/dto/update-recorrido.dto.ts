import { PartialType } from '@nestjs/swagger';
import { CreateRecorridoDto } from './create-recorrido.dto';
import { IsDateString, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRecorridoDto extends PartialType(CreateRecorridoDto) {
    @IsNumber()
    @IsOptional()
    asignacionId?: number;

    @IsNumber()
    @IsOptional()
    rutaId?: number

    @IsDateString()
    @IsOptional()
    fechaRecorrido?: string; 

    @IsBoolean()
    @IsOptional()
    exito?: boolean;

    @IsString()
    @IsOptional()
    comentario?: string;
}
