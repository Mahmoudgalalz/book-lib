## Installation

```bash
$ pnpm install
```

## run the db

```bash
  docker compose up -d
```

you can come up with any db from plantscale, or any place


```bash
cp .env.example .env
```

everything is correrct in the .env no worries to edit


## Run migration 

the database will be seeded automaticlly so start testing

```bash

$ pnpm db:push
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
