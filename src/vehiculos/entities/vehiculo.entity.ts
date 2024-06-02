import { Column, Entity } from "typeorm";

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

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fechaCompra: string;

    @Column()
    costo: number;

    @Column()
    fotografia: string;

    @Column({default:false})
    estatusAsignacion: boolean;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fechaIngresoSistema: Date;
}
