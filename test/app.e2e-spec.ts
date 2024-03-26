import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/rutas (POST)', () => {
    const rutaData = {
      NombreRuta: 'string',
      FechaCreacionRuta: new Date(),
      EstadoRuta: true,
      LatitudInicio: 0,
      LongitudInicio: 0,
      LatitudDestino: 0,
      LongitudDestino: 0,
      deletedAt: new Date(),
    };

    return request(app.getHttpServer())
    .post('/rutas')
    .send(rutaData)
    .expect(201);

  });

  it('/rutas (DELETE)', async () => {
    const rutaData = {
      NombreRuta: 'string',
      FechaCreacionRuta: new Date(),
      EstadoRuta: true,
      LatitudInicio: 0,
      LongitudInicio: 0,
      LatitudDestino: 0,
      LongitudDestino: 0
    };

    const response = await request(app.getHttpServer())
    .post('/rutas')
    .send(rutaData)
    .expect(201);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const createdRutaId = response.body.id;
    
    return request(app.getHttpServer())
      .delete(`/rutas/${createdRutaId}`)
      .expect(200);
  });

  it('/rutas (PUT)', async () => {
    const rutaData = {
      NombreRuta: 'string',
      FechaCreacionRuta: new Date(),
      EstadoRuta: true,
      LatitudInicio: 0,
      LongitudInicio: 0,
      LatitudDestino: 0,
      LongitudDestino: 0
    };
  
    const createResponse = await request(app.getHttpServer())
      .post('/rutas')
      .send(rutaData)
      .expect(201);
  
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const createdRutaId = createResponse.body.id;
  
    const updateResponse = await request(app.getHttpServer())
      .put(`/rutas/${createdRutaId}`)
      .send({ EstadoRuta: false }) 
      .expect(200);
    console.log(updateResponse.body);
    
    expect(updateResponse.body.EstadoRuta).toBe(false);
  });
});
