import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
@ApiTags('vehiculos')
@Controller('vehiculos')
export class VehiculosController {
  constructor (private readonly vehiculosService: VehiculosService) {}

  @FormDataRequest()
  @Post()
  @HttpCode(204)
  create (@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  findAll () {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    return this.vehiculosService.findOne(id);
  }

  @Put(':id')
  @FormDataRequest()
  @HttpCode(201)
  update (@Param('id') id: number, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculosService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  @HttpCode(201)
  remove (@Param('id') id: number) {
    return this.vehiculosService.remove(id);
  }
}
