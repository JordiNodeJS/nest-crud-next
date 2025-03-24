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

## Diferencias entre `@default(autoincrement())` y `@default(cuid())` en Prisma

Para más información sobre las diferencias entre `@default(autoincrement())` y `@default(cuid())` en Prisma, consulta [este documento](docs/prisma-id-differences.md).

## Crear tabla con Prisma

Para crear una nueva tabla en la base de datos utilizando el esquema de Prisma, consulta [esta guía](docs/crear-tabla-prisma.md).
