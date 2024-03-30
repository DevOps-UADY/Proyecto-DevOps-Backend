import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Codigo {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({default:true})
    isActive:boolean

}
