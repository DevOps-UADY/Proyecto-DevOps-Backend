import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignaciones.entity';
import { Ruta } from '../rutas/entities/ruta.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Conductore } from '../conductores/entities/conductore.entity';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Injectable()
export class AsignacionesService {
    constructor (
        @InjectRepository(Asignacion)
        private readonly asignacionRepository: Repository<Asignacion>,
        @InjectRepository(Ruta)
        private rutaRepository: Repository<Ruta>,
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
        @InjectRepository(Conductore)
        private conductorRepository: Repository<Conductore>
      ) { }
    
      async create (createAsignacionDto:CreateAsignacionDto) {
        const vehiculo = await this.vehiculoRepository.findOne({where: { id: createAsignacionDto.idVehiculo }});
        const conductor = await this.conductorRepository.findOne({where: { id: createAsignacionDto.idConductor }});
    
        if (!vehiculo) {
          throw new NotFoundException('Vehículo con ID ${createAsignacionDto.IDVehiculo} no encontrado');
        }
        if (!conductor) {
          throw new NotFoundException('Conductor con ID ${createAsignacionDto.IDConductor} no encontrado');
        }

        const asig = this.asignacionRepository.create(createAsignacionDto);
        return await this.asignacionRepository.save(asig);
      }
    
      async findAll () {
        return await this.asignacionRepository.find();
      }
    
      async findOne (id: number) {
        const asig = await this.asignacionRepository.findOneBy({ id });
        if (!asig) {
          throw new NotFoundException('Invalid id');
        }
        return asig;
      }
    
      async update (id: number, updateAsignacionDto: UpdateAsignacionDto) {
        const vehiculo = await this.vehiculoRepository.findOne({where: { id: updateAsignacionDto.idVehiculo }});
        const conductor = await this.conductorRepository.findOne({where: { id: updateAsignacionDto.idConductor }});
    
        if (!vehiculo) {
          throw new NotFoundException('Vehículo con ID ${updateAsignacionDto.IDVehiculo} no encontrado');
        }
        if (!conductor) {
          throw new NotFoundException('Conductor con ID ${updateAsignacionDto.IDConductor} no encontrado');
        }

        const updateResult = await this.asignacionRepository.update(id, updateAsignacionDto);
        if (updateResult.affected === 0) {
          throw new NotFoundException('Recurso no encontrado');
        }
        const newAsig = await this.asignacionRepository.findOneBy({ id });
        return newAsig;
      }
    
      async remove (id: number) {
        const asigToDelete = await this.asignacionRepository.findOneBy({ id });
        if (!asigToDelete) {
          throw new NotFoundException('Recurso no encontrado');
        }
    
        const deleteResult = await this.asignacionRepository.softDelete({ id });
        if (deleteResult.affected === 0) {
          throw new NotFoundException('Recurso no encontrado');
        }
        return asigToDelete;
      }
}
