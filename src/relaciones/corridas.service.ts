import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Corrida } from './entities/corridas.entity';
import { Ruta } from '../rutas/entities/ruta.entity'
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';

@Injectable()
export class CorridasService {
    constructor (
        @InjectRepository(Corrida)
        private readonly corridaRepository: Repository<Corrida>,
        @InjectRepository(Ruta)
        private rutaRepository: Repository<Ruta>
      ) { }
    
      async create (createCorridaDto: CreateCorridaDto) {
        const ruta = await this.rutaRepository.findOne({where: { id: createCorridaDto.idRuta }});

        if (!ruta) {
          throw new NotFoundException('Ruta con ID ${createAsignacionDto.IDRuta} no encontrado');
        }

        const corr = this.corridaRepository.create(createCorridaDto);
        return await this.corridaRepository.save(corr);
      }
    
      async findAll () {
        return await this.corridaRepository.find();
      }
    
      async findOne (id: number) {
        const corr = await this.corridaRepository.findOneBy({ id });
        if (!corr) {
          throw new NotFoundException('Invalid id');
        }
        return corr;
      }
    
      async update (id: number, updateCorridaDto: UpdateCorridaDto) {
        const ruta = await this.rutaRepository.findOne({where: { id: updateCorridaDto.idRuta }});

        if (!ruta) {
          throw new NotFoundException('Ruta con ID ${createAsignacionDto.IDRuta} no encontrado');
        }

        const updateResult = await this.corridaRepository.update(id, updateCorridaDto);
        if (updateResult.affected === 0) {
          throw new NotFoundException('Recurso no encontrado');
        }
        const newCorr = await this.corridaRepository.findOneBy({ id });
        return newCorr;
      }
    
      async remove (id: number) {
        const corrToDelete = await this.corridaRepository.findOneBy({ id });
        if (!corrToDelete) {
          throw new NotFoundException('Recurso no encontrado');
        }
    
        const deleteResult = await this.corridaRepository.softDelete({ id });
        if (deleteResult.affected === 0) {
          throw new NotFoundException('Recurso no encontrado');
        }
        return corrToDelete;
      }
}
