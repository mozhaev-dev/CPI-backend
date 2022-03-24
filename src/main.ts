import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 7001;

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(port, () =>
    console.log(`Server is runing, env: ${process.env.NODE_ENV}`),
  );
}
bootstrap();
