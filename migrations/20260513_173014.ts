import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "home_page_blocks_timeline_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "home_page_blocks_timeline_items_locales" (
      "year" varchar NOT NULL,
      "description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "home_page_blocks_timeline_locales" (
      "eyebrow" varchar DEFAULT 'About the HNU' NOT NULL,
      "title" varchar DEFAULT 'Our History' NOT NULL,
      "description" varchar DEFAULT 'Our journey, marked by self-sustaining growth, reflects our enduring commitment to defining the gold standard in human nutrition research.' NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "home_page_blocks_who_we_are_locales" (
      "title" varchar DEFAULT 'Who We Are' NOT NULL,
      "description" varchar DEFAULT 'The HNU is a premier research facility within the University of Auckland, distinguished as the only residential nutrition unit in Australasia.

Our specialized environment allows for the characterization of diverse populations through safety and efficacy trials that are analogous to pharmaceutical-grade clinical standards.' NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "home_page_blocks_what_we_do_sections_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "home_page_blocks_what_we_do_sections_items_locales" (
      "text" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "home_page_blocks_what_we_do_sections" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "home_page_blocks_what_we_do_sections_locales" (
      "heading" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "home_page_blocks_what_we_do_locales" (
      "title" varchar DEFAULT 'What We Do' NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    ALTER TABLE "studies" ADD COLUMN "compensation" varchar;
    ALTER TABLE "studies" ADD COLUMN "slug" varchar;

    UPDATE "studies" AS s
    SET "compensation" = COALESCE(l."compensation", '')
    FROM "studies_locales" AS l
    WHERE l."_parent_id" = s."id"
      AND l."_locale" = 'en';

    UPDATE "studies" AS s
    SET "slug" = COALESCE(l."slug", 'study-' || s."id")
    FROM "studies_locales" AS l
    WHERE l."_parent_id" = s."id"
      AND l."_locale" = 'en';

    UPDATE "studies"
    SET "compensation" = ''
    WHERE "compensation" IS NULL;

    UPDATE "studies"
    SET "slug" = 'study-' || "id"
    WHERE "slug" IS NULL OR "slug" = '';

    ALTER TABLE "studies" ALTER COLUMN "compensation" SET NOT NULL;
    ALTER TABLE "studies" ALTER COLUMN "slug" SET NOT NULL;

    ALTER TABLE "home_page_blocks_who_we_are" ADD COLUMN "image_id" integer;
    ALTER TABLE "home_page_blocks_what_we_do" ADD COLUMN "image_id" integer;

    ALTER TABLE "home_page_blocks_timeline_items" ADD CONSTRAINT "home_page_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_timeline_items_locales" ADD CONSTRAINT "home_page_blocks_timeline_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_timeline_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_timeline_locales" ADD CONSTRAINT "home_page_blocks_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_who_we_are_locales" ADD CONSTRAINT "home_page_blocks_who_we_are_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_what_we_do_sections_items" ADD CONSTRAINT "home_page_blocks_what_we_do_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_what_we_do_sections"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_what_we_do_sections_items_locales" ADD CONSTRAINT "home_page_blocks_what_we_do_sections_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_what_we_do_sections_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_what_we_do_sections" ADD CONSTRAINT "home_page_blocks_what_we_do_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_what_we_do"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_what_we_do_sections_locales" ADD CONSTRAINT "home_page_blocks_what_we_do_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_what_we_do_sections"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_page_blocks_what_we_do_locales" ADD CONSTRAINT "home_page_blocks_what_we_do_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_what_we_do"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "home_page_blocks_timeline_items_order_idx" ON "home_page_blocks_timeline_items" USING btree ("_order");
    CREATE INDEX "home_page_blocks_timeline_items_parent_id_idx" ON "home_page_blocks_timeline_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "home_page_blocks_timeline_items_locales_locale_parent_id_uni" ON "home_page_blocks_timeline_items_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX "home_page_blocks_timeline_locales_locale_parent_id_unique" ON "home_page_blocks_timeline_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX "home_page_blocks_who_we_are_locales_locale_parent_id_unique" ON "home_page_blocks_who_we_are_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX "home_page_blocks_what_we_do_sections_items_order_idx" ON "home_page_blocks_what_we_do_sections_items" USING btree ("_order");
    CREATE INDEX "home_page_blocks_what_we_do_sections_items_parent_id_idx" ON "home_page_blocks_what_we_do_sections_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "home_page_blocks_what_we_do_sections_items_locales_locale_pa" ON "home_page_blocks_what_we_do_sections_items_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX "home_page_blocks_what_we_do_sections_order_idx" ON "home_page_blocks_what_we_do_sections" USING btree ("_order");
    CREATE INDEX "home_page_blocks_what_we_do_sections_parent_id_idx" ON "home_page_blocks_what_we_do_sections" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "home_page_blocks_what_we_do_sections_locales_locale_parent_i" ON "home_page_blocks_what_we_do_sections_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX "home_page_blocks_what_we_do_locales_locale_parent_id_unique" ON "home_page_blocks_what_we_do_locales" USING btree ("_locale","_parent_id");

    ALTER TABLE "home_page_blocks_who_we_are" ADD CONSTRAINT "home_page_blocks_who_we_are_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "home_page_blocks_what_we_do" ADD CONSTRAINT "home_page_blocks_what_we_do_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "home_page_blocks_who_we_are_image_idx" ON "home_page_blocks_who_we_are" USING btree ("image_id");
    CREATE INDEX "home_page_blocks_what_we_do_image_idx" ON "home_page_blocks_what_we_do" USING btree ("image_id");

    ALTER TABLE "studies_locales" DROP COLUMN "compensation";
    ALTER TABLE "studies_locales" DROP COLUMN "slug";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page_blocks_timeline_items" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_timeline_items_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_timeline_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_who_we_are_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_what_we_do_sections_items" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_what_we_do_sections_items_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_what_we_do_sections" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_what_we_do_sections_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "home_page_blocks_what_we_do_locales" DISABLE ROW LEVEL SECURITY;

    DROP TABLE "home_page_blocks_timeline_items" CASCADE;
    DROP TABLE "home_page_blocks_timeline_items_locales" CASCADE;
    DROP TABLE "home_page_blocks_timeline_locales" CASCADE;
    DROP TABLE "home_page_blocks_who_we_are_locales" CASCADE;
    DROP TABLE "home_page_blocks_what_we_do_sections_items" CASCADE;
    DROP TABLE "home_page_blocks_what_we_do_sections_items_locales" CASCADE;
    DROP TABLE "home_page_blocks_what_we_do_sections" CASCADE;
    DROP TABLE "home_page_blocks_what_we_do_sections_locales" CASCADE;
    DROP TABLE "home_page_blocks_what_we_do_locales" CASCADE;

    ALTER TABLE "home_page_blocks_who_we_are" DROP CONSTRAINT "home_page_blocks_who_we_are_image_id_media_id_fk";
    ALTER TABLE "home_page_blocks_what_we_do" DROP CONSTRAINT "home_page_blocks_what_we_do_image_id_media_id_fk";

    DROP INDEX "home_page_blocks_who_we_are_image_idx";
    DROP INDEX "home_page_blocks_what_we_do_image_idx";

    ALTER TABLE "studies_locales" ADD COLUMN "compensation" varchar;
    ALTER TABLE "studies_locales" ADD COLUMN "slug" varchar;

    UPDATE "studies_locales" AS l
    SET "compensation" = COALESCE(s."compensation", '')
    FROM "studies" AS s
    WHERE l."_parent_id" = s."id";

    UPDATE "studies_locales" AS l
    SET "slug" = COALESCE(s."slug", 'study-' || s."id")
    FROM "studies" AS s
    WHERE l."_parent_id" = s."id";

    UPDATE "studies_locales"
    SET "compensation" = ''
    WHERE "compensation" IS NULL;

    UPDATE "studies_locales"
    SET "slug" = 'study-' || "_parent_id"
    WHERE "slug" IS NULL OR "slug" = '';

    ALTER TABLE "studies_locales" ALTER COLUMN "compensation" SET NOT NULL;
    ALTER TABLE "studies_locales" ALTER COLUMN "slug" SET NOT NULL;

    ALTER TABLE "studies" DROP COLUMN "compensation";
    ALTER TABLE "studies" DROP COLUMN "slug";
    ALTER TABLE "home_page_blocks_who_we_are" DROP COLUMN "image_id";
    ALTER TABLE "home_page_blocks_what_we_do" DROP COLUMN "image_id";
  `)
}
