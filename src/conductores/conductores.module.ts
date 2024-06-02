import { Module } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductore } from './entities/conductore.entity'
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conductore]),
    LoggerModule
  ],
  controllers: [ConductoresController],
  providers: [ConductoresService],
})
export class ConductoresModule { }
