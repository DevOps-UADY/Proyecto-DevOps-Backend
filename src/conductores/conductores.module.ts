import { Module } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductore } from './entities/conductore.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Conductore])],
  controllers: [ConductoresController],
  providers: [ConductoresService],
})
export class ConductoresModule { }
