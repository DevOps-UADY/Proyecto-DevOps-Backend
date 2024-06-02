import { Test, TestingModule } from '@nestjs/testing';
import { RutasService } from './rutas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { AppLogger } from '../logger/logger.service';

describe('Rutas service', () => {
    let rutaService: RutasService;

  const mockRutaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
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
        RutasService,
        {
          provide: getRepositoryToken(Ruta),
          useValue: mockRutaRepository,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        }
      ],
    }).compile();

    rutaService = module.get<RutasService>(RutasService);
  });

  it('should be defined', () => {
    expect(rutaService).toBeDefined();
  });

  it('create => should create a new ruta and return its data', async ()=>{
    const rutaDTO = {
        nombreRuta: "San Nicolas del Sur",
        estadoRuta: true,
        latitudDestino: 80,
        longitudDestino: 170
    }as CreateRutaDto;

    const ruta = {
        id: 1,
        nombreRuta: "San Nicolas del Sur",
        estadoRuta: true,
        latitudDestino: 80,
        longitudDestino: 170
    } as Ruta;

    jest.spyOn(mockRutaRepository, 'create').mockReturnValue(ruta);
    jest.spyOn(mockRutaRepository, 'save').mockReturnValue(ruta);
    const resultCreate = await rutaService.create(rutaDTO);
    expect(mockRutaRepository.create).toHaveBeenCalled;
    expect(mockRutaRepository.create).toHaveBeenCalledWith(rutaDTO);
    expect(mockRutaRepository.save).toHaveBeenCalled;
    expect(resultCreate).toEqual(ruta);
  });

    it('findAll => should return an array of rutas', async ()=>{
        const rutas = [
            {
                id: 1,
                nombreRuta: "San Nicolas del Sur",
                estadoRuta: true,
                latitudDestino: 80,
                longitudDestino: 170
            }
        ];
    
        jest.spyOn(mockRutaRepository, 'find').mockReturnValue(rutas);
        const resultFindAll = await rutaService.findAll();
        expect(mockRutaRepository.find).toHaveBeenCalled;
        expect(resultFindAll).toEqual(rutas);
    });

    it('findOne => should return a single ruta', async ()=>{
        const ruta = {
            id: 1,
            nombreRuta: "San Nicolas del Sur",
            estadoRuta: true,
            latitudDestino: 80,
            longitudDestino: 170
        } as Ruta;
    
        jest.spyOn(mockRutaRepository, 'findOneBy').mockReturnValue(ruta);
        const resultFindOne = await rutaService.findOne(1);
        expect(mockRutaRepository.findOneBy).toHaveBeenCalled;
        expect(mockRutaRepository.findOneBy).toHaveBeenCalledWith({id: 1});
        expect(resultFindOne).toEqual(ruta);
    });

    it('update => should update a ruta and return its data', async ()=>{
        const rutaDTO = {
          nombreRuta: "San Nicolas del Sur",
          estadoRuta: true,
          latitudDestino: 80,
          longitudDestino: 170
        }as CreateRutaDto;
    
        const ruta = {
            id: 1,
            nombreRuta: "San Nicolas del Sur",
            estadoRuta: true,
            latitudDestino: 80,
            longitudDestino: 170
        } as Ruta;
    
        jest.spyOn(mockRutaRepository, 'findOneBy').mockReturnValue(ruta);
        jest.spyOn(mockRutaRepository, 'update').mockReturnValue(ruta);
        const resultUpdate = await rutaService.update(1, rutaDTO);
        expect(mockRutaRepository.findOneBy).toHaveBeenCalled;
        expect(mockRutaRepository.findOneBy).toHaveBeenCalledWith({id: 1});
        expect(mockRutaRepository.update).toHaveBeenCalled;
        expect(mockRutaRepository.update).toHaveBeenCalledWith(1, rutaDTO);
        expect(resultUpdate).toEqual(ruta);
    });

    it('remove => should delete a ruta', async ()=>{
        const ruta = {
            id: 1,
            nombreRuta: "San Nicolas del Sur",
            estadoRuta: true,
            latitudDestino: 80,
            longitudDestino: 170
        } as Ruta;
    
        jest.spyOn(mockRutaRepository, 'findOneBy').mockReturnValue(ruta);
        jest.spyOn(mockRutaRepository, 'softDelete').mockReturnValue(ruta);
        const resultDelete = await rutaService.remove(1);
        expect(mockRutaRepository.findOneBy).toHaveBeenCalled;
        expect(mockRutaRepository.findOneBy).toHaveBeenCalledWith({id: 1});
        expect(mockRutaRepository.softDelete).toHaveBeenCalled;
        expect(resultDelete).toEqual(ruta);
    });

});
