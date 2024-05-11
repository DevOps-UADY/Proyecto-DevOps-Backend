import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignaciones.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Conductore } from '../conductores/entities/conductore.entity';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Injectable()
export class AsignacionesService {
    constructor (
        @InjectRepository(Asignacion)
        private readonly asignacionRepository: Repository<Asignacion>,
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
        @InjectRepository(Conductore)
        private conductorRepository: Repository<Conductore>
      ) { }
    
      async create (createAsignacionDto:CreateAsignacionDto) {
        const vehiculo = await this.vehiculoRepository.findOne({where: { id: createAsignacionDto.idVehiculo }});
        const conductor = await this.conductorRepository.findOne({where: { id: createAsignacionDto.idConductor }});
        
        if (!vehiculo) {
          throw new NotFoundException(`Vehículo con ID ${createAsignacionDto.idVehiculo} no encontrado`);
        }
        if (!conductor) {
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
          console.log('Conductor ya asignado');
          throw new NotFoundException('Conductor ya asignado');
        }

        const asignacion = new Asignacion();
        asignacion.vehiculo = vehiculo;
        asignacion.conductor = conductor;
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
          throw new NotFoundException('Invalid id');
        }
        return asig;
      }
    
      async update (id: number, updateAsignacionDto: UpdateAsignacionDto) {
        const vehiculo = await this.vehiculoRepository.findOne({where: { id: updateAsignacionDto.idVehiculo }});
        const conductor = await this.conductorRepository.findOne({where: { id: updateAsignacionDto.idConductor }});
    
        if (!vehiculo) {
          throw new NotFoundException(`Vehículo con ID ${updateAsignacionDto.idVehiculo} no encontrado`);
        }
        if (!conductor) {
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
          console.log('Vehículo ya asignado');
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
          console.log('Conductor ya asignado');
          throw new NotFoundException('Conductor ya asignado');
        }
        
        const newAsig = await this.asignacionRepository.preload({
          id: id,
          vehiculo: vehiculo,
          conductor: conductor,
          enFuncionamiento: updateAsignacionDto.enFuncionamiento
        });
        
        if (!newAsig) {
          throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
        }
        const newAsignacion = await this.asignacionRepository.save(newAsig);
        return newAsignacion;
      }
    
      async remove (id: number) {
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
      }
}
