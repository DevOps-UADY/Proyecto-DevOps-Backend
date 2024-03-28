import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('usuarios')
@ApiTags('codigos')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() createUsuarioDto: LoginUsuarioDto) {
    return this.usuariosService.login(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }
  @UseGuards(AuthGuard())
  @Put()
  async update( @Body() updateUsuarioDto: UpdateUsuarioDto,@Request() req) {
    return await this.usuariosService.update(req.user, updateUsuarioDto);
  }
  @UseGuards(AuthGuard())
  @Delete()
  async remove(@Request() req) {
    return await this.usuariosService.remove(req.user);
  }
}
