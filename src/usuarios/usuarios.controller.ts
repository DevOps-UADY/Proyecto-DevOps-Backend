import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Request, Header } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AppLogger } from '../logger/logger.service';

@Controller('usuarios')
@ApiTags('usuarios')
@ApiTags('usuarios')
export class UsuariosController {
  constructor (private readonly usuariosService: UsuariosService,  private readonly logger: AppLogger) {}

  @Post('register')
  @Header('Access-Control-Allow-Origin', '*')
  create (@Body() createUsuarioDto: CreateUsuarioDto) {
    this.logger.log('Llamando POST /usuarios/register');
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('login')
  @Header('Access-Control-Allow-Origin', '*')
  
  login (@Body() createUsuarioDto: LoginUsuarioDto) {
    this.logger.log('Llamando POST /usuarios/login');
    return this.usuariosService.login(createUsuarioDto);
  }

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  findAll () {
    this.logger.log('Llamando GET /usuarios');
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  findOne (@Param('id') id: string) {
    this.logger.log('Llamando GET /usuarios/:id');
    return this.usuariosService.findOne(id);
  }


  @UseGuards(AuthGuard())
  @Put()
  async update ( @Request() req, @Body() updateUsuarioDto: UpdateUsuarioDto,) {
    this.logger.log('Llamando PUT /usuarios');
    return await this.usuariosService.update(req.user, updateUsuarioDto);
  }


  @UseGuards(AuthGuard())
  @Delete()
  @Header('Access-Control-Allow-Origin', '*')
  async remove (@Request() req) {
    this.logger.log('Llamando DELETE /usuarios');
    return await this.usuariosService.remove(req.user);
  }
}
