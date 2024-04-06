import { PartialType } from '@nestjs/swagger';
import { CreateAsignacionDto } from './create-asignacion.dto';
import { IsBoolean, IsDate,  IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAsignacionDto extends PartialType(CreateAsignacionDto) {
    @IsNumber()
    @IsNotEmpty()
    IDVehiculo: number;

    @IsNumber()
    @IsNotEmpty()
    IDConductor: number;

    @IsNumber()
    @IsNotEmpty()
    IDRuta: number;

    @IsDate()
    FechaAsignacionVinculacion: Date;

    @IsBoolean()
    @IsNotEmpty()
    EnFuncionamiento: boolean;
}
