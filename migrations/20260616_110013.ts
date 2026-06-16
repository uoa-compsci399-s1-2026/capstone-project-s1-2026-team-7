import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_donations_page_support_section_items_icon" AS ENUM('microscope', 'bed', 'building', 'heart');
  CREATE TABLE "donations_page_support_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_donations_page_support_section_items_icon" NOT NULL
  );
  
  CREATE TABLE "donations_page_support_section_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "donations_page_support_section_items" ADD CONSTRAINT "donations_page_support_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donations_page_support_section_items_locales" ADD CONSTRAINT "donations_page_support_section_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page_support_section_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "donations_page_support_section_items_order_idx" ON "donations_page_support_section_items" USING btree ("_order");
  CREATE INDEX "donations_page_support_section_items_parent_id_idx" ON "donations_page_support_section_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "donations_page_support_section_items_locales_locale_parent_i" ON "donations_page_support_section_items_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "donations_page_support_section_items" CASCADE;
  DROP TABLE "donations_page_support_section_items_locales" CASCADE;
  DROP TYPE "public"."enum_donations_page_support_section_items_icon";`)
}
