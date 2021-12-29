import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EntitiesModule } from './entities/entities.module';

import { BooksModule } from './controllers/books/books.module';
import { TagsModule } from './controllers/tags/tags.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BooksModule, EntitiesModule, TagsModule]
})
export class AppModule {}
