import { Module } from '@nestjs/common';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RutasModule } from './rutas/rutas.module';
import { ConductoresModule } from './conductores/conductores.module';
import configuration from './config/app.config';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
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
    ConductoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
