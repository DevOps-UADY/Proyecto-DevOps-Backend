import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/app.config';



describe('UsuariosController', () => {
  let usuariosController: UsuariosController;

  const mockUsuariosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: mockUsuariosService,
        },
        
      ],
      imports:[
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: configuration().JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        })]
      
    }).compile();

    usuariosController = module.get<UsuariosController>(UsuariosController);
  });

  it('should be defined', () => {
    expect(usuariosController).toBeDefined();
  });

  it('create => shuld create a new user by a given data', async () =>{
    const registerDTO = {
      correo: "wgcampos15@gmail.com",
      contrasenia: "Vehsafas#43d2",
      codigoInvitacion: "d2d75302-b71a-4db3-949d-4ef8c7ab546e",
    };

    const register = {
      
        correo: "wgcampos15@gmail.com",
        codigoInvitacion: "d2d75302-b71a-4db3-949d-4ef8c7ab546e",
    
    };

    jest.spyOn(mockUsuariosService, 'create').mockResolvedValue(register);
    const result = await usuariosController.create(registerDTO);
    expect(mockUsuariosService.create).toHaveBeenCalled();
    expect(mockUsuariosService.create).toHaveBeenCalledWith(registerDTO);
    expect(result).toEqual(register);
  });

  
  it('findAll => should return an array of rutas', async () =>{
    const usuarios = [
      {
        id: "e4e5ac9b-a559-4f09-beca-71f54aa97492",
        correo: "wmgc520@gmail.com",
        codigoInvitacion: "d2d75302-b71a-4db3-949d-4ef8c7ab546e",
        latitudDestino: 80,
        longitudDestino: 170
      },
      {
        id: "e4e5ac9b-a559-4f09-beca-71f54aa97292",
        correo: "wmgc5201@gmail.com",
        codigoInvitacion: "d2d75202-b71a-4db3-949d-4ef8c7ab546e",
      },
    ];

    jest.spyOn(mockUsuariosService, 'findAll').mockResolvedValue(usuarios);
    const result = await usuariosController.findAll();
    expect(mockUsuariosService.findAll).toHaveBeenCalled();
    expect(result).toEqual(usuarios);
  });

  it('findOne => should return a specific usuer by a given id', async () =>{
    const usuario = {
      id: "e4e5ac9b-a559-4f09-beca-71f54aa97492",
        correo: "wmgc520@gmail.com",
        codigoInvitacion: "d2d75302-b71a-4db3-949d-4ef8c7ab546e"
      
    };

    jest.spyOn(mockUsuariosService, 'findOne').mockResolvedValue(usuario);
    const result = await usuariosController.findOne("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(mockUsuariosService.findOne).toHaveBeenCalled();
    expect(mockUsuariosService.findOne).toHaveBeenCalledWith("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(result).toEqual(usuario);
  });

  it('update => should update a specific user by a given id and data', async () =>{
    const usuarioDto = {
      contrasenia: "strongPassword#S23F3D"
      
    };

    const usuario = {
      id: 'e4e5ac9b-a559-4f09-beca-71f54aa97492',
      correo: 'wmgc520@gmail.com',
      contrasenia: '$2b$10$UGjxcNHDFCmnvWQoyP/6L.jFoNnutOW.291SxVvt1yfRRVFafOn5m',
      codigoInvitacion: 'd2d75302-b71a-4db3-949d-4ef8c7ab546e'
      
    };

    jest.spyOn(mockUsuariosService, 'update').mockResolvedValue(usuario);
    const result = await usuariosController.update(usuario, usuarioDto);
    expect(mockUsuariosService.update).toHaveBeenCalled();
    expect(result).toEqual(usuario);
  });

  it('remove => should delete a specific user by a given id', async () =>{
    const usuario = {
      id: 'e4e5ac9b-a559-4f09-beca-71f54aa97492',
      correo: 'wmgc520@gmail.com',
      contrasenia: '$2b$10$UGjxcNHDFCmnvWQoyP/6L.jFoNnutOW.291SxVvt1yfRRVFafOn5m',
      codigoInvitacion: 'd2d75302-b71a-4db3-949d-4ef8c7ab546e'
      
    };
    jest.spyOn(mockUsuariosService, 'remove').mockResolvedValue(true);
    const result = await usuariosController.remove(usuario);
    expect(mockUsuariosService.remove).toHaveBeenCalled();
    expect(result).toEqual(true);
  });

});
