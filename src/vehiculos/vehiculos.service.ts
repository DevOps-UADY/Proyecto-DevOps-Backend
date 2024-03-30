import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { fileNamer } from './helpers/fileNamer.helper';
import { saveImage } from './helpers/saveImage.helper';
import * as fs from 'node:fs';
import { routeImage } from './helpers/routeImage.helper';

@Injectable()
export class VehiculosService {

  constructor (
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>
  ) { }

  async create (createVehiculoDto: CreateVehiculoDto) {
    try {
      const fileNameUuid = fileNamer(createVehiculoDto.fotografia.extension);
      saveImage(createVehiculoDto.fotografia, fileNameUuid);

      const entidadVehiculo = {
        ...createVehiculoDto,
        fotografia: fileNameUuid,
      };

      const vehiculo = this.vehiculoRepository.create(entidadVehiculo);
      await this.vehiculoRepository.save(vehiculo);

      return {
        message: `Vehículo guardado correctamente`,
        data: vehiculo
      };

    } catch (error) {
      this.handleDbException(error);
    }
  }

  async findAll () {
    const vehiculosDB = await this.vehiculoRepository.find({
      select: ['id', 'marca', 'modelo', 'vin', 'placa', 'fechaCompra', 'costo', 'fotografia', 'fechaIngresoSistema']
    });

    const vehiculos = vehiculosDB.map(vehiculo => ({
      ...vehiculo,
      fotografia: routeImage(vehiculo.fotografia)
    }));

    return {
      message: `Vehículos recuperados correctamente`,
      data: vehiculos
    };
  }

  async findOne (id: number) {
    const vehiculo = await this.vehiculoRepository.findOne({ 
      where: { id },
      select: ['id', 'marca', 'modelo', 'vin', 'placa', 'fechaCompra', 'costo', 'fotografia', 'fechaIngresoSistema']
    });

    if (!vehiculo) {
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }

    vehiculo.fotografia = routeImage(vehiculo.fotografia);

    return {
      message: `Vehículo con el ID ${id} recuperado correctamente`,
      data: vehiculo
    };
  }

  async update (id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.vehiculoRepository.findOneBy({ id });

    if (!vehiculo) {
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }

    let entidadVehiculo = {};
    entidadVehiculo = {
      ...updateVehiculoDto,
    };

    if (vehiculo) {
      if (updateVehiculoDto.fotografia) {
        const filePath = routeImage(vehiculo.fotografia);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
          } else {
            console.log('Archivo eliminado exitosamente.');
          }
        });

        const fileNameUuid = fileNamer(updateVehiculoDto.fotografia.extension);
        saveImage(updateVehiculoDto.fotografia, fileNameUuid);

        entidadVehiculo = {
          ...updateVehiculoDto,
          fotografia: fileNameUuid,
        };
      }
      
      await this.vehiculoRepository.update(vehiculo.id, entidadVehiculo);
    }
  }

  async remove (id: number) {
    const vehiculo = await this.vehiculoRepository.findOneBy({ id });

    if (!vehiculo) {
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }

    return await this.vehiculoRepository.delete({ id });
  }

  private handleDbException (error) {
    if (error.code === 11000) {
      throw new BadRequestException('Ya existe');
    } else {
      throw new InternalServerErrorException(
        `Cant create  - Check server logs`,
      );
    }
  }
}
