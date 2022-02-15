import { Migration } from '@mikro-orm/migrations';

export class Migration20220215122115 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `tag` (`id` integer not null primary key autoincrement, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP, `name` varchar not null);');

    this.addSql('create table `book` (`id` integer not null primary key autoincrement, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP, `title` varchar not null, `release_date` datetime not null default CURRENT_TIMESTAMP);');

    this.addSql('create table `book_tags` (`book_entity_id` integer not null, `tag_entity_id` integer not null, primary key (`book_entity_id`, `tag_entity_id`));');
    this.addSql('create index `book_tags_book_entity_id_index` on `book_tags` (`book_entity_id`);');
    this.addSql('create index `book_tags_tag_entity_id_index` on `book_tags` (`tag_entity_id`);');
  }

}
