import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
