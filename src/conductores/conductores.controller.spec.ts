import { Test, TestingModule } from '@nestjs/testing';
import { ConductoresController } from './conductores.controller';
import { ConductoresService } from './conductores.service';
import { AppLogger } from '../logger/logger.service';

describe('ConductoresController', () => {
  let conductoresController: ConductoresController;

  const mockConductorService = {
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
      controllers: [ConductoresController],
      providers: [
        {
          provide: ConductoresService,
          useValue: mockConductorService,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        }
      ],
    }).compile();

    conductoresController = module.get<ConductoresController>(ConductoresController);
  });

  it('should be defined', () => {
    expect(conductoresController).toBeDefined();
  });

  it('create => shuld create a new Conductor by a given data', async () =>{
    const conductorDTO = {
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    };

    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    };

    jest.spyOn(mockConductorService, 'create').mockResolvedValue(conductor);
    const result = await conductoresController.create(conductorDTO);
    expect(mockConductorService.create).toHaveBeenCalled();
    expect(mockConductorService.create).toHaveBeenCalledWith(conductorDTO);
    expect(result).toEqual(conductor);
  });

  it('findAll => should return an array of conductores', async () =>{
    const conductores = [
      {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A321",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 999
      },
      {
          "id": 2,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A001",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 935
      }
    ];

    jest.spyOn(mockConductorService, 'findAll').mockResolvedValue(conductores);
    const result = await conductoresController.findAll();
    expect(mockConductorService.findAll).toHaveBeenCalled();
    expect(result).toEqual(conductores);
  });

  it('findOne => should return a specific conductor by a given id', async () =>{
    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    };

    jest.spyOn(mockConductorService, 'findOne').mockResolvedValue(conductor);
    const result = await conductoresController.findOne(1);
    expect(mockConductorService.findOne).toHaveBeenCalled();
    expect(mockConductorService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(conductor);
  });

  it('update => should update a specific conductor by a given id and data', async () =>{
    const conductorDTO = {
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    };

    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    };

    jest.spyOn(mockConductorService, 'update').mockResolvedValue(conductor);
    const result = await conductoresController.update(1, conductorDTO);
    expect(mockConductorService.update).toHaveBeenCalled();
    expect(mockConductorService.update).toHaveBeenCalledWith(1, conductorDTO);
    expect(result).toEqual(conductor);
  });

  it('remove => should delete a specific ruta by a given id', async () =>{
    jest.spyOn(mockConductorService, 'remove').mockResolvedValue(true);
    const result = await conductoresController.remove(1);
    expect(mockConductorService.remove).toHaveBeenCalled();
    expect(mockConductorService.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(true);
  });

});
