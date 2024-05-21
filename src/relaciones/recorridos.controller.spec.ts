import { Test, TestingModule } from "@nestjs/testing";
import { RecorridosController } from "./recorridos.controller";
import { RecorridosService } from "./recorridos.service";
import { AppLogger } from '../logger/logger.service';

describe('RecorridosController', () => {
    let recorridosController: RecorridosController;

    const mockRecorridosService = {
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
            controllers: [RecorridosController],
            providers: [
                {
                    provide: RecorridosService,
                    useValue: mockRecorridosService,
                },
                {
                provide: AppLogger,
                useValue: mockLogger,
                }
            ],
        }).compile();

        recorridosController = module.get<RecorridosController>(RecorridosController);
    });

    it('should be defined', () => {
        expect(recorridosController).toBeDefined();
    });

    it('create => shuld create a new Recorrido by a given data', async () =>{
        const recorridoDTO = {
            "asignacionId": 1,
            "rutaId": 1,
            "fechaRecorrido": "2021-10-01",
        };

        const recorrido = {
            "id": 1,
            "asignacion": 1,
            "auxAsignacion": 1,
            "rutaId": 1,
            "fechaRecorrido": "2021-10-01",
        };

        jest.spyOn(mockRecorridosService, 'create').mockResolvedValue(recorrido);
        const result = await recorridosController.create(recorridoDTO);
        expect(mockRecorridosService.create).toHaveBeenCalled();
        expect(mockRecorridosService.create).toHaveBeenCalledWith(recorridoDTO);
        expect(result).toEqual(recorrido);
    });

    it('findAll => should return an array of recorridos', async () =>{
        const recorridos = [
            {
                "id": 1,
                "asignacion": 1,
                "auxAsignacion": 1,
                "rutaId": 1,
                "fechaRecorrido": "2021-10-01",
            },
            {
                "id": 2,
                "asignacion": 2,
                "auxAsignacion": 2,
                "rutaId": 2,
                "fechaRecorrido": "2021-10-02",
            }
        ];

        jest.spyOn(mockRecorridosService, 'findAll').mockResolvedValue(recorridos);
        const result = await recorridosController.findAll();
        expect(mockRecorridosService.findAll).toHaveBeenCalled();
        expect(result).toEqual(recorridos);
    });

    it('findOne => should return an recorrido by a given id', async () =>{
        const recorrido = {
            "id": 1,
            "asignacion": 1,
            "auxAsignacion": 1,
            "rutaId": 1,
            "fechaRecorrido": "2021-10-01",
        };

        jest.spyOn(mockRecorridosService, 'findOne').mockResolvedValue(recorrido);
        const result = await recorridosController.findOne(1);
        expect(mockRecorridosService.findOne).toHaveBeenCalled();
        expect(mockRecorridosService.findOne).toHaveBeenCalledWith(1);
        expect(result).toEqual(recorrido);
    });

    it('update => should update a recorrido by a given id and data', async () =>{
        const recorridoDTO = {
            "asignacionId": 1,
            "rutaId": 1,
            "fechaRecorrido": "2021-10-01",
        };

        const recorrido = {
            "id": 1,
            "asignacion": 1,
            "auxAsignacion": 1,
            "rutaId": 1,
            "fechaRecorrido": "2021-10-01",
        };

        jest.spyOn(mockRecorridosService, 'update').mockResolvedValue(recorrido);
        const result = await recorridosController.update(1, recorridoDTO);
        expect(mockRecorridosService.update).toHaveBeenCalled();
        expect(mockRecorridosService.update).toHaveBeenCalledWith(1, recorridoDTO);
        expect(result).toEqual(recorrido);
    });

    it('remove => should remove a recorrido by a given id', async () =>{
        const recorrido = {
            "id": 1,
            "asignacion": 1,
            "auxAsignacion": 1,
            "rutaId": 1,
            "fechaRecorrido": "2021-10-01",
        };

        jest.spyOn(mockRecorridosService, 'remove').mockResolvedValue(recorrido);
        const result = await recorridosController.remove(1);
        expect(mockRecorridosService.remove).toHaveBeenCalled();
        expect(mockRecorridosService.remove).toHaveBeenCalledWith(1);
        expect(result).toEqual(recorrido);
    });

});
