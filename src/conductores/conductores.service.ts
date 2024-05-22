import {Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { UpdateConductoreDto } from './dto/update-conductore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conductore } from './entities/conductore.entity';
import { Repository } from 'typeorm';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class ConductoresService {

  constructor (
    @InjectRepository(Conductore)
    private readonly conductoreRepository: Repository<Conductore>,
    private readonly logger: AppLogger
  ) { }

  async create (createConductoreDto: CreateConductoreDto) {
    const conductor = this.conductoreRepository.create(createConductoreDto);
    const curp = conductor.curp;
    const numeroLicencia = conductor.numeroLicencia;

    const existCurp = await this.conductoreRepository.findOneBy({ curp });
    const existLicense = await this.conductoreRepository.findOneBy({ numeroLicencia });

  if (existCurp || existLicense) {
      throw new ConflictException('El conductor ingresado ya existe');
    }
    return await this.conductoreRepository.save(conductor);
  }

  async findAll () {
    return await this.conductoreRepository.find({ 
        select: [
            "id",
            "nombreConductor",
            "fechaNacimiento",
            "curp",
            "direccionCasa",
            "salario",
            "numeroLicencia",
            "fechaIngresoSistemaConductor"
        ]
    });
  }

  async findOne (id: number) {
    const conductor = await this.conductoreRepository.findOne({ 
        where: { id },
        select: [
            'id',
            'nombreConductor',
            'fechaNacimiento',
            'curp',
            'direccionCasa',
            'salario',
          'numeroLicencia',
          'fechaIngresoSistemaConductor'
      ]
    });

    if (!conductor) {
      this.logger.warn(`Conductor con id ${id} no encontrada`);
      throw new NotFoundException('ID invalido');
    }
    this.logger.log(`Conductor con id ${id} encontrada`);
    this.logger.log(JSON.stringify(conductor));
    return conductor;
  }

  async update (id: number, updateConductoreDto: UpdateConductoreDto) {
    const updateResult = await this.conductoreRepository.update(id, updateConductoreDto);
    if (updateResult.affected === 0) {
      this.logger.warn(`Conductor con id ${id} no encontrada`);
      throw new NotFoundException('Recurso no encontrado');
    }
    this.logger.log(`Conductor con id ${id} modificado`);
    this.logger.log(JSON.stringify(updateConductoreDto));
    const conductorModificado = await this.conductoreRepository.findOneBy({ id });
    return conductorModificado;
  }

  async remove (id: number) {
    const conductorToDelete = await this.conductoreRepository.findOneBy({ id });
    if (!conductorToDelete) {
      this.logger.warn(`Conductor con id ${id} no encontrada`);
      throw new NotFoundException('Recurso no encontrado');
    }

    const deleteResult = await this.conductoreRepository.softDelete({ id });
    if (deleteResult.affected === 0) {
      this.logger.warn(`Conductor con id ${id} no encontrada`);
      throw new NotFoundException('Recurso no encontrado');
    }
    this.logger.log(`Conductor con id ${id} eliminada`);
    this.logger.log(JSON.stringify(conductorToDelete));
    return conductorToDelete;
  }
}
