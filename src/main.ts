import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.LISTEN_PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server started on port: ${port}`));
}
bootstrap();
