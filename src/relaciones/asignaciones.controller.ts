import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Asignaciones')
@Controller('asignaciones')
export class AsignacionesController {
  constructor (private readonly asignacionesService: AsignacionesService) { }

  @Post()
  create (@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionesService.create(createAsignacionDto);
  }

  @Get()
  findAll () {
    return this.asignacionesService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    return this.asignacionesService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionesService.update(id, updateAsignacionDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    return this.asignacionesService.remove(id);
  }
}
