import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

import { EntitiesModule } from './entities/entities.module';
import { TagsModule } from './tags/tags.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BooksModule, EntitiesModule, TagsModule]
})
export class AppModule {}
