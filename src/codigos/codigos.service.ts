import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Codigo } from './entities/codigo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CodigosService {
  constructor(  
    @InjectRepository(Codigo)
    private codigoInvitacionRepository: Repository<Codigo>){}
    async create() {
  
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

  async findAll() {
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

  async findOne(id: string) {
    try {
      const codigo = await this.codigoInvitacionRepository.findOneBy({
        id
      })
      if (!codigo)
      throw new BadRequestException('Código no encontrado')
      return {
        data: codigo
      }

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Llame al administrador')
    }

  
  }

  async update(id: string) {
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

  async remove(id: string) {
    try {
      const codigoBorrado = await this.codigoInvitacionRepository.delete(id)
      return {
        msg: 'Borrado',
        data: codigoBorrado
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('No se encontró id con el nombre especificado')
    }
  }
}
