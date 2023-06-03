# REPOSITORY-SERVICE

The service-oriented architecture repository is part of an arrangement to store critical information about the service-oriented architecture as a whole

# Pre requisites


```TEXT
 Node => 16.x
 Docker => v20.10
docker-compose => v1.29
```

## Installation

```bash
cd food-service
$ docker-compose build --no-cache
$ docker-compose up --force-recreate
```

Then, you will need to create a **.env** file in the root of the project

```bash
PROJECT_NAME=base-app
PROJECT_MODE=development
SERVER_HOSTNAME="http://localhost"
SERVER_PORT=3000

MONGODB_HOSTNAME=127.0.0.1 ## to build the container you should use "mongo" insted of 127...
MONGODB_PORT=27018
MONGODB_USERNAME=root
MONGODB_PASSWORD=newPassword
MONGODB_DATABASE=service_repository_dev

JWT_SECRET_KEY=shhhh

SECRET_SALT=shhhh
```

## Troubleshooting

Find the container IP: 
```bash
docker container inspect <CONTAINER ID>
```
and look for the **IPAddress** inside of **Network** field.

If you have any problem with the container follow this steps:

- Run mongo
```bash
docker-compose up mongo 
```
- Set the env variables

```bash
MONGODB_HOSTNAME=127.0.0.1 
```
- Run the project
```bash
yarn start
```
## Scripts

### start

```bash
yarn start
```

### test

Run the unit tests

```bash
yarn test
```

Run the integration tests

```bash
yarn test:integration
```

### build

Compile the project

```bash
yarn build
```

### build and run

Compile the project and run it

```bash
yarn serve
```

## Documentation


- Postman Collection: https://www.postman.com/restless-shuttle-566554/workspace/my-workspace/collection/27103827-552776d6-f594-4e5f-af51-6b98a3799ed7?action=share&creator=27103827

- Diagrams: https://drive.google.com/drive/folders/1et-SzNsERoyJcD6r3okGWSqDyLhhJtUo?usp=sharing

## Production

### Docker configuration

```bash
docker network create intranet

sh deploy.sh
```

## Manual Testing Steps

- Please Run the application with this command: `docker-compose -f "docker-compose.yml" up -d --build`
- Go to http://localhost:4000/v1/api/user
- for a dev enviroment create a file (".env") and add the following variables:

```bash PROJECT_NAME=base-app
PROJECT_MODE=development
SERVER_HOSTNAME="http://localhost"
SERVER_PORT=3000

MONGODB_HOSTNAME=127.0.0.1 ## to build the container you should use "mongo" insted of 127...
MONGODB_PORT=27018
MONGODB_USERNAME=root
MONGODB_PASSWORD=newPassword
MONGODB_DATABASE=service_repository_dev

JWT_SECRET_KEY=shhhh

SECRET_SALT=shhhh
```

- Also you can enter to the coinainer log and check the log
