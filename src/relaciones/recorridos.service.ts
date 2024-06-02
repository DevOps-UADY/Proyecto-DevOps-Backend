import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recorrido } from './entities/recorridos.entity';
import { Ruta } from '../rutas/entities/ruta.entity'
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { UpdateRecorridoDto } from './dto/update-recorrido.dto';
import { Asignacion } from './entities/asignaciones.entity';
import { AppLogger } from '../logger/logger.service';
// Esto lo hizo Jonatan
@Injectable()
export class RecorridosService {
  constructor (
    @InjectRepository(Recorrido)
    private readonly corridaRepository: Repository<Recorrido>,
    @InjectRepository(Ruta)
    private rutaRepository: Repository<Ruta>,
    @InjectRepository(Asignacion)
    private asignacionRepository: Repository<Asignacion>,
    private readonly logger: AppLogger
  ) { }

  async create (createCorridaDto: CreateRecorridoDto) {
    const { asignacionId, rutaId, fechaRecorrido } = createCorridaDto;
    const ruta = await this.rutaRepository.findOne({where: { id: rutaId }});
    
    if (!ruta) {
      this.logger.warn(`Ruta con ID ${createCorridaDto.rutaId} no encontrado`);
      throw new NotFoundException(`Ruta con ID ${createCorridaDto.rutaId} no encontrado`);
    }
    
    const asignacion = await this.validarAsignacion(asignacionId);
    if (!asignacion) {
      this.logger.warn('Asignacion no encontrada');
      throw new NotFoundException('Asignacion no encontrada');
    }
    const asig = await this.asignacionRepository.findOne({
      where: { id: asignacionId },
      relations: ['vehiculo']
    });
    const disponibilidad = await this.validarDisponibilidad(fechaRecorrido, asig.vehiculo.id);
    
    if(!disponibilidad){
      this.logger.warn('Asignacion no disponible');
      throw new NotFoundException('Asignacion no disponible');
    }

    const recorrido = new Recorrido();
    recorrido.auxAsignacion= asignacionId;
    recorrido.rutaId = rutaId;
    recorrido.fechaRecorrido = fechaRecorrido;
    recorrido.asignacion = asig;
    this.logger.log('Recorrido creado');
    this.logger.log(JSON.stringify(recorrido));
    return await this.corridaRepository.save(recorrido);
  }

  async findAll () {
    return await this.corridaRepository.find({relations: ['asignacion']});
  }

  async findOne (id: number) {
    const corr = await this.corridaRepository.findOne(
      {
        where: { id },
        relations: ['asignacion']
      }
    );
    if (!corr) {
      this.logger.warn(`Recorrido con id ${id} no encontrado`);
      throw new NotFoundException('Invalid id');
    }
    this.logger.log('Recorrido encontrado');
    this.logger.log(JSON.stringify(corr));
    return corr;
  }

  async update (id: number, updateCorridaDto: UpdateRecorridoDto) {
    const { asignacionId, rutaId, fechaRecorrido } = updateCorridaDto;
    const ruta = await this.rutaRepository.findOne({where: { id: rutaId }});
    if (!ruta) {
      this.logger.warn(`Ruta con ID ${rutaId} no encontrado`);
      throw new NotFoundException(`Ruta con ID ${rutaId} no encontrado`);
    }
    
    const asignacion = await this.validarAsignacion(asignacionId);
    if (!asignacion) {
      this.logger.warn('Asignacion no encontrada');
      throw new NotFoundException('Asignacion no encontrada');
    }

    const asig = await this.asignacionRepository.findOne({
      where: { id: asignacionId },
      relations: ['vehiculo']
    });

    if(rutaId){
      const validarDisponibilidadConRuta = await this.validarDisponibilidad(fechaRecorrido,asig.vehiculo.id,rutaId);  
      if(!validarDisponibilidadConRuta){
        this.logger.warn('Ruta no disponible');
        throw new NotFoundException('Ruta no disponible');
      }
    }

    const corrToUpdate = await this.corridaRepository.findOneBy({ id });
    if (!corrToUpdate) {
      this.logger.warn(`Recorrido con id ${id} no encontrado`);
      throw new NotFoundException('Recurso no encontrado');
    }
    
    const newRecorrido = await this.corridaRepository.preload({
      id,
      ...updateCorridaDto,
      asignacion: asig
    });
    if(!newRecorrido){
      this.logger.warn(`Recorrido con id ${id} no encontrado`);
      throw new NotFoundException('Recurso no encontrado');
    }
    const recorridoActualizado = await this.corridaRepository.save(newRecorrido);
    this.logger.log('Recorrido actualizado');
    this.logger.log(JSON.stringify(recorridoActualizado));
    return recorridoActualizado;
  }

  async remove (id: number) {
    const corrToDelete = await this.corridaRepository.findOneBy({ id });
    if (!corrToDelete) {
      this.logger.warn(`Recorrido con id ${id} no encontrado`);
      throw new NotFoundException('Recurso no encontrado');
    }
    const fechaRecorrido = corrToDelete.fechaRecorrido;
    const fechaActual = new Date();
    const fechaRecorridoDate = new Date(fechaRecorrido);
    if (fechaRecorridoDate < fechaActual) {
      this.logger.warn('No se puede eliminar un recorrido pasado');
      throw new NotFoundException('No se puede eliminar un recorrido pasado');
    }
// Esto lo hizo Jonatan
    const deleteResult = await this.corridaRepository.delete({ id });
    if (deleteResult.affected === 0) {
      this.logger.warn(`Recorrido con id ${id} no encontrado`);
      throw new NotFoundException('Recurso no encontrado');
    }
    this.logger.log('Recorrido eliminado');
    this.logger.log(JSON.stringify(corrToDelete));
    return corrToDelete;
  }

  private async validarAsignacion (idAsignacion: number){
    const asignacion = await this.asignacionRepository.findOne({where: { id: idAsignacion }});
    return asignacion ? true : false;
  }

  private async validarDisponibilidad (fechaRecorrido: string, idVehiculo: number, rutaId?: number){
    let recorridosMismoDia;
    if(rutaId){
       recorridosMismoDia = await this.validarDisponibilidadConRuta(fechaRecorrido, rutaId); 
      }else{
       recorridosMismoDia = await this.validarDisponibilidadConAsignacion(fechaRecorrido);
      }
      
      const recorridosFiltrados = recorridosMismoDia.some((recorrido)=>{
        if(recorrido.asignacion.vehiculo.id === idVehiculo){
          return true;
        }
      });

      return recorridosFiltrados === false;
  }
// Esto lo hizo Jonatan
  private async validarDisponibilidadConRuta (fechaRecorrido: string, rutaId: number){
    return await this.corridaRepository.find(
      {where: {
          fechaRecorrido: fechaRecorrido,
          rutaId: rutaId
        },
        relations: {
          asignacion:{
            vehiculo: true,
          }
        }
      });
  }

  private async validarDisponibilidadConAsignacion (fechaRecorrido: string){
    return await this.corridaRepository.find(
      {where: {
          fechaRecorrido: fechaRecorrido,
        },
        relations: {
          asignacion:{
            vehiculo: true,
          }
        }
      });
  }
}
// Esto lo hizo Jonatan
