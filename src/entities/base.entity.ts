import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ abstract: true })
export class BaseEntity {

  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property({ length: 6, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date = new Date();

  @Property({ length: 6, defaultRaw: `CURRENT_TIMESTAMP`, hidden: true })
  updatedAt?: Date = new Date();
}
