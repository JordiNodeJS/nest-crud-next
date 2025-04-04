import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
