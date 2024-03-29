import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Ruta {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    NombreRuta: string;

    @Column()
    FechaCreacionRuta: Date;

    @Column()
    EstadoRuta: boolean;

    @Column("decimal", { precision: 10, scale: 8 })
    LatitudInicio: number;

    @Column("decimal", { precision: 11, scale: 8 })
    LongitudInicio: number;

    @Column("decimal", { precision: 10, scale: 8 })
    LatitudDestino: number;

    @Column("decimal", { precision: 11, scale: 8 })
    LongitudDestino: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
