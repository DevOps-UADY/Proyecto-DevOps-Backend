import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { AppLogger } from '../logger/logger.service';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { UpdateConductoreDto } from './dto/update-conductore.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('conductores')
@Controller('conductores')
export class ConductoresController {
  constructor (
    private readonly conductoresService: ConductoresService,
    private readonly logger: AppLogger
  ) { }

  @Post()
  create (@Body() createConductoreDto: CreateConductoreDto) {
    this.logger.log('Llamando POST /conductores');
    this.logger.log(JSON.stringify(createConductoreDto));
    return this.conductoresService.create(createConductoreDto);
  }

  @Get()
  findAll () {
    this.logger.log('Llamando GET /conductores');
    return this.conductoresService.findAll();
  }
// d
  @Get(':id')
  findOne (@Param('id') id: number) {
    this.logger.log('Llamando GET /conductores/:id');
    return this.conductoresService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateConductoreDto: UpdateConductoreDto) {
    this.logger.log('Llamando PUT /conductores/:id');
    return this.conductoresService.update(id, updateConductoreDto);
  }
// wind
  @Delete(':id')
  remove (@Param('id') id: number) {
    this.logger.log('Llamando DELETE /conductores/:id');
    return this.conductoresService.remove(id);
  }
}
