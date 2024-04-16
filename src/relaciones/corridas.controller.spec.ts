import { Test } from '@nestjs/testing';
import { CorridasController } from './corridas.controller';
import { CorridasService } from './corridas.service';

describe('CorridasController', () => {
  let corridasController: CorridasController;
  let corridasService: CorridasService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CorridasController],
      providers: [
        {
          provide: CorridasService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    corridasService = moduleRef.get<CorridasService>(CorridasService);
    corridasController = moduleRef.get<CorridasController>(CorridasController);
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = await corridasController.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('otherTest', () => {
    it('should return a specific array', async () => {
      jest.spyOn(corridasService, 'findAll').mockResolvedValue([
        {
          "id": 0,
          "IDRuta": 0,
          "Comentarios": "string",
          "Fecha": "2024-04-04"
        }
      ]);

      const result = await corridasController.findAll();
      expect(result).toEqual([
        {
            "id": 0,
            "IDRuta": 0,
            "Comentarios": "string",
            "Fecha": "2024-04-04"
        }
      ]);
    });
  });
});
