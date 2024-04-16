import { IsBoolean, IsNumber, IsDateString } from "class-validator";

export class CreateAsignacionDto {
    @IsNumber()
    IDVehiculo: number;

    @IsNumber()
    IDConductor: number;

    @IsNumber()
    IDRuta: number;

    @IsDateString()
    FechaAsignacionVinculacion: string;

    @IsBoolean()
    EnFuncionamiento: boolean;
}
