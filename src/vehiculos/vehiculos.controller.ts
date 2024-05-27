import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { AppLogger } from '../logger/logger.service';

@ApiTags('vehiculos')
@Controller('vehiculos')
export class VehiculosController {
  constructor (
    private readonly vehiculosService: VehiculosService,
    private readonly logger: AppLogger
  ) {}

  @FormDataRequest()
  @Post()
  @HttpCode(201)
  create (@Body() createVehiculoDto: CreateVehiculoDto) {
    this.logger.log('Llamando POST /vehiculos');
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  findAll () {
    this.logger.log('Llamando GET /vehiculos');
    return this.vehiculosService.findAll();
  }

  @Get('total')
  findTotal () {
    this.logger.log('Llamando GET /totalVehiculos');
    return this.vehiculosService.findTotal();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    this.logger.log('Llamando GET /vehiculos/:id');
    return this.vehiculosService.findOne(id);
  }

  @Put(':id')
  @FormDataRequest()

  async update (@Param('id') id: number, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    this.logger.log('Llamando PUT /vehiculos/:id');
    return await this.vehiculosService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  
  remove (@Param('id') id: number) {
    this.logger.log('Llamando DELETE /vehiculos/:id');
    return this.vehiculosService.remove(id);
  }
}
