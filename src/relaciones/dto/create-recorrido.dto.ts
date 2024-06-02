import { IsNumber, IsDateString } from "class-validator";

export class CreateRecorridoDto {
    @IsNumber()
    asignacionId: number;

    @IsNumber()
    rutaId: number

    @IsDateString()
    fechaRecorrido: string; 

}
