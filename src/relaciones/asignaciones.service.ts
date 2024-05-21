import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignaciones.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Conductore } from '../conductores/entities/conductore.entity';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class AsignacionesService {
    constructor (
        @InjectRepository(Asignacion)
        private readonly asignacionRepository: Repository<Asignacion>,
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
        @InjectRepository(Conductore)
        private conductorRepository: Repository<Conductore>,
        private readonly logger: AppLogger
      ) { }
    
      async create (createAsignacionDto:CreateAsignacionDto) {
        const vehiculo = await this.vehiculoRepository.findOne({where: { id: createAsignacionDto.idVehiculo }});
        const conductor = await this.conductorRepository.findOne({where: { id: createAsignacionDto.idConductor }});
        
        if (!vehiculo) {
          this.logger.warn(`Vehículo con ID ${createAsignacionDto.idVehiculo} no encontrado`);
          throw new NotFoundException(`Vehículo con ID ${createAsignacionDto.idVehiculo} no encontrado`);
        }
        if (!conductor) {
          this.logger.warn(`Conductor con ID ${createAsignacionDto.idConductor} no encontrado`);
          throw new NotFoundException(`Conductor con ID ${createAsignacionDto.idConductor} no encontrado`);
        }
        
        const vehiculoAsignacion = await this.asignacionRepository.findOne(
          {where: { 
            vehiculo:{
              id: createAsignacionDto.idVehiculo
            }
          },
            relations: {
              vehiculo:true
            }
          }
        );
        
        if (vehiculoAsignacion && vehiculoAsignacion.vehiculo.id === createAsignacionDto.idVehiculo) {
          console.log('Vehículo ya asignado');
          throw new NotFoundException('Vehículo ya asignado');
        }

        const conductorAsignacion = await this.asignacionRepository.findOne(
          {where: { 
            conductor:{
              id: createAsignacionDto.idConductor
            }
          },
            relations: {
              conductor:true
            }
          }
        );

        if (conductorAsignacion && conductorAsignacion.conductor.id === createAsignacionDto.idConductor) {
          this.logger.warn('Conductor ya asignado');
          throw new NotFoundException('Conductor ya asignado');
        }

        const asignacion = new Asignacion();
        asignacion.vehiculo = vehiculo;
        asignacion.conductor = conductor;
        this.logger.log('Asignación creada');
        this.logger.log(JSON.stringify(asignacion));
        return await this.asignacionRepository.save(asignacion);
      }
    
      async findAll () {
        return await this.asignacionRepository.find({relations: ['vehiculo', 'conductor']});
      }
    
      async findOne (id: number) {
        const asig = await this.asignacionRepository.findOne({ 
          where: { id },
          relations: ['vehiculo', 'conductor']
        });

        if (!asig) {
          this.logger.warn(`Asignación con id ${id} no encontrada`);
          throw new NotFoundException('Invalid id');
        }
        this.logger.log(`Asignación con id ${id} encontrada`);
        this.logger.log(JSON.stringify(asig));
        return asig;
      }
    
      async update (id: number, updateAsignacionDto: UpdateAsignacionDto) {
        const vehiculo = await this.vehiculoRepository.findOne({where: { id: updateAsignacionDto.idVehiculo }});
        const conductor = await this.conductorRepository.findOne({where: { id: updateAsignacionDto.idConductor }});
    
        if (!vehiculo) {
          this.logger.warn(`Vehículo con ID ${updateAsignacionDto.idVehiculo} no encontrado`);
          throw new NotFoundException(`Vehículo con ID ${updateAsignacionDto.idVehiculo} no encontrado`);
        }
        if (!conductor) {
          this.logger.warn(`Conductor con ID ${updateAsignacionDto.idConductor} no encontrado`);
          throw new NotFoundException(`Conductor con ID ${updateAsignacionDto.idConductor} no encontrado`);
        }

        const vehiculoAsignacion = await this.asignacionRepository.findOne(
          {where: { 
            vehiculo:{
              id: updateAsignacionDto.idVehiculo
            }
          },
            relations: {
              vehiculo:true
            }
          }
        );
        if (vehiculoAsignacion && vehiculoAsignacion.vehiculo.id === updateAsignacionDto.idVehiculo) {
          this.logger.warn('Vehículo ya asignado');
          this.logger.debug(JSON.stringify(vehiculoAsignacion));
          throw new NotFoundException('Vehículo ya asignado');
        }

        const conductorAsignacion = await this.asignacionRepository.findOne(
          {where: { 
            conductor:{
              id: updateAsignacionDto.idConductor
            }
          },
            relations: {
              conductor:true
            }
          }
        );
        if (conductorAsignacion && conductorAsignacion.conductor.id === updateAsignacionDto.idConductor) {
          this.logger.warn('Conductor ya asignado');
          this.logger.debug(JSON.stringify(conductorAsignacion));
          throw new NotFoundException('Conductor ya asignado');
        }
        
        const newAsig = await this.asignacionRepository.preload({
          id: id,
          vehiculo: vehiculo,
          conductor: conductor,
          enFuncionamiento: updateAsignacionDto.enFuncionamiento
        });
        
        if (!newAsig) {
          this.logger.log(`Asignación con ID ${id} no encontrada`);
          this.logger.debug(`Asignación con ID ${id} no encontrada`);
          throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
        }
        const newAsignacion = await this.asignacionRepository.save(newAsig);
        this.logger.log(`Asignación con ID ${id} modificada`);
        this.logger.debug(JSON.stringify(newAsignacion));
        return newAsignacion;
      }
    
      async remove (id: number) {
        try{
          const asigToDelete = await this.asignacionRepository.findOne({ 
            where: { id },
            relations: ['vehiculo', 'conductor']
          });
  
          if (!asigToDelete) {
            throw new NotFoundException('Recurso no encontrado');
          }
  
          const deleteResult = await this.asignacionRepository.delete({ id });
          if (deleteResult.affected === 0) {
            throw new NotFoundException('Recurso no encontrado');
          }
          return asigToDelete;
        }catch(e){
          this.logger.error(e.message, e.trace);
          throw new HttpException('No se puede borrar ya que se tiene una relación con recorridos', 409);
        }

      }
}
