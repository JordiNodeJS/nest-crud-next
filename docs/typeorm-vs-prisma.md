# Diferencias entre TypeORM y Prisma en proyectos NestJS

[← Volver al README principal](../README.md)

Este documento explica las diferencias sustanciales entre usar TypeORM y Prisma como ORM en un proyecto NestJS, con ejemplos prácticos de cómo cambiaría la implementación.

## Enfoques fundamentales

| Característica         | Prisma                           | TypeORM                                  |
| ---------------------- | -------------------------------- | ---------------------------------------- |
| Definición de esquema  | Schema-first con `schema.prisma` | Code-first con clases decoradas          |
| Generación de tipos    | Automática desde el esquema      | Manual o usando herramientas adicionales |
| Estilo de consulta     | API fluida orientada a consultas | Más cercano a SQL con QueryBuilder       |
| Integración con NestJS | Módulo personalizado             | Integración oficial (@nestjs/typeorm)    |

## Definición de modelos

### Con Prisma (actual)

```prisma
// schema.prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Con TypeORM (alternativa)

```typescript
// product.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column("float")
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

## DTOs con cada enfoque

### Con Prisma (actual)

```typescript
// create-product.dto.ts
import { Product } from "@prisma/client";

export type CreateProductDto = Omit<Product, "id" | "createdAt" | "updatedAt">;
```

### Con TypeORM (alternativa)

```typescript
// create-product.dto.ts
import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;
}
```

## Servicios y consultas

### Con Prisma (actual)

```typescript
// products.service.ts
@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  // ...otros métodos
}
```

### Con TypeORM (alternativa)

```typescript
// products.service.ts
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  // ...otros métodos
}
```

## Configuración del módulo

### Con Prisma (actual)

```typescript
// prisma.module.ts
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// products.module.ts
@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

### Con TypeORM (alternativa)

```typescript
// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "roonin",
      password: "password",
      database: "nest_crud",
      entities: [Product],
      synchronize: false,
    }),
    // ...otros módulos
  ],
})
export class AppModule {}

// products.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

## Sistema de migraciones

### Con Prisma (actual)

```bash
# Crear una migración
npx prisma migrate dev --name add_new_field

# Aplicar migraciones en producción
npx prisma migrate deploy
```

### Con TypeORM (alternativa)

```bash
# Generar una migración
npx typeorm migration:generate -n AddNewField

# Ejecutar migraciones
npx typeorm migration:run
```

## Relaciones entre entidades

### Con Prisma (actual)

```prisma
model Category {
  id        String    @id @default(cuid())
  name      String
  products  Product[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
}
```

### Con TypeORM (alternativa)

```typescript
@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
```

## Ventajas y desventajas

### Prisma

**Ventajas:**

- Seguridad de tipos superior y generación automática
- Sintaxis declarativa para consultas
- Migraciones robustas y reproducibles
- Mayor productividad con errores de compilación temprana
- Excelente detector de N+1 queries

**Desventajas:**

- Curva de aprendizaje inicial para quienes vienen de ORMs tradicionales
- Menor flexibilidad para consultas extremadamente complejas
- Necesita un servicio adicional para algunos features avanzados (Prisma Accelerate)

### TypeORM

**Ventajas:**

- Más familiar para desarrolladores con experiencia en ORMs clásicos como Hibernate
- Integración nativa con NestJS
- Mayor flexibilidad con el Query Builder para consultas muy específicas
- No requiere una capa adicional como Prisma Client

**Desventajas:**

- Menos seguridad de tipos (necesita configuración manual)
- Sistema de migraciones menos robusto
- Más propenso a errores en tiempo de ejecución
- Documentación a veces inconsistente

## Consideraciones para migrar de Prisma a TypeORM

Si quisieras migrar este proyecto de Prisma a TypeORM, necesitarías:

1. **Configurar TypeORM** en lugar de Prisma:

   - Instalar dependencias: `npm install @nestjs/typeorm typeorm pg`
   - Configurar la conexión en el AppModule

2. **Transformar modelos**:

   - Convertir esquemas de Prisma a clases Entity decoradas
   - Crear migraciones o usar synchronize (solo en desarrollo)

3. **Adaptar servicios**:

   - Cambiar la inyección de PrismaService a repositorios TypeORM
   - Actualizar la sintaxis de las consultas

4. **Actualizar DTOs**:
   - Cambiar de tipos derivados de Prisma a clases explícitas

## Conclusión

Tanto Prisma como TypeORM son excelentes ORMs para proyectos NestJS, pero con enfoques fundamentalmente diferentes:

- **Prisma** ofrece un enfoque más moderno, orientado a esquemas y con mejor seguridad de tipos, ideal para equipos que valoran la productividad y la detección temprana de errores.

- **TypeORM** proporciona un enfoque más tradicional y familiar para desarrolladores de Java/Hibernate, con mejor integración nativa con NestJS y más flexibilidad para consultas complejas.

La elección entre uno u otro debe basarse en los requisitos específicos del proyecto, la experiencia del equipo y las preferencias de desarrollo.

## Ver también

- [Guía para añadir nuevas entidades con CRUD completo](./adding-new-entity.md)
- [Diferencias entre @default(autoincrement()) y @default(cuid()) en Prisma](./prisma-id-differences.md)
- [Crear tabla con Prisma](./crear-tabla-prisma.md)
