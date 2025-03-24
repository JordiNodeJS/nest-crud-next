import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3100);

  // Captura la señal de terminación y cierra la aplicación
  process.on('SIGTERM', async () => {
    // SIGTERM es una señal que se envía a un proceso para indicarle que debe terminar.
    await app.close();
    process.exit(0);
  });
}
bootstrap();
