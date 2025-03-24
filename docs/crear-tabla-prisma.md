# Crear tabla con Prisma

Esta guía explica cómo crear una tabla en la base de datos usando el esquema de Prisma y cómo verificar que se ha creado correctamente en el contenedor de PostgreSQL.

## 1. Definir la tabla en el esquema de Prisma

Edita el archivo `schema.prisma` para añadir el modelo correspondiente.

Ejemplo:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  // ...otras propiedades...
}
```

Luego, ejecuta la migración:

```sh
npx prisma migrate dev --name add_user_table
```

## 2. Verificar la creación de la tabla en PostgreSQL

Primero, comprueba que el contenedor de PostgreSQL esté en ejecución:

```sh
docker ps
```

La salida debería incluir una línea similar a:

```
CONTAINER ID   IMAGE                COMMAND                  CREATED        STATUS        PORTS                    NAMES
9ffb9c7643da   postgres:12-alpine   "docker-entrypoint.s…"   18 hours ago   Up 18 hours   0.0.0.0:5432->5432/tcp   postgres
```

Luego, conecta al contenedor y accede a la base de datos con psql:

```sh
docker exec -it postgres psql -U roonin -d nest_crud
```

En la consola de psql, lista las tablas con:

```sql
\dt
```

Deberías ver la tabla `User` (u otra que hayas definido).
