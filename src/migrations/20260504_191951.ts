import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_blocks_hero_buttons_variant" AS ENUM('primary', 'secondary');
  CREATE TABLE "home_page_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_home_page_blocks_hero_buttons_variant" DEFAULT 'primary' NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero_buttons_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"portrait_hero_image_id" integer NOT NULL,
  	"mobile_hero_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_hero_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_research_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_partners_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "home_page_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_partners_section_partners" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_hero_buttons" CASCADE;
  DROP TABLE "home_page_hero_buttons_locales" CASCADE;
  DROP TABLE "home_page_partners_section_partners" CASCADE;
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_portrait_hero_image_id_media_id_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_mobile_hero_image_id_media_id_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_about_section_portrait_image_id_media_id_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_about_section_mobile_image_id_media_id_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_studies_fk";
  
  DROP INDEX "home_page_hero_hero_portrait_hero_image_idx";
  DROP INDEX "home_page_hero_hero_mobile_hero_image_idx";
  DROP INDEX "home_page_about_section_about_section_portrait_image_idx";
  DROP INDEX "home_page_about_section_about_section_mobile_image_idx";
  DROP INDEX "home_page_rels_studies_id_idx";
  ALTER TABLE "home_page_rels" ADD COLUMN "research_id" integer;
  ALTER TABLE "home_page_blocks_hero_buttons" ADD CONSTRAINT "home_page_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_buttons_locales" ADD CONSTRAINT "home_page_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_portrait_hero_image_id_media_id_fk" FOREIGN KEY ("portrait_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_mobile_hero_image_id_media_id_fk" FOREIGN KEY ("mobile_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_locales" ADD CONSTRAINT "home_page_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_research" ADD CONSTRAINT "home_page_blocks_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_research_locales" ADD CONSTRAINT "home_page_blocks_research_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_partners_partners" ADD CONSTRAINT "home_page_blocks_partners_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_partners_partners" ADD CONSTRAINT "home_page_blocks_partners_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_partners" ADD CONSTRAINT "home_page_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card" ADD CONSTRAINT "home_page_blocks_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_info" ADD CONSTRAINT "home_page_blocks_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_stats" ADD CONSTRAINT "home_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_timeline" ADD CONSTRAINT "home_page_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_blocks_hero_buttons_order_idx" ON "home_page_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_buttons_parent_id_idx" ON "home_page_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_hero_buttons_locales_locale_parent_id_uniqu" ON "home_page_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_hero_order_idx" ON "home_page_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_parent_id_idx" ON "home_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_hero_path_idx" ON "home_page_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_page_blocks_hero_portrait_hero_image_idx" ON "home_page_blocks_hero" USING btree ("portrait_hero_image_id");
  CREATE INDEX "home_page_blocks_hero_mobile_hero_image_idx" ON "home_page_blocks_hero" USING btree ("mobile_hero_image_id");
  CREATE UNIQUE INDEX "home_page_blocks_hero_locales_locale_parent_id_unique" ON "home_page_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_research_order_idx" ON "home_page_blocks_research" USING btree ("_order");
  CREATE INDEX "home_page_blocks_research_parent_id_idx" ON "home_page_blocks_research" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_research_path_idx" ON "home_page_blocks_research" USING btree ("_path");
  CREATE UNIQUE INDEX "home_page_blocks_research_locales_locale_parent_id_unique" ON "home_page_blocks_research_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_partners_partners_order_idx" ON "home_page_blocks_partners_partners" USING btree ("_order");
  CREATE INDEX "home_page_blocks_partners_partners_parent_id_idx" ON "home_page_blocks_partners_partners" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_partners_partners_logo_idx" ON "home_page_blocks_partners_partners" USING btree ("logo_id");
  CREATE INDEX "home_page_blocks_partners_order_idx" ON "home_page_blocks_partners" USING btree ("_order");
  CREATE INDEX "home_page_blocks_partners_parent_id_idx" ON "home_page_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_partners_path_idx" ON "home_page_blocks_partners" USING btree ("_path");
  CREATE INDEX "home_page_blocks_card_order_idx" ON "home_page_blocks_card" USING btree ("_order");
  CREATE INDEX "home_page_blocks_card_parent_id_idx" ON "home_page_blocks_card" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_card_path_idx" ON "home_page_blocks_card" USING btree ("_path");
  CREATE INDEX "home_page_blocks_info_order_idx" ON "home_page_blocks_info" USING btree ("_order");
  CREATE INDEX "home_page_blocks_info_parent_id_idx" ON "home_page_blocks_info" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_info_path_idx" ON "home_page_blocks_info" USING btree ("_path");
  CREATE INDEX "home_page_blocks_stats_order_idx" ON "home_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "home_page_blocks_stats_parent_id_idx" ON "home_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_stats_path_idx" ON "home_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "home_page_blocks_timeline_order_idx" ON "home_page_blocks_timeline" USING btree ("_order");
  CREATE INDEX "home_page_blocks_timeline_parent_id_idx" ON "home_page_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_timeline_path_idx" ON "home_page_blocks_timeline" USING btree ("_path");
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_research_fk" FOREIGN KEY ("research_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_rels_research_id_idx" ON "home_page_rels" USING btree ("research_id");
  ALTER TABLE "home_page" DROP COLUMN "hero_portrait_hero_image_id";
  ALTER TABLE "home_page" DROP COLUMN "hero_mobile_hero_image_id";
  ALTER TABLE "home_page" DROP COLUMN "about_section_portrait_image_id";
  ALTER TABLE "home_page" DROP COLUMN "about_section_mobile_image_id";
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_title";
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_description";
  ALTER TABLE "home_page_locales" DROP COLUMN "studies_section_title";
  ALTER TABLE "home_page_locales" DROP COLUMN "about_section_heading";
  ALTER TABLE "home_page_locales" DROP COLUMN "about_section_body";
  ALTER TABLE "home_page_rels" DROP COLUMN "studies_id";
  DROP TYPE "public"."enum_home_page_hero_buttons_variant";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_hero_buttons_variant" AS ENUM('primary', 'secondary');
  CREATE TABLE "home_page_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_home_page_hero_buttons_variant" DEFAULT 'primary' NOT NULL
  );
  
  CREATE TABLE "home_page_hero_buttons_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_partners_section_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  ALTER TABLE "home_page_blocks_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_research" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_research_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_partners_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_blocks_hero_buttons" CASCADE;
  DROP TABLE "home_page_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "home_page_blocks_hero" CASCADE;
  DROP TABLE "home_page_blocks_hero_locales" CASCADE;
  DROP TABLE "home_page_blocks_research" CASCADE;
  DROP TABLE "home_page_blocks_research_locales" CASCADE;
  DROP TABLE "home_page_blocks_partners_partners" CASCADE;
  DROP TABLE "home_page_blocks_partners" CASCADE;
  DROP TABLE "home_page_blocks_card" CASCADE;
  DROP TABLE "home_page_blocks_info" CASCADE;
  DROP TABLE "home_page_blocks_stats" CASCADE;
  DROP TABLE "home_page_blocks_timeline" CASCADE;
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_research_fk";
  
  DROP INDEX "home_page_rels_research_id_idx";
  ALTER TABLE "home_page" ADD COLUMN "hero_portrait_hero_image_id" integer NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_mobile_hero_image_id" integer NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_section_portrait_image_id" integer NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_section_mobile_image_id" integer NOT NULL;
  ALTER TABLE "home_page_locales" ADD COLUMN "hero_title" varchar NOT NULL;
  ALTER TABLE "home_page_locales" ADD COLUMN "hero_description" varchar NOT NULL;
  ALTER TABLE "home_page_locales" ADD COLUMN "studies_section_title" varchar NOT NULL;
  ALTER TABLE "home_page_locales" ADD COLUMN "about_section_heading" varchar NOT NULL;
  ALTER TABLE "home_page_locales" ADD COLUMN "about_section_body" varchar NOT NULL;
  ALTER TABLE "home_page_rels" ADD COLUMN "studies_id" integer;
  ALTER TABLE "home_page_hero_buttons" ADD CONSTRAINT "home_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_buttons_locales" ADD CONSTRAINT "home_page_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_partners_section_partners" ADD CONSTRAINT "home_page_partners_section_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_partners_section_partners" ADD CONSTRAINT "home_page_partners_section_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_hero_buttons_order_idx" ON "home_page_hero_buttons" USING btree ("_order");
  CREATE INDEX "home_page_hero_buttons_parent_id_idx" ON "home_page_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_buttons_locales_locale_parent_id_unique" ON "home_page_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_partners_section_partners_order_idx" ON "home_page_partners_section_partners" USING btree ("_order");
  CREATE INDEX "home_page_partners_section_partners_parent_id_idx" ON "home_page_partners_section_partners" USING btree ("_parent_id");
  CREATE INDEX "home_page_partners_section_partners_logo_idx" ON "home_page_partners_section_partners" USING btree ("logo_id");
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_portrait_hero_image_id_media_id_fk" FOREIGN KEY ("hero_portrait_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_mobile_hero_image_id_media_id_fk" FOREIGN KEY ("hero_mobile_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_section_portrait_image_id_media_id_fk" FOREIGN KEY ("about_section_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_section_mobile_image_id_media_id_fk" FOREIGN KEY ("about_section_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_hero_hero_portrait_hero_image_idx" ON "home_page" USING btree ("hero_portrait_hero_image_id");
  CREATE INDEX "home_page_hero_hero_mobile_hero_image_idx" ON "home_page" USING btree ("hero_mobile_hero_image_id");
  CREATE INDEX "home_page_about_section_about_section_portrait_image_idx" ON "home_page" USING btree ("about_section_portrait_image_id");
  CREATE INDEX "home_page_about_section_about_section_mobile_image_idx" ON "home_page" USING btree ("about_section_mobile_image_id");
  CREATE INDEX "home_page_rels_studies_id_idx" ON "home_page_rels" USING btree ("studies_id");
  ALTER TABLE "home_page_rels" DROP COLUMN "research_id";
  DROP TYPE "public"."enum_home_page_blocks_hero_buttons_variant";`)
}
