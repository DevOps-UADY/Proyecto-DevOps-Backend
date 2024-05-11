import { Column, Entity, CreateDateColumn,  JoinColumn, ManyToOne } from "typeorm";
import { Asignacion } from "./asignaciones.entity";

@Entity()
export class Recorrido {
    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(()=>Asignacion)
    @JoinColumn()
    asignacion: Asignacion;

    @Column()
    auxAsignacion: number;

    @Column()
    rutaId: number

    @Column({ type: 'date' })
    fechaRecorrido: string; 

    @Column({default: true})
    exito: boolean;

    @Column({default: ''})
    comentario: string;

    @CreateDateColumn()
    fechaCreacion: Date;
}
