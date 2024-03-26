import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rutas')
@Controller('rutas')
export class RutasController {
  constructor (private readonly rutasService: RutasService) {}

  @Post()
  create (@Body() createRutaDto: CreateRutaDto) {
    return this.rutasService.create(createRutaDto);
  }

  @Get()
  findAll () {
    return this.rutasService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    return this.rutasService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateRutaDto: UpdateRutaDto) {
    return this.rutasService.update(id, updateRutaDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    return this.rutasService.remove(id);
  }
}
