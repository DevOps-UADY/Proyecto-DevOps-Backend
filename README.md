<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Unit Testing

To run the unit tests for the Project, execute the following command:

```bash
npm run test
```

``` bash
docker run -d \
  --name my_postgres_container \
  -e POSTGRES_DB=test \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  -v d_data:/var/lib/postgresql/data \
  postgres:14
```

# Pasos para crear una network

1) Primero debemos crear la red (pero primero debemos eliminarla para asegurarnos que no se duplique)

**Esto es para borrar la red**
``` bash
docker network rm devops
```
**Esto para crear la red**
``` bash
docker network create devops
```
**En este caso no es tan facil, debido a que si queremos que un contener tengo una ip, debemos crear una red que contenga dicha ip**
``` bash
docker network create --subnet=172.22.0.0/16 devops
```
2) En este caso debemos construir la imagen del proyecto 
``` bash
docker build -t proyectodevopsbackend . 
```

3) Agregamos los contenedores a la red 

``` bash
docker run -d \
  --name postgres \
  --network devops \
  --ip 172.22.0.4 \
  -e POSTGRES_HOST=172.22.0.4 \
  -e POSTGRES_DB=test \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  -v d_data:/var/lib/postgresql/data \
  postgres:14

```

``` bash
docker run -d --name proyectodevopsbackend --network devops -p 3000:3000 proyectodevopsbackend