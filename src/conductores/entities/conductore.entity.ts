import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Conductore {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    NombreConductor: string;

    @Column({ type: 'date' })
    FechaNacimiento: string; 

    @Column()
    CURP: string;

    @Column()
    DireccionCasa: string;

    @Column()
    Salario: number;

    @Column()
    NumLicencia: string;

    @Column({ type: 'date' })
    FechaIngresoSistemaConductor: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
