import { Column, DeleteDateColumn, Entity, CreateDateColumn } from "typeorm";
@Entity()
export class Ruta {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    nombreRuta: string;

    @Column()
    estadoRuta: boolean;

    @Column("decimal", { precision: 10, scale: 8, default: 0 })
    latitudInicio: number;

    @Column("decimal", { precision: 11, scale: 8, default: 0 })
    longitudInicio: number;

    @Column("decimal", { precision: 10, scale: 8 })
    latitudDestino: number;

    @Column("decimal", { precision: 11, scale: 8 })
    longitudDestino: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    fechaCreacionRuta: Date;
}
