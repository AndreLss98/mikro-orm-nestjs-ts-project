import { Migration } from '@mikro-orm/migrations';
import { onUpdateTrigger } from './migration.utils';
export class Migration20211223104316 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(6) null default CURRENT_TIMESTAMP, "updated_at" timestamptz(6) null default CURRENT_TIMESTAMP, "title" varchar(100) not null, "release_date" timestamptz(0) not null default CURRENT_TIMESTAMP);');
    this.addSql('alter table "book" add constraint "book_pkey" primary key ("id");');

    this.addSql(onUpdateTrigger('book'));
  }

}
