import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { ApiTags } from '@nestjs/swagger';
import { AppLogger } from '../logger/logger.service';

@ApiTags('Asignaciones')
@Controller('asignaciones')
export class AsignacionesController {
  constructor (
    private readonly asignacionesService: AsignacionesService,
    private readonly logger: AppLogger
  ) { }

  @Post()
  create (@Body() createAsignacionDto: CreateAsignacionDto) {
    this.logger.log('Llamando POST /asignaciones');
    return this.asignacionesService.create(createAsignacionDto);
  }

  @Get()
  findAll () {
    this.logger.log('Llamando GET /asignaciones');
    return this.asignacionesService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    this.logger.log('Llamando GET /asignaciones/:id');
    return this.asignacionesService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateAsignacionDto: UpdateAsignacionDto) {
    this.logger.log('Llamando PUT /asignaciones/:id');
    return this.asignacionesService.update(id, updateAsignacionDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    this.logger.log('Llamando DELETE /asignaciones/:id');
    return this.asignacionesService.remove(id);
  }
}
