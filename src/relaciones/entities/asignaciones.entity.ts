import { Conductore } from '../../conductores/entities/conductore.entity';
import { Ruta } from '../../rutas/entities/ruta.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Asignacion {
    @Column({ primary: true, generated: true })
    id: number;

    @OneToOne(()=>Vehiculo)
    @JoinColumn({name: 'id_vehiculo'})
    IDVehiculo: number;

    @OneToOne(()=>Conductore)
    @JoinColumn({name: 'id_conductor'})
    IDConductor: number;

    @OneToOne(()=>Ruta)
    @JoinColumn({name: 'id_ruta'})
    IDRuta: number;

    @Column({ type: 'date' })
    FechaAsignacionVinculacion: string;

    @Column()
    EnFuncionamiento: boolean;
}
