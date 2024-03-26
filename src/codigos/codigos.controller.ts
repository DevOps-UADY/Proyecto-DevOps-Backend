import { Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { CodigosService } from './codigos.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('codigos')
@ApiTags('codigos')
export class CodigosController {
  constructor (private readonly codigosService: CodigosService) {}

  @Post()
  create () {
    return this.codigosService.create();
  }

  @Get()
  findAll () {
    return this.codigosService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.codigosService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: string) {
    return this.codigosService.update(id);
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.codigosService.remove(id);
  }
}
