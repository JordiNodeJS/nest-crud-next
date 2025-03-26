# Uso del Patrón Repositorio con Prisma

[← Volver al README principal](../README.md)

Con Prisma, no es estrictamente necesario utilizar el patrón repositorio de la misma manera que en TypeORM, aunque puedes hacerlo si lo prefieres.

Aquí te explico las diferencias y cómo puedes abordar esto:

**TypeORM y el patrón repositorio:**

- TypeORM es un ORM completo que proporciona una implementación del patrón repositorio a través de sus entidades y repositorios.
- En TypeORM, defines entidades que representan tus tablas de base de datos y luego creas repositorios para interactuar con esas entidades.
- El patrón repositorio en TypeORM ayuda a desacoplar la lógica de acceso a datos de la lógica de negocio, lo que facilita las pruebas y el mantenimiento.

**Ejemplo con TypeORM:**

```typescript
// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// products.repository.ts
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async update(id: number, partialProduct: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, partialProduct);
    return this.productRepository.findOneOrFail({ where: { id } });
  }
```

**Prisma y el patrón repositorio:**

- Prisma, por otro lado, se enfoca en ser una herramienta de acceso a datos más flexible y no impone el uso del patrón repositorio.
- El Cliente de Prisma generado te proporciona un conjunto de funciones y métodos para interactuar directamente con tu base de datos, sin necesidad de definir repositorios adicionales.
- Sin embargo, si deseas seguir el patrón repositorio para organizar mejor tu código y desacoplar la lógica de acceso a datos, puedes crear tus propios repositorios que utilicen el Cliente de Prisma para interactuar con la base de datos.

**Ejemplo con Prisma (sin patrón repositorio):**

```typescript
// products.service.ts
import { Injectable } from "@nestjs.common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
```

**Ejemplo con Prisma (con patrón repositorio):**

```typescript
// products.repository.ts
import { Injectable } from "@nestjs.common";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "@prisma/client";

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async update(id: string, data: any): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}

// products.service.ts
import { Injectable } from "@nestjs.common";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async findAll() {
    return this.productsRepository.findAll();
  }

  async update(id: string, data: any) {
    return this.productsRepository.update(id, data);
  }
}
```

**Cuándo usar el patrón repositorio con Prisma:**

- Si tienes una lógica de negocio compleja que interactúa con la base de datos.
- Si deseas facilitar las pruebas unitarias de tu código.
- Si prefieres una estructura de código más organizada y desacoplada.

**Cómo implementar el patrón repositorio con Prisma:**

1.  Define interfaces para tus repositorios.
2.  Crea clases que implementen esas interfaces y utilicen el Cliente de Prisma para interactuar con la base de datos.
3.  Inyecta tus repositorios en tus servicios o controladores.

En resumen, Prisma te da la flexibilidad de elegir si quieres usar el patrón repositorio o no. Si prefieres una solución más simple y directa, puedes usar el Cliente de Prisma directamente en tus servicios o controladores. Si necesitas más desacoplamiento y organización, puedes implementar el patrón repositorio utilizando el Cliente de Prisma.
