import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { Codigo } from '../codigos/entities/codigo.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuariosService {

  constructor (
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
    @InjectRepository(Codigo)
    private codigoModel: Repository<Codigo>,
    private readonly jwtService: JwtService,
  ) { }

  async create (createUsuarioDto: CreateUsuarioDto) {
  
    // validamos el código de invitación
    const codigoInvitacionDb = await this.codigoModel.findOneBy({
      id: createUsuarioDto.codigoInvitacion
    });
  
    if (!codigoInvitacionDb)
      throw new NotFoundException('El código no existe');
  
    if (!codigoInvitacionDb.isActive)
      throw new BadRequestException('El código de invitación es inválido');
  
    try {
      // Guardamos en la base de datos
      const usuarioCreado = this.usuarioModel.create(createUsuarioDto);
      const usuarioSaved = await this.usuarioModel.save(usuarioCreado);
      delete usuarioSaved.contrasenia;
  
      // actualizamos el estado del código
      await this.codigoModel.save({
        ...codigoInvitacionDb,
        isActive: false
      });
      return {
         ...usuarioSaved,
        token: this.getJwtToken({ id: usuarioSaved.id })
      };
    } catch (error) {
     
      this.dbErrors(error)
      console.log(error);
      this.dbErrors(error);
    }
  }

  async login (loginUsuarioDto: LoginUsuarioDto) {
    const user = await this.usuarioModel.findOneBy({ correo: loginUsuarioDto.correo });
    if (!user || loginUsuarioDto.contrasenia !== user.contrasenia)
      throw new BadRequestException('Correo o contraseña incorrecta');
    
    return {
      ...user,
      jwt: this.getJwtToken({ id: user.id })
    };
  }

  async findAll () {
    try {
      const usuarios = await this.usuarioModel.find({
        select: ['id', 'correo', 'codigoInvitacion']
      })
      return {
        usuarios
      };
    } catch (error) {
      
      throw new InternalServerErrorException('Llame al administrador')
    }
  }

  async findOne (id: string) {
    const usuario = await this.usuarioModel.findOneBy({
      id
    })

    if (!usuario)
      throw new NotFoundException('Usuario no encontrado id:' + id)

    delete usuario.contrasenia

    return {
      ...usuario
    };
  }

  async update (user: Usuario, updateUsuarioDto: UpdateUsuarioDto) {
   
    user.contrasenia = updateUsuarioDto.contrasenia
    const usuarioCreado = this.usuarioModel.create(user)
    const usuarioSaved = await this.usuarioModel.save(usuarioCreado);
    delete usuarioSaved.contrasenia
    return { ...usuarioSaved };
  }

  async remove (user: Usuario) {
    try {
      await this.usuarioModel.delete({ id: user.id })
      return {
        mensaje: 'Usuario borrado correctamente'
      }
    } catch (error) {
      
      throw new BadRequestException('No se encontró el usuario')
    }

  }

  private getJwtToken (payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;

  }

  private dbErrors (error) {
   
    if (error.code == 1062) {
      throw new ConflictException(error.detail)
    } 
    if(error.code==23505){
      throw new ConflictException(error.detail)
    }
    else {
      throw new InternalServerErrorException('Llame al administrador')
    }
  }

}
