import { Column, CreateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Conductore {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    nombreConductor: string;

    @Column({ type: 'date' })
    fechaNacimiento: string; 

    @Column()
    curp: string;

    @Column()
    direccionCasa: string;

    @Column()
    salario: number;

    @Column()
    numeroLicencia: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    fechaIngresoSistemaConductor: Date;
}
