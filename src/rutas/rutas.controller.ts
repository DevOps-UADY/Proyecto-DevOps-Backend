import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { AppLogger } from '../logger/logger.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rutas')
@Controller('rutas')
export class RutasController {
  constructor (
    private readonly rutasService: RutasService, 
    private readonly logger: AppLogger
  ) { }

  @Post()
  create (@Body() createRutaDto: CreateRutaDto) {
    this.logger.log('Llamando POST /rutas');
    this.logger.log(JSON.stringify(createRutaDto));
    return this.rutasService.create(createRutaDto);
  }

  @Get()
  findAll () {
    this.logger.log('Llamando GET /rutas');
    return this.rutasService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    this.logger.log('Llamando GET /rutas/:id');
    return this.rutasService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateRutaDto: UpdateRutaDto) {
    this.logger.log('Llamando PUT /rutas/:id');
    return this.rutasService.update(id, updateRutaDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    this.logger.log('Llamando DELETE /rutas/:id');
    return this.rutasService.remove(id);
  }
}
