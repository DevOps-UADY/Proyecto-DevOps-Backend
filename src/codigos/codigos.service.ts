import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Codigo } from './entities/codigo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CodigosService {
  constructor (  
    @InjectRepository(Codigo)
    private codigoInvitacionRepository: Repository<Codigo>){}
    async create () {
  
      try {
        const codigoEntidad =  this.codigoInvitacionRepository.create();
        const codigoEntidadCreated = await this.codigoInvitacionRepository.save(codigoEntidad);
        return {
          msg: 'Código creado con éxito',
          data: codigoEntidadCreated
        }
   
      } catch (error) {
        console.log(error)
        throw new InternalServerErrorException('Llame al administrador')
      }
    }

  async findAll () {
    try {
      const codigos = await this.codigoInvitacionRepository.find();
      return {
        data:codigos
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Llame al administrador')
    }

  }

  async findOne (id: string) {
    const codigo = await this.codigoInvitacionRepository.findOneBy({
      id
    })
    if (!codigo)
    throw new NotFoundException('No se encontró el código: '+id)
    return {
      data: codigo
    }
  
  }

  async update (id: string) {
    try {
     const {data} = await this.findOne(id)
      await this.codigoInvitacionRepository.save({
        ...data,
        isActive:false
      })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Llame al administrador')
    }
  }

  async remove (id: string) {
    try {
      const codigoBorrado = await this.codigoInvitacionRepository.delete(id)
      return {
        msg: 'Borrado',
        data: codigoBorrado
      }
    } catch (error) {
      console.log(error)
      throw new NotFoundException('No se encontró id con el nombre especificado')
    }
  }
}
