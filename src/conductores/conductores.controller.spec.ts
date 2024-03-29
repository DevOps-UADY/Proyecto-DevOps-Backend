import { Test } from '@nestjs/testing';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';

describe('RutasController', () => {
  let conductoresController: ConductoresController;
  let conductoresService: ConductoresService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ConductoresController],
      providers: [
        {
          provide: ConductoresService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    conductoresService = moduleRef.get<ConductoresService>(ConductoresService);
    conductoresController = moduleRef.get<ConductoresController>(ConductoresController);
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = await conductoresController.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('otherTest', () => {
    it('should return a specific array', async () => {
      jest.spyOn(conductoresService, 'findAll').mockResolvedValue([
        {
          "id": 0,
          "NombreConductor": "string",
          "FechaNacimiento": new Date(),
          "CURP": "A123",
          "DireccionCasa": "Domicilio",
          "Salario": 150,
          "NumLicencia": "LIC987",
          "FechaIngresoSistemaConductor": new Date(),
          "deletedAt": new Date()
        }
      ]);

      const result = await conductoresController.findAll();
      expect(result).toEqual([
        {
          "id": 0,
          "NombreConductor": "string",
          "FechaNacimiento": new Date(),
          "CURP": "A123",
          "DireccionCasa": "Domicilio",
          "Salario": 150,
          "NumLicencia": "LIC987",
          "FechaIngresoSistemaConductor": new Date(),
          "deletedAt": new Date()
        }
      ]);
    });
  });
});
