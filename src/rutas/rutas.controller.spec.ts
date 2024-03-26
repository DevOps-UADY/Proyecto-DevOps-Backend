import { Test } from '@nestjs/testing';
import { RutasController } from './rutas.controller';
import { RutasService } from './rutas.service';

describe('RutasController', () => {
  let rutasController: RutasController;
  let rutasService: RutasService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RutasController],
      providers: [
        {
          provide: RutasService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    rutasService = moduleRef.get<RutasService>(RutasService);
    rutasController = moduleRef.get<RutasController>(RutasController);
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = await rutasController.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('otherTest', () => {
    it('should return a specific array', async () => {
      jest.spyOn(rutasService, 'findAll').mockResolvedValue([
        {
          "id": 0,
          "NombreRuta": "string",
          "FechaCreacionRuta": new Date(),
          "EstadoRuta": true,
          "LatitudInicio": 0,
          "LongitudInicio": 0,
          "LatitudDestino": 0,
          "LongitudDestino": 0,
          "deletedAt": new Date()
        }
      ]);
      
      const result = await rutasController.findAll();
      expect(result).toEqual([
        {
          "id": 0,
          "NombreRuta": "string",
          "FechaCreacionRuta": new Date(),
          "EstadoRuta": true,
          "LatitudInicio": 0,
          "LongitudInicio": 0,
          "LatitudDestino": 0,
          "LongitudDestino": 0,
          "deletedAt": new Date()
        }
      ]);
    });
  });
});
