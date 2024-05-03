import { Test, TestingModule } from '@nestjs/testing';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { FileTypeResult } from 'file-type/core';




describe('VehiculosController', () => {
  let vehiculosController: VehiculosController;

  const mockVehiculosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculosController],
      providers: [
        {
          provide: VehiculosService,
          useValue: mockVehiculosService,
        },
        
      ],
      imports:[
        NestjsFormDataModule
      ]
      
      
    }).compile();

    vehiculosController = module.get<VehiculosController>(VehiculosController);
  });

  it('should be defined', () => {
    expect(vehiculosController).toBeDefined();
  });

  it('create => shuld create a new vehiculo by a given data', async () =>{
    const buffer = Buffer.from('../test/1229872');
    const fotografia:any  = {
      // Propiedades
      encoding: '',
      originalName: '',
      size: 0,

      fileType: null,
      buffer,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      setFileTypeResult: function (fileType: FileTypeResult): void {
        throw new Error('Function not implemented.');
      },
      mimeType: '',
      mimetype: '',
      extension: '',
      mimeTypeWithSource: undefined,
      extensionWithSource: undefined,
      busBoyMimeType: ''
    }
    const vehiculo = {
      id: 14,
      marca: "weww",
      modelo: "eqwww",
      vin: "qwww",
      placa: "QWEW",
      fechaCompra: "2024-05-02",
      costo: 121221,
      fotografia,
      estatusAsignacion: false,
      fechaIngresoSistema: "2024-05-02"
  };
  

    jest.spyOn(mockVehiculosService, 'create').mockResolvedValue(vehiculo);
    const result = await vehiculosController.create(vehiculo);
    expect(mockVehiculosService.create).toHaveBeenCalled();
   
    expect(result).toEqual(vehiculo);
  });

  it('findAll => should return an array of vehiculo', async () =>{
      const buffer = Buffer.from('../test/1229872');
    const fotografia:any  = {
      // Propiedades
      encoding: '',
      originalName: '',
      size: 0,

      fileType: null,
      buffer,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      setFileTypeResult: function (fileType: FileTypeResult): void {
        throw new Error('Function not implemented.');
      },
      mimeType: '',
      mimetype: '',
      extension: '',
      mimeTypeWithSource: undefined,
      extensionWithSource: undefined,
      busBoyMimeType: ''
    }
    
    const vehiculos = [
      {
        id: 14,
        marca: "weww",
        modelo: "eqwww",
        vin: "qwww",
        placa: "QWEW",
        fechaCompra: "2024-05-02",
        costo: 121221,
        fotografia,
        estatusAsignacion: false,
        fechaIngresoSistema: "2024-05-02"
    },
    {
      id: 15,
      marca: "weww",
      modelo: "eqwww",
      vin: "qwww",
      placa: "QWEW",
      fechaCompra: "2024-05-02",
      costo: 121221,
      fotografia,
      estatusAsignacion: false,
      fechaIngresoSistema: "2024-05-02"
  }
    ];

    jest.spyOn(mockVehiculosService, 'findAll').mockResolvedValue(vehiculos);
    const result = await mockVehiculosService.findAll();
    expect(mockVehiculosService.findAll).toHaveBeenCalled();
    expect(result).toEqual(vehiculos);
  });

  
  it('findOne => should return a specific vehiculo by a given id', async () =>{
    const buffer = Buffer.from('../test/1229872');
    const fotografia:any  = {
      // Propiedades
      encoding: '',
      originalName: '',
      size: 0,

      fileType: null,
      buffer,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      setFileTypeResult: function (fileType: FileTypeResult): void {
        throw new Error('Function not implemented.');
      },
      mimeType: '',
      mimetype: '',
      extension: '',
      mimeTypeWithSource: undefined,
      extensionWithSource: undefined,
      busBoyMimeType: ''
    }
    const vehiculo = {
      id: 15,
      marca: "weww",
      modelo: "eqwww",
      vin: "qwww",
      placa: "QWEW",
      fechaCompra: "2024-05-02",
      costo: 121221,
      fotografia,
      estatusAsignacion: false,
      fechaIngresoSistema: "2024-05-02"
  }

    jest.spyOn(mockVehiculosService, 'findOne').mockResolvedValue(vehiculo);
    const result = await mockVehiculosService.findOne(1);
    expect(mockVehiculosService.findOne).toHaveBeenCalled();
    expect(mockVehiculosService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(vehiculo);
  });

  it('update => should update a specific vehiculo by a given id ', async () =>{
    const buffer = Buffer.from('../test/1229872');
    const fotografia:any  = {
      // Propiedades
      encoding: '',
      originalName: '',
      size: 0,

      fileType: null,
      buffer,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      setFileTypeResult: function (fileType: FileTypeResult): void {
        throw new Error('Function not implemented.');
      },
      mimeType: '',
      mimetype: '',
      extension: '',
      mimeTypeWithSource: undefined,
      extensionWithSource: undefined,
      busBoyMimeType: ''
    }
    const vehiculo = {
      id: 15,
      marca: "weww",
      modelo: "eqwww",
      vin: "qwww",
      placa: "QWEW",
      fechaCompra: "2024-05-02",
      costo: 121221,
      fotografia,
      estatusAsignacion: false,
      fechaIngresoSistema: "2024-05-02"
  }

    jest.spyOn(mockVehiculosService, 'findOne').mockResolvedValue(vehiculo);
    const result = await mockVehiculosService.findOne(1);
    expect(mockVehiculosService.findOne).toHaveBeenCalled();
    expect(mockVehiculosService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(vehiculo);
  });

  it('remove => should delete a specific user by a given id', async () =>{
    const buffer = Buffer.from('../test/1229872');
    const fotografia:any  = {
      // Propiedades
      encoding: '',
      originalName: '',
      size: 0,

      fileType: null,
      buffer,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      setFileTypeResult: function (fileType: FileTypeResult): void {
        throw new Error('Function not implemented.');
      },
      mimeType: '',
      mimetype: '',
      extension: '',
      mimeTypeWithSource: undefined,
      extensionWithSource: undefined,
      busBoyMimeType: ''
    }
    const vehiculo = {
      id: 15,
      marca: "weww",
      modelo: "eqwww",
      vin: "qwww",
      placa: "QWEW",
      fechaCompra: "2024-05-02",
      costo: 121221,
      fotografia,
      estatusAsignacion: false,
      fechaIngresoSistema: "2024-05-02"
  }
    jest.spyOn(mockVehiculosService, 'remove').mockResolvedValue(true);
    const result = await vehiculosController.remove(1);
    expect(mockVehiculosService.remove).toHaveBeenCalled();
    expect(result).toEqual(true);
  });

});
