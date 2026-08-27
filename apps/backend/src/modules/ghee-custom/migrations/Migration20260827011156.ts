import { Migration } from '@mikro-orm/migrations';

export class Migration20260827011156 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "contact_inquiry" ("id" text not null, "name" text not null, "email" text not null, "phone" text null, "subject" text not null, "message" text not null, "status" text check ("status" in (\'pending\', \'read\', \'resolved\')) not null default \'pending\', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "contact_inquiry_pkey" primary key ("id"));');

    this.addSql('create table if not exists "product_review" ("id" text not null, "customer_name" text not null, "rating" numeric not null, "title" text not null, "content" text not null, "is_approved" boolean not null default false, "raw_rating" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_review_pkey" primary key ("id"));');

    this.addSql('create table if not exists "wishlist" ("id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "wishlist_pkey" primary key ("id"));');

    this.addSql('create table if not exists "wishlist_item" ("id" text not null, "wishlist_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "wishlist_item_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_wishlist_item_wishlist_id" ON "wishlist_item" (wishlist_id) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "wishlist_item" add constraint "wishlist_item_wishlist_id_foreign" foreign key ("wishlist_id") references "wishlist" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "wishlist_item" drop constraint if exists "wishlist_item_wishlist_id_foreign";');

    this.addSql('drop table if exists "contact_inquiry" cascade;');

    this.addSql('drop table if exists "product_review" cascade;');

    this.addSql('drop table if exists "wishlist" cascade;');

    this.addSql('drop table if exists "wishlist_item" cascade;');
  }

}
