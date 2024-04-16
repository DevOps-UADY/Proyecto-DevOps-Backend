import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CodigosModule } from '../codigos/codigos.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import configuration from '../config/app.config';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService,JwtStrategy],
  imports:[TypeOrmModule.forFeature([Usuario]),CodigosModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: configuration().JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  exports:[JwtStrategy,JwtModule,PassportModule]
})

export class UsuariosModule {}
