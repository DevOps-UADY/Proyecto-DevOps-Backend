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
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115,
          "fechaIngresoSistemaConductor": new Date("2024-04-10T06:02:35.136Z"),
          "deletedAt": new Date("2024-04-16T06:02:35.136Z")
        }
      ]);

      const result = await conductoresController.findAll();
      expect(result).toEqual([
        {
          "id": 0,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115,
          "fechaIngresoSistemaConductor": new Date("2024-04-10T06:02:35.136Z"),
          "deletedAt": new Date("2024-04-16T06:02:35.136Z")
        }
      ]);
    });
  });
});
