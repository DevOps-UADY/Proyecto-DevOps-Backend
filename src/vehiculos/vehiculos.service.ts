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
import { VehiculoDTO } from './dto/vehiculo.dto';

@Injectable()
export class VehiculosService {

  constructor (
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>
  ){ }

  async create (createVehiculoDto: CreateVehiculoDto) {
    try {
      const fileNameUuid = fileNamer(createVehiculoDto.fotografia.extension);
      saveImage(createVehiculoDto.fotografia, fileNameUuid);

      const vehicleEntitie = {
        ...createVehiculoDto,
        fotografia: fileNameUuid,
      };

      const vehiculo = this.vehiculoRepository.create(vehicleEntitie);
      return await this.vehiculoRepository.save(vehiculo);
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async findAll () {
    const vehiculos = await this.vehiculoRepository.find();
    return vehiculos.map(vehiculo => this.mapToDto(vehiculo));
  }

  async findOne (id: number) {
    const vehiculo = await this.vehiculoRepository.findOneBy({ id });
    if (!vehiculo) {
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }
    const vehiculoReturn = this.mapToDto(vehiculo);
    return {
      data: vehiculoReturn
    };
  }

  async update (id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const vehicle = await this.vehiculoRepository.findOneBy({id});

    if (!vehicle) {
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }

    let updateEntitie = {};
    updateEntitie = {
      ...updateVehiculoDto,
    };

    if (vehicle) {
      if (updateVehiculoDto.fotografia) {
        const filePath = routeImage(vehicle.fotografia);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
          } else {
            console.log('Archivo eliminado exitosamente.');
          }
        });

        const fileNameUuid = fileNamer(updateVehiculoDto.fotografia.extension);
        saveImage(updateVehiculoDto.fotografia, fileNameUuid);
        
        updateEntitie = {
          ...updateVehiculoDto,
          fotografia: fileNameUuid,
        };
      }
      await this.vehiculoRepository.update(vehicle.id, updateEntitie);
    }
  }

  async remove (id: number) {
    return await this.vehiculoRepository.softDelete({ id });
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

  private mapToDto (vehiculo: Vehiculo): VehiculoDTO {
    const vehiculoDto: VehiculoDTO = {
      id: vehiculo.id,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      vin: vehiculo.vin,
      placa: vehiculo.placa,
      fechaCompra: vehiculo.fechaCompra,
      costo: vehiculo.costo,
      fotografia: routeImage(vehiculo.fotografia),
      fechaIngresoSistema: vehiculo.fechaIngresoSistema,
    };
  
    return vehiculoDto;
  }
}
