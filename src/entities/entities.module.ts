import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import config from '../mikro-orm.config';

import { BookEntity } from './book.entity'
import { TagEntity } from './tag.entity';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [
        BookEntity,
        TagEntity
      ]
    })
  ],
  exports: [ MikroOrmModule ]
})
export class EntitiesModule {}
