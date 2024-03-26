import { Module } from '@nestjs/common';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app.config';

@Module({
  imports: [
    VehiculosModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
