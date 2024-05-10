import { Ruta } from '../../rutas/entities/ruta.entity';
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Corrida {
    @Column({ primary: true, generated: true })
    id: number;

    @OneToOne(()=>Ruta)
    @JoinColumn({name: 'id_ruta'})
    idRuta: number;

    @Column()
    comentarios: string;

    @Column({ type: 'date' })
    fecha: string;
}
