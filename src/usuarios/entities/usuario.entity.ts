import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false,unique:true})
    correo:string;

    @Column({nullable:false})
    contrasenia:string;

    @Column({nullable:false,unique:true})
    codigoInvitacion:string;

}
