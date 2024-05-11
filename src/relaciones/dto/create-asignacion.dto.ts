import { IsNumber } from "class-validator";

export class CreateAsignacionDto {
    @IsNumber()
    idVehiculo: number;

    @IsNumber()
    idConductor: number;

}
