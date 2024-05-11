import { PartialType } from '@nestjs/swagger';
import { CreateAsignacionDto } from './create-asignacion.dto';
import { IsBoolean, IsOptional,  IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAsignacionDto extends PartialType(CreateAsignacionDto) {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    idVehiculo?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    idConductor?: number;

    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    enFuncionamiento?: boolean;
}
