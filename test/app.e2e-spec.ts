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
      deletedAt: new Date()
    };

    return request(app.getHttpServer())
      .post('/rutas')
      .send(rutaData)
      .expect(201);

  });

  it('/conductores (POST)', async () => {
    const conductorData = {
      "nombreConductor": "string",
      "fechaNacimiento": "2021-10-06",
      "curp": "string1",
      "direccionCasa": "string",
      "salario": 150,
      "numeroLicencia": 110
    };

     const response = await request(app.getHttpServer())
      .post('/conductores')
      .send(conductorData)

    if (response.status == 409) {
      return request(app.getHttpServer())
      .post('/conductores')
      .send(conductorData)
      .expect(409);
    } else {
      expect(response.status).toBe(201);
    }
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

  it('/conductores (DELETE)', async () => {
    const conductorData = {
      "nombreConductor": "string",
      "fechaNacimiento": "2021-10-06",
      "curp": "string2",
      "direccionCasa": "string",
      "salario": 150,
      "numeroLicencia": 111
    };

    const response = await request(app.getHttpServer())
      .post('/conductores')
      .send(conductorData)
      .expect(201);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const createdConductorId = response.body.id;

    return request(app.getHttpServer())
      .delete(`/conductores/${createdConductorId}`)
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

  it('/conductores (PUT)', async () => {
    const conductorData = {
      "nombreConductor": "string",
      "fechaNacimiento": "2021-10-06",
      "curp": "string3",
      "direccionCasa": "string",
      "salario": 150,
      "numeroLicencia": 112
    };

    const response = await request(app.getHttpServer())
      .post('/conductores')
      .send(conductorData)

    if (response.status == 409) {
      return request(app.getHttpServer())
      .post('/conductores')
      .send(conductorData)
      .expect(409);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    const createdConductorId = response.body.id;
    const updateResponse = await request(app.getHttpServer())
      .put(`/conductores/${createdConductorId}`)
      .send({ Salario: 5000 , "fechaNacimiento":"2009-10-06"})
      .expect(200);
    console.log(updateResponse.body);

    expect(updateResponse.body.Salario).toBe(5000);
    }

    
  });
});
