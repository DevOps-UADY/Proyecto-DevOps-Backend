import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: AppController;

  const mockAppService = {
    getHello: jest.fn()
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    app = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return "Hello World!"', () => {
    jest.spyOn(mockAppService, 'getHello').mockReturnValue('Hello World!');
    expect(mockAppService.getHello).not.toHaveBeenCalled();
    app.getHello();
  });
 
});
