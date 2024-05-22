import { Test, TestingModule } from '@nestjs/testing';
import { ConductoresService } from './conductores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Conductore } from './entities/conductore.entity';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { AppLogger } from '../logger/logger.service';

describe('Conductores service', () => {
    let conductoresService: ConductoresService;

  const mockConductoreRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
    update: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConductoresService,
        {
          provide: getRepositoryToken(Conductore),
          useValue: mockConductoreRepository,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        }
      ],
    }).compile();

    conductoresService = module.get<ConductoresService>(ConductoresService);
  });

  it('should be defined', () => {
    expect(conductoresService).toBeDefined();
  });

  it('create => should create a new conductor and return its data', async ()=>{
    const conductorDTO = {
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    } as CreateConductoreDto;

    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    } as Conductore;

    jest.spyOn(mockConductoreRepository, 'create').mockReturnValue(conductor);
    jest.spyOn(mockConductoreRepository, 'save').mockReturnValue(conductor);
    const resultCreate = await conductoresService.create(conductorDTO);
    expect(mockConductoreRepository.create).toHaveBeenCalled;
    expect(mockConductoreRepository.create).toHaveBeenCalledWith(conductorDTO);
    expect(mockConductoreRepository.save).toHaveBeenCalled;
    expect(resultCreate).toEqual(conductor);
  });

    it('findAll => should return an array of conductores', async ()=>{
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
    
        jest.spyOn(mockConductoreRepository, 'find').mockReturnValue(conductores);
      const resultFindAll = await conductoresService.findAll();
        expect(mockConductoreRepository.find).toHaveBeenCalled;
        expect(resultFindAll).toEqual(conductores);
    });

    it('findOne => should return a single conductor', async ()=>{
    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    } as Conductore;
    
        jest.spyOn(mockConductoreRepository, 'findOne').mockReturnValue(conductor);
      const resultFindOne = await conductoresService.findOne(1);
      expect(mockConductoreRepository.findOne).toHaveBeenCalled;
      expect(mockConductoreRepository.findOne).toHaveBeenCalledWith({
        where: { id:1 },
        select: [
          'id',
          'nombreConductor',
          'fechaNacimiento',
          'curp',
          'direccionCasa',
          'salario',
          'numeroLicencia',
          'fechaIngresoSistemaConductor'
        ]
    });
      expect(resultFindOne).toEqual(conductor);
    });

    it('update => should update a conductor and return its data', async ()=>{

        const conductorDTO = {
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    } as CreateConductoreDto;

    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    }  as Conductore;
    
        jest.spyOn(mockConductoreRepository, 'findOneBy').mockReturnValue(conductor);
        jest.spyOn(mockConductoreRepository, 'update').mockReturnValue(conductor);
        const resultUpdate = await conductoresService.update(1, conductorDTO);
        expect(mockConductoreRepository.findOneBy).toHaveBeenCalled;
        expect(mockConductoreRepository.findOneBy).toHaveBeenCalledWith({id: 1});
        expect(mockConductoreRepository.update).toHaveBeenCalled;
        expect(mockConductoreRepository.update).toHaveBeenCalledWith(1, conductorDTO);
        expect(resultUpdate).toEqual(conductor);
    });

    it('remove => should delete a conductor', async ()=>{
    const conductor = {
          "id": 1,
          "nombreConductor": "string",
          "fechaNacimiento": "2021-10-06",
          "curp": "A123",
          "direccionCasa": "Domicilio",
          "salario": 150,
          "numeroLicencia": 115
    }  as Conductore;
    
        jest.spyOn(mockConductoreRepository, 'findOneBy').mockReturnValue(conductor);
        jest.spyOn(mockConductoreRepository, 'softDelete').mockReturnValue(conductor);
        const resultDelete = await conductoresService.remove(1);
        expect(mockConductoreRepository.findOneBy).toHaveBeenCalled;
        expect(mockConductoreRepository.findOneBy).toHaveBeenCalledWith({id: 1});
        expect(mockConductoreRepository.softDelete).toHaveBeenCalled;
        expect(resultDelete).toEqual(conductor);
    });

});
