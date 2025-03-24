# Proyecto Nest CRUD Next

...existing content...

## Levantar la base de datos con Docker Compose

Para levantar la base de datos con Docker Compose, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.
2. Cambiate a la carpeta backend y ejecuta el siguiente comando en la terminal para levantar los servicios definidos en el archivo `docker-compose.yml`:

   ```sh
   docker-compose up -d
   ```

3. La base de datos estará disponible en `localhost` en el puerto `5432`.

- **npx prisma init --datasource-provider postgres:**
  Este comando inicializa un nuevo proyecto Prisma. Crea la estructura de directorios (por ejemplo, la carpeta `prisma`) junto con un archivo `schema.prisma` de plantilla y un archivo `.env`, configurados para que la fuente de datos sea PostgreSQL. Se utiliza al comenzar un proyecto con Prisma

## Database Migrations

To create and apply a new database migration, run:

```bash
npx prisma migrate dev --name Product
```

This command will:

- Create a new migration file with the name "Product"
- Apply any pending migrations to your database
- Regenerate the Prisma Client
- Run seed scripts (if configured)

Note: Make sure your database is running before executing migrations.

## Diferencias entre `@default(autoincrement())` y `@default(cuid())` en Prisma

Para más información sobre las diferencias entre `@default(autoincrement())` y `@default(cuid())` en Prisma, consulta [este documento](docs/prisma-id-differences.md).

## Crear tabla con Prisma

Para crear una nueva tabla en la base de datos utilizando el esquema de Prisma, consulta [esta guía](docs/crear-tabla-prisma.md).

## Documentación

- [Guía para añadir nuevas entidades con CRUD completo](./docs/adding-new-entity.md)
- [Diferencias entre TypeORM y Prisma](./docs/typeorm-vs-prisma.md)
- [Diferencias entre @default(autoincrement()) y @default(cuid()) en Prisma](./docs/prisma-id-differences.md)
- [Crear tabla con Prisma](./docs/crear-tabla-prisma.md)
