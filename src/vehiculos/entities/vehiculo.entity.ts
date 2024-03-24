import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Vehiculo {
    @Column({ primary:true, generated:true })
    id: number;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column()
    vin: string;

    @Column()
    placa: string;

    @Column()
    fechaCompra: string;

    @Column()
    costo: number;

    @Column()
    fotografria: string;

    @Column()
    fechaIngresoSistema: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
