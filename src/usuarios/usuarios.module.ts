import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CodigosModule } from 'src/codigos/codigos.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService,JwtStrategy],
  imports:[TypeOrmModule.forFeature([Usuario]),CodigosModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [  ],
    inject: [  ],
    useFactory: (  ) => {
      // console.log('JWT Secret', configService.get('JWT_SECRET') )
      // console.log('JWT SECRET', process.env.JWT_SECRET)
      return {
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn:'2h',
      
          
        }
      }
    }
  })


],
exports:[JwtStrategy,JwtModule,PassportModule]
})
export class UsuariosModule {}
