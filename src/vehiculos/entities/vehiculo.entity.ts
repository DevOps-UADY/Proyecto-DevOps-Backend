import { Column, CreateDateColumn, DeleteDateColumn, Entity } from "typeorm";

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
    fechaCompra: Date;

    @Column()
    costo: number;

    @Column()
    fotografia: string;

    @CreateDateColumn()
    fechaIngresoSistema: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
