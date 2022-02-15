import { Migration } from '@mikro-orm/migrations';

export class Migration20220215122116 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" serial primary key, "created_at" timestamptz(6) null default CURRENT_TIMESTAMP, "updated_at" timestamptz(6) null default CURRENT_TIMESTAMP, "name" varchar(100) not null);');

    this.addSql('create table "book" ("id" serial primary key, "created_at" timestamptz(6) null default CURRENT_TIMESTAMP, "updated_at" timestamptz(6) null default CURRENT_TIMESTAMP, "title" varchar(100) not null, "release_date" timestamptz(0) not null default CURRENT_TIMESTAMP);');

    this.addSql('create table "book_tags" ("book_entity_id" int4 not null, "tag_entity_id" int4 not null);');
    this.addSql('alter table "book_tags" add constraint "book_tags_pkey" primary key ("book_entity_id", "tag_entity_id");');

    this.addSql('alter table "book_tags" add constraint "book_tags_book_entity_id_foreign" foreign key ("book_entity_id") references "book" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "book_tags" add constraint "book_tags_tag_entity_id_foreign" foreign key ("tag_entity_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
