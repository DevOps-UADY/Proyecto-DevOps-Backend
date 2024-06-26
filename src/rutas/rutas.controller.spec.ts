import { Test, TestingModule } from '@nestjs/testing';
import { RutasController } from './rutas.controller';
import { RutasService } from './rutas.service';
import { AppLogger } from '../logger/logger.service';

describe('RutasController', () => {
  let rutasController: RutasController;

  const mockRutaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RutasController],
      providers: [
        {
          provide: RutasService,
          useValue: mockRutaService,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        }
      ],
    }).compile();

    rutasController = module.get<RutasController>(RutasController);
  });

  it('should be defined', () => {
    expect(rutasController).toBeDefined();
  });

  it('create => shuld create a new ruta by a given data', async () =>{
    const rutaDTO = {
      nombreRuta: "San Nicolas del Sur",
      estadoRuta: true,
      latitudDestino: 80,
      longitudDestino: 170
    };

    const ruta = {
      id: 1,
      NombreRuta: "San Nicolas del Sur",
      EstadoRuta: true,
      latitudInicio: 80,
      longitudInicio: 170,
      latitudDestino: 80,
      longitudDestino: 170
    };

    jest.spyOn(mockRutaService, 'create').mockResolvedValue(ruta);
    const result = await rutasController.create(rutaDTO);
    expect(mockRutaService.create).toHaveBeenCalled();
    expect(mockRutaService.create).toHaveBeenCalledWith(rutaDTO);
    expect(result).toEqual(ruta);
  });

  it('findAll => should return an array of rutas', async () =>{
    const rutas = [
      {
        id: 1,
        nombreRuta: "San Nicolas del Sur",
        estadoRuta: true,
        latitudDestino: 80,
        longitudDestino: 170
      },
      {
        id: 2,
        nombreRuta: "San Nicolas del Norte",
        estadoRuta: true,
        latitudDestino: 80,
        longitudDestino: 170
      }
    ];

    jest.spyOn(mockRutaService, 'findAll').mockResolvedValue(rutas);
    const result = await rutasController.findAll();
    expect(mockRutaService.findAll).toHaveBeenCalled();
    expect(result).toEqual(rutas);
  });

  it('findOne => should return a specific ruta by a given id', async () =>{
    const ruta = {
      id: 1,
      nombreRuta: "San Nicolas del Sur",
      estadoRuta: true,
      latitudDestino: 80,
      longitudDestino: 170
    };

    jest.spyOn(mockRutaService, 'findOne').mockResolvedValue(ruta);
    const result = await rutasController.findOne(1);
    expect(mockRutaService.findOne).toHaveBeenCalled();
    expect(mockRutaService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(ruta);
  });

  it('update => should update a specific ruta by a given id and data', async () =>{
    const rutaDTO = {
      nombreRuta: "San Nicolas del Sur",
      estadoRuta: true,
      latitudDestino: 80,
      longitudDestino: 170
    };

    const ruta = {
      id: 1,
      nombreRuta: "San Nicolas del Sur",
      estadoRuta: true,
      latitudDestino: 80,
      longitudDestino: 170
    };

    jest.spyOn(mockRutaService, 'update').mockResolvedValue(ruta);
    const result = await rutasController.update(1, rutaDTO);
    expect(mockRutaService.update).toHaveBeenCalled();
    expect(mockRutaService.update).toHaveBeenCalledWith(1, rutaDTO);
    expect(result).toEqual(ruta);
  });

  it('remove => should delete a specific ruta by a given id', async () =>{
    jest.spyOn(mockRutaService, 'remove').mockResolvedValue(true);
    const result = await rutasController.remove(1);
    expect(mockRutaService.remove).toHaveBeenCalled();
    expect(mockRutaService.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(true);
  });

});
