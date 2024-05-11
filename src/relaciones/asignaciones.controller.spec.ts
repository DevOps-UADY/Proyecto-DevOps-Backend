import { Test, TestingModule } from "@nestjs/testing";
import { AsignacionesController } from "./asignaciones.controller";
import { AsignacionesService } from "./asignaciones.service";

describe('AsignacionesController', () => {
    let asignacionesController: AsignacionesController;

    const mockAsignacionesService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AsignacionesController],
            providers: [
                {
                    provide: AsignacionesService,
                    useValue: mockAsignacionesService,
                },
            ],
        }).compile();

        asignacionesController = module.get<AsignacionesController>(AsignacionesController);
    });

    it('should be defined', () => {
        expect(asignacionesController).toBeDefined();
    });

    it('create => shuld create a new Asignacion by a given data', async () =>{
        const asignacionDTO = {
            "idConductor": 1,
            "idVehiculo": 1,
        };

        const asignacion = {
            "id": 1,
            "idConductor": 1,
            "idVehiculo": 1,
        };

        jest.spyOn(mockAsignacionesService, 'create').mockResolvedValue(asignacion);
        const result = await asignacionesController.create(asignacionDTO);
        expect(mockAsignacionesService.create).toHaveBeenCalled();
        expect(mockAsignacionesService.create).toHaveBeenCalledWith(asignacionDTO);
        expect(result).toEqual(asignacion);
    });

    it('findAll => should return an array of asignaciones', async () =>{
        const asignaciones = [
            {
                "id": 1,
                "idConductor": 1,
                "idVehiculo": 1,
            },
            {
                "id": 2,
                "idConductor": 2,
                "idVehiculo": 2,
            },
        ];

        jest.spyOn(mockAsignacionesService, 'findAll').mockResolvedValue(asignaciones);
        const result = await asignacionesController.findAll();
        expect(mockAsignacionesService.findAll).toHaveBeenCalled();
        expect(result).toEqual(asignaciones);
    });

    it('findOne => should return an asignacion by a given id', async () =>{
        const asignacion = {
            "id": 1,
            "idConductor": 1,
            "idVehiculo": 1,
        };

        jest.spyOn(mockAsignacionesService, 'findOne').mockResolvedValue(asignacion);
        const result = await asignacionesController.findOne(1);
        expect(mockAsignacionesService.findOne).toHaveBeenCalled();
        expect(mockAsignacionesService.findOne).toHaveBeenCalledWith(1);
        expect(result).toEqual(asignacion);
    });

    it('update => should update an asignacion by a given id and data', async () =>{
        const asignacionDTO = {
            "idConductor": 1,
            "idVehiculo": 1,
        };

        const asignacion = {
            "id": 1,
            "idConductor": 1,
            "idVehiculo": 1,
        };

        jest.spyOn(mockAsignacionesService, 'update').mockResolvedValue(asignacion);
        const result = await asignacionesController.update(1, asignacionDTO);
        expect(mockAsignacionesService.update).toHaveBeenCalled();
        expect(mockAsignacionesService.update).toHaveBeenCalledWith(1, asignacionDTO);
        expect(result).toEqual(asignacion);
    });

    it('remove => should remove an asignacion by a given id', async () =>{
        const asignacion = {
            "id": 1,
            "idConductor": 1,
            "idVehiculo": 1,
        };

        jest.spyOn(mockAsignacionesService, 'remove').mockResolvedValue(asignacion);
        const result = await asignacionesController.remove(1);
        expect(mockAsignacionesService.remove).toHaveBeenCalled();
        expect(mockAsignacionesService.remove).toHaveBeenCalledWith(1);
        expect(result).toEqual(asignacion);
    });

});
