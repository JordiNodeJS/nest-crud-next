import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && (error.meta?.target as string[])?.includes('name')) {
          throw new ConflictException(`Product with name "${createProductDto.name}" already exists`);
        }
      }

      const isProd = this.configService.get('NODE_ENV') === 'production';
      if (isProd) {
        throw new InternalServerErrorException('Error while creating product');
      }
      throw error;
    }
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    const productDeleted = this.prismaService.product.delete({
      where: { id },
    });
    console.log('productDeleted', JSON.stringify(productDeleted));
    return productDeleted;
  }
}
