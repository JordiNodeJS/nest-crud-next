// import { PartialType } from '@nestjs/mapped-types';

import { Product } from '@prisma/client';

// export class UpdateProductDto extends PartialType(CreateProductDto) {}

export type UpdateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
