import { Test, TestingModule } from '@nestjs/testing';
import { CodigosController } from './codigos.controller';
import { CodigosService } from './codigos.service';



describe('CodigosController', () => {
  let codigosController: CodigosController;
// esto
  const mockCodigosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigosController],
      providers: [
        {
          provide: CodigosService,
          useValue: mockCodigosService,
        },
        
      ],
      
// lo hizo wilbert  
    }).compile();

    codigosController = module.get<CodigosController>(CodigosController);
  });

  it('should be defined', () => {
    expect(codigosController).toBeDefined();
  });

  it('create => shuld create a new code by a given data', async () =>{
    

    const codigo = {
      
        id: "6852b698-d3a6-4918-8482-9e6261a67d01",
        isActive: true,
    
    };
// wil
    jest.spyOn(mockCodigosService, 'create').mockResolvedValue(codigo);
    const result = await codigosController.create();
    expect(mockCodigosService.create).toHaveBeenCalled();
   
    expect(result).toEqual(codigo);
  });

// bert
  it('findAll => should return an array of codigos', async () =>{
    const codigos = [
      {
      
        id: "6852b698-d3a6-4918-8482-9e6261a67d01",
        isActive: true,
    
    },
    {
      
      id: "6852b697-d3a6-4918-8482-9e6261a37d01",
      isActive: true,
  
  }
    ];

    jest.spyOn(mockCodigosService, 'findAll').mockResolvedValue(codigos);
    const result = await mockCodigosService.findAll();
    expect(mockCodigosService.findAll).toHaveBeenCalled();
    expect(result).toEqual(codigos);
  });
  
  it('findOne => should return a specific usuer by a given id', async () =>{
    const codigo = {
      id: "6852b697-d3a6-4918-8482-9e6261a37d01",
      isActive: true
      
    }

    jest.spyOn(mockCodigosService, 'findOne').mockResolvedValue(codigo);
    const result = await mockCodigosService.findOne("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(mockCodigosService.findOne).toHaveBeenCalled();
    expect(mockCodigosService.findOne).toHaveBeenCalledWith("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(result).toEqual(codigo);
  });

  it('update => should update a specific user by a given id ', async () =>{
    const codigo = {
      id: "6852b697-d3a6-4918-8482-9e6261a37d01",
      isActive: true
      
    }

    jest.spyOn(mockCodigosService, 'findOne').mockResolvedValue(codigo);
    const result = await mockCodigosService.findOne("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(mockCodigosService.findOne).toHaveBeenCalled();
    expect(mockCodigosService.findOne).toHaveBeenCalledWith("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(result).toEqual(codigo);
  });

  it('remove => should delete a specific user by a given id', async () =>{
    
    jest.spyOn(mockCodigosService, 'remove').mockResolvedValue(true);
    const result = await codigosController.remove("e4e5ac9b-a559-4f09-beca-71f54aa97492");
    expect(mockCodigosService.remove).toHaveBeenCalled();
    expect(result).toEqual(true);
  });

});
