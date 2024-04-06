import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CorridasService } from './corridas.service';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Corridas')
@Controller('corridas')
export class CorridasController {
  constructor (private readonly corridasService: CorridasService) { }

  @Post()
  create (@Body() createCorridaDto: CreateCorridaDto) {
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
  update (@Param('id') id: number, @Body() updateCorridaDto: UpdateCorridaDto) {
    return this.corridasService.update(id, updateCorridaDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    return this.corridasService.remove(id);
  }
}
