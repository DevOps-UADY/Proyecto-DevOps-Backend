import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { UpdateConductoreDto } from './dto/update-conductore.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('conductores')
@Controller('conductores')
export class ConductoresController {
  constructor (private readonly conductoresService: ConductoresService) { }

  @Post()
  create (@Body() createConductoreDto: CreateConductoreDto) {
    return this.conductoresService.create(createConductoreDto);
  }

  @Get()
  findAll () {
    return this.conductoresService.findAll();
  }

  @Get(':id')
  findOne (@Param('id') id: number) {
    return this.conductoresService.findOne(id);
  }

  @Put(':id')
  update (@Param('id') id: number, @Body() updateConductoreDto: UpdateConductoreDto) {
    return this.conductoresService.update(id, updateConductoreDto);
  }

  @Delete(':id')
  remove (@Param('id') id: number) {
    return this.conductoresService.remove(id);
  }
}
