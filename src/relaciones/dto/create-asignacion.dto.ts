import { IsDate, IsBoolean, IsNumber } from "class-validator";

export class CreateAsignacionDto {
    @IsNumber()
    IDVehiculo: number;

    @IsNumber()
    IDConductor: number;

    @IsNumber()
    IDRuta: number;

    @IsDate()
    FechaAsignacionVinculacion: Date;

    @IsBoolean()
    EnFuncionamiento: boolean;
}
