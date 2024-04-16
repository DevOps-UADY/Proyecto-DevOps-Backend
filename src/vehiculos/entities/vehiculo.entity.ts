import { Column, CreateDateColumn, Entity } from "typeorm";

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

    @Column({ type: 'date' })
    fechaCompra: string;

    @Column()
    costo: number;

    @Column()
    fotografia: string;

    @Column()
    estatusAsignacion: boolean;

    @CreateDateColumn()
    fechaIngresoSistema: Date;
}
