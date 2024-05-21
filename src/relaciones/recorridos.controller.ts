import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RecorridosService } from './recorridos.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { UpdateRecorridoDto } from './dto/update-recorrido.dto';
import { ApiTags } from '@nestjs/swagger';
import { AppLogger } from '../logger/logger.service';

@ApiTags('Recorridos')
@Controller('recorridos')
export class RecorridosController {
  constructor (
    private readonly corridasService: RecorridosService,
    private readonly logger: AppLogger
  ) { }

  @Post()
  create (@Body() createCorridaDto: CreateRecorridoDto) {
    this.logger.log('Llamando POST /recorridos');
    return this.corridasService.create(createCorridaDto);
  }

  @Get()
  findAll () {
    this.logger.log('Llamando GET /recorridos');
    return this.corridasService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    this.logger.log('Llamando GET /recorridos/:id');
    return this.corridasService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateCorridaDto: UpdateRecorridoDto) {
    this.logger.log('Llamando PUT /recorridos/:id');
    return this.corridasService.update(id, updateCorridaDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    this.logger.log('Llamando DELETE /recorridos/:id');
    return this.corridasService.remove(id);
  }
}
