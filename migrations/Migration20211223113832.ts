import { Migration } from '@mikro-orm/migrations';
import { onUpdateTrigger } from './migration.utils';

export class Migration20211223113832 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(6) null default CURRENT_TIMESTAMP, "updated_at" timestamptz(6) null default CURRENT_TIMESTAMP, "name" varchar(100) not null);');
    this.addSql('alter table "tag" add constraint "tag_pkey" primary key ("id");');

    this.addSql(onUpdateTrigger('tag'));
  }

}
