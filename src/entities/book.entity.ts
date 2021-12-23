import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { TagEntity } from './tag.entity';

@Entity({ tableName: 'book' })
export class BookEntity extends BaseEntity {
  
  @Property({ length: 100 })
  title: string;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  releaseDate: Date = new Date();

  @ManyToMany({ entity: () => TagEntity, inversedBy: 'books'})
  tags: Collection<TagEntity> = new Collection<TagEntity>(this);
}