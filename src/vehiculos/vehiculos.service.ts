import { Injectable } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiculosService {

  constructor (
    @InjectRepository(Vehiculo)
    // Para acceder a los métodos
    private readonly vehiculoRepository: Repository<Vehiculo>
  ){ }

  async create (createVehiculoDto: CreateVehiculoDto) {
    const vehiculo = this.vehiculoRepository.create(createVehiculoDto);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async findAll () {
    return await this.vehiculoRepository.find();
  }

  async findOne (id: number) {
    return await this.vehiculoRepository.findOneBy({ id });
  }

  async update (id: number, updateVehiculoDto: UpdateVehiculoDto) {
    return await this.vehiculoRepository.update(id, updateVehiculoDto);
  }

  async remove (id: number) {
    // Pone fecha de eliminación, no lo elimina, pero si hacemos get no lo regresa en el array
    return await this.vehiculoRepository.softDelete({ id });
  }
}
