import { Module } from '@nestjs/common';
import { CorridasService } from './corridas.service';
import { CorridasController } from './corridas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corrida } from './entities/corridas.entity'
import { Ruta } from '../rutas/entities/ruta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Corrida,Ruta])],
  controllers: [CorridasController],
  providers: [CorridasService],
})
export class CorridasModule {}
