import './env-loader';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await MikroORM.init();
  const migrator = app.get(MikroORM).getMigrator();
  await migrator.up();

  await app.listen(3000);

  return null;
}

bootstrap();
