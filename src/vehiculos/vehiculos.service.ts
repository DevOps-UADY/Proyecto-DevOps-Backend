import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Not, Repository } from 'typeorm';
import { fileNamer } from './helpers/fileNamer.helper';
import { saveImage } from './helpers/saveImage.helper';
import * as fs from 'node:fs';
import { routeImage } from './helpers/routeImage.helper';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class VehiculosService {

  constructor (
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    private readonly logger: AppLogger
  ) { }

  async create (createVehiculoDto: CreateVehiculoDto) {
    const existePlaca = await this.vehiculoRepository.findOne({ 
      where: { placa: createVehiculoDto.placa }
    });

    if (existePlaca) {
      this.logger.warn(`Ya existe un vehículo con la misma placa: ${createVehiculoDto.placa}`);
      throw new BadRequestException(`Ya existe un vehículo con la misma placa`);
    }

    const existeVin = await this.vehiculoRepository.findOne({ 
      where: { vin: createVehiculoDto.vin }
    });

    if (existeVin) {
      this.logger.warn(`Ya existe un vehículo con el mismo vin: ${createVehiculoDto.vin}`);
      throw new BadRequestException(`Ya existe un vehículo con el mismo vin`);
    }

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
        ...vehiculo
      };

    } catch (error) {
      this.logger.log(`Ocurrió un error inesperado al intentar agregar el vehiculo`);
      this.handleDbException(error);
    }
  }

  async findAll () {
    const vehiculosDB = await this.vehiculoRepository.find({
      select: ['id', 'marca', 'modelo', 'vin', 'placa', 'fechaCompra', 'costo', 'fotografia', 'fechaIngresoSistema', 'estatusAsignacion']
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

  async findTotal () {
    const totalVehiculosDB = await this.vehiculoRepository.count();

    return {
      cantidad: totalVehiculosDB
    };
  }

  async findOne (id: number) {
    const vehiculo = await this.vehiculoRepository.findOne({ 
      where: { id },
      select: ['id', 'marca', 'modelo', 'vin', 'placa', 'fechaCompra', 'costo', 'fotografia', 'fechaIngresoSistema', 'estatusAsignacion']
    });

    if (!vehiculo) {
      this.logger.warn(`No se encontró ningún vehículo con el ID: ${id}`);
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }

    vehiculo.fotografia = routeImage(vehiculo.fotografia);

    return {
      message: `Vehículo con el ID ${id} recuperado correctamente`,
      ...vehiculo
    };
  }

  async update (id: number, updateVehiculoDto: UpdateVehiculoDto) {
    if (Object.keys(updateVehiculoDto).length === 0) {
      throw new BadRequestException('Se debe enviar mínimo una propiedad a editar')
    }

    const vehiculo = await this.vehiculoRepository.findOneBy({ id });

    if (!vehiculo) {
      this.logger.warn(`No se encontró ningún vehículo con el ID: ${id}`);
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }

    if(updateVehiculoDto.placa !== "" && updateVehiculoDto.placa !== null && updateVehiculoDto.placa !== undefined){

      const existePlaca = await this.vehiculoRepository.exists({ 
        where: { placa: updateVehiculoDto.placa, id: Not(id)}
      });

      if (existePlaca) {
        this.logger.warn(`Ya existe un vehículo con la misma placa: ${updateVehiculoDto.placa}`);
        throw new BadRequestException(`Ya existe un vehículo con la misma placa`);
      }
      
    }

    if(updateVehiculoDto.vin !== "" && updateVehiculoDto.vin !== null && updateVehiculoDto.vin !== undefined){

      const existeVin = await this.vehiculoRepository.exists({ 
        where: { vin: updateVehiculoDto.vin, id: Not(id)}
      });
      console.log(existeVin);
      if (existeVin) {
        this.logger.warn(`Ya existe un vehículo con el mismo vin: ${updateVehiculoDto.vin}`);
        throw new BadRequestException(`Ya existe un vehículo con el mismo vin`);
      }
      
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
            this.logger.log(`Error al eliminar el archivo: ${err} del vehiculo ${id}`);
            console.error('Error al eliminar el archivo:', err);
          } else {
            this.logger.log(`Archivo del vehiculo ${id} eliminado exitosamente`);
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
      
      return {
        ...vehiculo,
        ...updateVehiculoDto
      }
    }
  }

  async remove (id: number) {
    const vehiculo = await this.vehiculoRepository.findOneBy({ id });

    if (!vehiculo) {
      this.logger.warn(`No se encontró ningún vehículo con el ID: ${id}`);
      throw new BadRequestException(`No se encontró ningún vehículo con el ID ${id}`);
    }
    await this.vehiculoRepository.delete({ id })
    return {...vehiculo};
  }

  private handleDbException (error) {
    this.logger.log(`${error}`);
    if (error.code) {
      throw new ConflictException(error.detail);
    } else {
      throw new InternalServerErrorException(
        `Cant create  - Check server logs`,
      );
    }
  }
}
