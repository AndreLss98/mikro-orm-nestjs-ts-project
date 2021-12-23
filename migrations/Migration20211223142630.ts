import { Migration } from '@mikro-orm/migrations';

export class Migration20211223142630 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book_tags" ("book_entity_id" uuid not null, "tag_entity_id" uuid not null);');
    this.addSql('alter table "book_tags" add constraint "book_tags_pkey" primary key ("book_entity_id", "tag_entity_id");');

    this.addSql('alter table "book_tags" add constraint "book_tags_book_entity_id_foreign" foreign key ("book_entity_id") references "book" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "book_tags" add constraint "book_tags_tag_entity_id_foreign" foreign key ("tag_entity_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
