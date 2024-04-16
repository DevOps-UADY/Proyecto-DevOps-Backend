import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { UpdateConductoreDto } from './dto/update-conductore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conductore } from './entities/conductore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConductoresService {

  constructor (
    @InjectRepository(Conductore)
    private readonly conductoreRepository: Repository<Conductore>
  ) { }

  async create (createConductoreDto: CreateConductoreDto) {
    const conductor = this.conductoreRepository.create(createConductoreDto);
    return await this.conductoreRepository.save(conductor);
  }

  async findAll () {
    return await this.conductoreRepository.find();
  }

  async findOne (id: number) {
    const conductor = await this.conductoreRepository.findOneBy({ id });
    if (!conductor) {
      throw new NotFoundException('Invalid id');
    }
    return conductor;
  }

  async update (id: number, updateConductoreDto: UpdateConductoreDto) {
    const updateResult = await this.conductoreRepository.update(id, updateConductoreDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException('Recurso no encontrado');
    }
    const conductorModificado = await this.conductoreRepository.findOneBy({ id });
    return conductorModificado;
  }

  async remove (id: number) {
    const conductorToDelete = await this.conductoreRepository.findOneBy({ id });
    if (!conductorToDelete) {
      throw new NotFoundException('Recurso no encontrado');
    }

    const deleteResult = await this.conductoreRepository.softDelete({ id });
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Recurso no encontrado');
    }
    return conductorToDelete;
  }
}
