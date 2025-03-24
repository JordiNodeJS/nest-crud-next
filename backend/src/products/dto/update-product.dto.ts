// import { PartialType } from '@nestjs/mapped-types';
// export class UpdateProductDto extends PartialType(CreateProductDto) {}
import { CreateProductDto } from './create-product.dto';

export type UpdateProductDto = Partial<CreateProductDto>;
