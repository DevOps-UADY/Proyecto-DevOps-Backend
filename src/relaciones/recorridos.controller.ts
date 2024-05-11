import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RecorridosService } from './recorridos.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { UpdateRecorridoDto } from './dto/update-recorrido.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recorridos')
@Controller('recorridos')
export class RecorridosController {
  constructor (private readonly corridasService: RecorridosService) { }

  @Post()
  create (@Body() createCorridaDto: CreateRecorridoDto) {
    return this.corridasService.create(createCorridaDto);
  }

  @Get()
  findAll () {
    return this.corridasService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    return this.corridasService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateCorridaDto: UpdateRecorridoDto) {
    return this.corridasService.update(id, updateCorridaDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    return this.corridasService.remove(id);
  }
}
