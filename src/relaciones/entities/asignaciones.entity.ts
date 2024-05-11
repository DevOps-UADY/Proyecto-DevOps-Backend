import { Conductore } from '../../conductores/entities/conductore.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';
import { Column, Entity, JoinColumn, OneToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Asignacion {
    @Column({ primary: true, generated: true })
    id: number;

    @OneToOne(()=>Vehiculo)
    @JoinColumn()
    vehiculo: Vehiculo;

    @OneToOne(()=>Conductore)
    @JoinColumn()
    conductor: Conductore;

    @Column({default: 0})
    idRuta: number;

    @CreateDateColumn()
    fechaAsignacionVinculacion: Date;

    @Column({default: true})
    enFuncionamiento: boolean;

}
