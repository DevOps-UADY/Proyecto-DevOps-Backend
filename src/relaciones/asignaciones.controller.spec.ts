import { Test } from '@nestjs/testing';
import { AsignacionesController } from './asignaciones.controller';
import { AsignacionesService } from './asignaciones.service';

describe('AsignacionesController', () => {
  let asignacionesController: AsignacionesController;
  let asignacionesService: AsignacionesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AsignacionesController],
      providers: [
        {
          provide: AsignacionesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    asignacionesService = moduleRef.get<AsignacionesService>(AsignacionesService);
    asignacionesController = moduleRef.get<AsignacionesController>(AsignacionesController);
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = await asignacionesController.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('otherTest', () => {
    it('should return a specific array', async () => {
      jest.spyOn(asignacionesService, 'findAll').mockResolvedValue([
        {
          "id": 0,
          "IDVehiculo": 0,
          "IDConductor": 0,
          "IDRuta": 0,
          "FechaAsignacionVinculacion": "2024-04-04",
          "EnFuncionamiento": true
        }
      ]);

      const result = await asignacionesController.findAll();
      expect(result).toEqual([
        {
            "id": 0,
            "IDVehiculo": 0,
            "IDConductor": 0,
            "IDRuta": 0,
            "FechaAsignacionVinculacion": "2024-04-04",
            "EnFuncionamiento": true
        }
      ]);
    });
  });
});
