import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_donations_page_stats_stats_key" AS ENUM('graduates', 'publications', 'partners', 'participants');
  CREATE TABLE "donations_page_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_donations_page_stats_stats_key" NOT NULL,
  	"value" numeric NOT NULL
  );
  
  CREATE TABLE "donations_page_stats_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "donations_page_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "donations_page_partners_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "donations_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"donation_link_background_image_id" integer NOT NULL,
  	"donation_link_button_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "donations_page_locales" (
  	"hero_title" varchar DEFAULT 'Donations That Change The World' NOT NULL,
  	"hero_blurb" varchar NOT NULL,
  	"hero_button_label" varchar DEFAULT 'Make a Donation',
  	"support_section_heading" varchar DEFAULT 'What Your Support Enables' NOT NULL,
  	"stats_title" varchar DEFAULT 'Your Impact' NOT NULL,
  	"stats_description" varchar NOT NULL,
  	"donation_link_title" varchar NOT NULL,
  	"donation_link_description" varchar NOT NULL,
  	"donation_link_button_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "donations_page_stats_stats" ADD CONSTRAINT "donations_page_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donations_page_stats_stats_locales" ADD CONSTRAINT "donations_page_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donations_page_partners" ADD CONSTRAINT "donations_page_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations_page_partners" ADD CONSTRAINT "donations_page_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donations_page_partners_locales" ADD CONSTRAINT "donations_page_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donations_page" ADD CONSTRAINT "donations_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations_page" ADD CONSTRAINT "donations_page_donation_link_background_image_id_media_id_fk" FOREIGN KEY ("donation_link_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations_page_locales" ADD CONSTRAINT "donations_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "donations_page_stats_stats_order_idx" ON "donations_page_stats_stats" USING btree ("_order");
  CREATE INDEX "donations_page_stats_stats_parent_id_idx" ON "donations_page_stats_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "donations_page_stats_stats_locales_locale_parent_id_unique" ON "donations_page_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donations_page_partners_order_idx" ON "donations_page_partners" USING btree ("_order");
  CREATE INDEX "donations_page_partners_parent_id_idx" ON "donations_page_partners" USING btree ("_parent_id");
  CREATE INDEX "donations_page_partners_logo_idx" ON "donations_page_partners" USING btree ("logo_id");
  CREATE UNIQUE INDEX "donations_page_partners_locales_locale_parent_id_unique" ON "donations_page_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donations_page_hero_hero_image_idx" ON "donations_page" USING btree ("hero_image_id");
  CREATE INDEX "donations_page_donation_link_donation_link_background_im_idx" ON "donations_page" USING btree ("donation_link_background_image_id");
  CREATE UNIQUE INDEX "donations_page_locales_locale_parent_id_unique" ON "donations_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "donations_page_stats_stats" CASCADE;
  DROP TABLE "donations_page_stats_stats_locales" CASCADE;
  DROP TABLE "donations_page_partners" CASCADE;
  DROP TABLE "donations_page_partners_locales" CASCADE;
  DROP TABLE "donations_page" CASCADE;
  DROP TABLE "donations_page_locales" CASCADE;
  DROP TYPE "public"."enum_donations_page_stats_stats_key";`)
}
