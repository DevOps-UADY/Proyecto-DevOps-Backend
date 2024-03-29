import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutasService {

  constructor (
    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>
  ) { }

  async create (createRutaDto: CreateRutaDto) {
    const ruta = this.rutaRepository.create(createRutaDto);
    return await this.rutaRepository.save(ruta);
  }

  async findAll () {
    return await this.rutaRepository.find();
  }

  async findOne (id: number) {
    const ruta = await this.rutaRepository.findOneBy({ id });
    if (!ruta) {
      throw new NotFoundException('Invalid id');
    }
    return ruta;
  }

  async update (id: number, updateRutaDto: UpdateRutaDto) {
    const updateResult = await this.rutaRepository.update(id, updateRutaDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException('Recurso no encontrado');
    }
    const Rutamodificada = await this.rutaRepository.findOneBy({ id });
    return Rutamodificada;
  }

  async remove (id: number) {
    const rutaToDelete = await this.rutaRepository.findOneBy({ id });
    if (!rutaToDelete) {
      throw new NotFoundException('Recurso no encontrado');
    }

    const deleteResult = await this.rutaRepository.softDelete({ id });
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Recurso no encontrado');
    }
    return rutaToDelete;
  }
}
