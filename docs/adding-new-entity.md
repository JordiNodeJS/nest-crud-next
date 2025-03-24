# Guía para añadir nuevas entidades con CRUD completo

[← Volver al README principal](../README.md)

Esta guía explica el proceso paso a paso para añadir una nueva entidad con operaciones CRUD completas en la aplicación NestJS con Prisma.

## 1. Actualizar el esquema de Prisma

Primero, actualiza el archivo `schema.prisma` para añadir tu nueva entidad. Siguiendo las mejores prácticas de este proyecto, usaremos `cuid()` para IDs:

```prisma
model Category {
  id          String    @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## 2. Aplicar la migración de Prisma

Ejecuta el siguiente comando para crear y aplicar la migración:

```bash
npx prisma migrate dev --name add_category
```

Este comando:

- Creará un archivo de migración con el nombre "add_category"
- Aplicará la migración a tu base de datos
- Regenerará el cliente de Prisma

## 3. Generar un nuevo recurso con NestJS CLI

Utiliza el CLI de NestJS para generar el recurso base:

```bash
nest g resource categories
```

Selecciona "REST API" cuando se te solicite y "Yes" para generar operaciones CRUD.

## 4. Implementar los DTOs

En este proyecto, los DTOs están basados en los tipos generados por Prisma. Sigue el patrón existente:

### Actualiza el DTO para crear categorías

```typescript
// filepath: g:\DEV\nest-crud-next\src\categories\dto\create-category.dto.ts
import { Category } from "@prisma/client";

export type CreateCategoryDto = Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>;
```

### Actualiza el DTO para actualizar categorías

```typescript
// filepath: g:\DEV\nest-crud-next\src\categories\dto\update-category.dto.ts
import { Category } from "@prisma/client";

export type UpdateCategoryDto = Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>;
```

## 5. Implementar el servicio

Actualiza el servicio generado para usar Prisma, siguiendo el patrón del proyecto:

```typescript
// filepath: g:\DEV\nest-crud-next\src\categories\categories.service.ts
import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
```

## 6. Actualizar el controlador

El controlador generado necesitará algunas modificaciones para trabajar con strings para los IDs:

```typescript
// filepath: g:\DEV\nest-crud-next\src\categories\categories.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
```

## 7. Actualizar el módulo

Asegúrate de importar el PrismaModule en el módulo generado:

```typescript
// filepath: g:\DEV\nest-crud-next\src\categories\categories.module.ts
import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
```

## 8. Actualizar el módulo principal (app.module.ts)

```typescript
// filepath: g:\DEV\nest-crud-next\src\app.module.ts
import { Module } from "@nestjs/common";
// ...existing code...
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule],
  // ...existing code...
})
export class AppModule {}
```

## 9. Actualizar entity (si es necesario)

Aunque el CLI de NestJS genera un archivo `category.entity.ts`, en este proyecto no se usa directamente ya que los tipos vienen de Prisma. Puedes dejarlo como está o personalizarlo:

```typescript
// filepath: g:\DEV\nest-crud-next\src\categories\entities\category.entity.ts
export class Category {}
```

## 10. Probar los endpoints

Ahora puedes probar los endpoints CRUD para categorías:

- `POST /api/categories` - Crear categoría
- `GET /api/categories` - Obtener todas las categorías
- `GET /api/categories/:id` - Obtener una categoría por ID
- `PATCH /api/categories/:id` - Actualizar una categoría
- `DELETE /api/categories/:id` - Eliminar una categoría

Recuerda que la API tiene el prefijo global `/api` según la configuración en `main.ts`.

## 11. Consideraciones adicionales

- Puedes usar el cliente de Prisma autogenerado para tener tipos completos en tus métodos
- Para relaciones entre entidades, actualiza el esquema de Prisma adecuadamente
- Para filtros avanzados, aprovecha las capacidades de consulta de Prisma
- Si necesitas personalizar las respuestas, puedes usar interceptores de NestJS

## Ver también

- [Diferencias entre TypeORM y Prisma](./typeorm-vs-prisma.md)
- [Diferencias entre @default(autoincrement()) y @default(cuid()) en Prisma](./prisma-id-differences.md)
- [Crear tabla con Prisma](./crear-tabla-prisma.md)

Este proceso puedes repetirlo para cualquier nueva entidad que necesites añadir a tu aplicación.
