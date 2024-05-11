import { Module } from '@nestjs/common';
import { RecorridosService } from './recorridos.service';
import { RecorridosController } from './recorridos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recorrido } from './entities/recorridos.entity'
import { Asignacion } from './entities/asignaciones.entity';
import { Ruta } from 'src/rutas/entities/ruta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recorrido, Asignacion, Ruta])],
  controllers: [RecorridosController],
  providers: [RecorridosService],
})
export class RecorridosModule {}
