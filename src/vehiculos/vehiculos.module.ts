import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculo]), 
    NestjsFormDataModule,
    LoggerModule
  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}
