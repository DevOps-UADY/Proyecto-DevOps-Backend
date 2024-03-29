import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Conductore {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    NombreConductor: string;

    @Column()
    FechaNacimiento: Date;

    @Column()
    CURP: string;

    @Column()
    DireccionCasa: string;

    @Column()
    Salario: number;

    @Column()
    NumLicencia: string;

    @Column()
    FechaIngresoSistemaConductor: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
