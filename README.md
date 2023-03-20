# Description

This API is used to fetch the commits of an specific repository, in this case going to be the `Github-test-frontend` repository.

Copy the .env.example file.

```bash
$ cp .env.example .env
```

## Dev environment

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# unit coverage
$ yarn test:cov
```

## Docker

```bash
$ docker-compose up --build
```

## NOTE
If you want to see in real-time when it pushes changes to the repository, only going to work with the docker image.