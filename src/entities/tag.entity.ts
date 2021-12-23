import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { BookEntity } from "./book.entity";

@Entity({ tableName: 'tag' })
export class TagEntity extends BaseEntity {

    @Property({ length: 100 })
    name: string;

    @ManyToMany({ entity: () => BookEntity, mappedBy: 'tags'})
    books: Collection<BookEntity> = new Collection<BookEntity>(this);
}