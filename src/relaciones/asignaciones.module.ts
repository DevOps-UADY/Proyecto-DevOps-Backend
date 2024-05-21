import { Module } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignaciones.entity'
import { Ruta } from '../rutas/entities/ruta.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Conductore } from '../conductores/entities/conductore.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asignacion,
      Ruta,
      Vehiculo,
      Conductore
    ]),
    LoggerModule
  ],
  controllers: [AsignacionesController],
  providers: [AsignacionesService],
})
export class AsignacionesModule {}
