import { Module } from '@nestjs/common';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RutasModule } from './rutas/rutas.module';
import { AsignacionesModule } from './relaciones/asignaciones.module';
import { CorridasModule } from './relaciones/corridas.module';
import { ConductoresModule } from './conductores/conductores.module';
import { CodigosModule } from './codigos/codigos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import configuration from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: configuration().host,
        port: configuration().port,
        username: configuration().username,
        password: configuration().password,
        database: configuration().database,
        autoLoadEntities: configuration().autoLoadEntities,
        synchronize: configuration().synchronize,
      }),
    }),
    VehiculosModule,
    RutasModule,
    CodigosModule,
    UsuariosModule,
    ConductoresModule,
    AsignacionesModule,
    CorridasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
