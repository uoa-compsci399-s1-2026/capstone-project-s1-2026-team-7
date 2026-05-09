import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "studies_participation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "studies_participation_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "studies_eligibility_inclusion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "studies_eligibility_inclusion_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "studies_eligibility_exclusion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "studies_eligibility_exclusion_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "studies_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "studies_faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  -- 1. Add new columns as nullable so existing rows aren't rejected.
  ALTER TABLE "studies" ADD COLUMN "survey_url" varchar;
  ALTER TABLE "studies" ADD COLUMN "ethics_approval_ref" varchar;
  ALTER TABLE "studies_locales" ADD COLUMN "compensation" varchar;
  ALTER TABLE "studies_locales" ADD COLUMN "location" varchar;
  ALTER TABLE "studies_page" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "studies_page" ADD COLUMN "contact_phone" varchar;
  ALTER TABLE "studies_page_locales" ADD COLUMN "contact_address" varchar;

  -- 2. Backfill placeholder values for any existing rows.
  UPDATE "studies"
     SET "survey_url" = 'https://example.com'
   WHERE "survey_url" IS NULL;

  UPDATE "studies"
     SET "ethics_approval_ref" = 'TBD'
   WHERE "ethics_approval_ref" IS NULL;

  UPDATE "studies_locales"
     SET "compensation" = 'TBD'
   WHERE "compensation" IS NULL;

  UPDATE "studies_locales"
     SET "location" = 'TBD'
   WHERE "location" IS NULL;

  UPDATE "studies_page"
     SET "contact_email" = 'placeholder@example.com'
   WHERE "contact_email" IS NULL;

  UPDATE "studies_page"
     SET "contact_phone" = 'TBD'
   WHERE "contact_phone" IS NULL;

  UPDATE "studies_page_locales"
     SET "contact_address" = 'TBD'
   WHERE "contact_address" IS NULL;

  -- 3. Promote to NOT NULL now that every row has a value.
  ALTER TABLE "studies" ALTER COLUMN "survey_url" SET NOT NULL;
  ALTER TABLE "studies" ALTER COLUMN "ethics_approval_ref" SET NOT NULL;
  ALTER TABLE "studies_locales" ALTER COLUMN "compensation" SET NOT NULL;
  ALTER TABLE "studies_locales" ALTER COLUMN "location" SET NOT NULL;
  ALTER TABLE "studies_page" ALTER COLUMN "contact_email" SET NOT NULL;
  ALTER TABLE "studies_page" ALTER COLUMN "contact_phone" SET NOT NULL;
  ALTER TABLE "studies_page_locales" ALTER COLUMN "contact_address" SET NOT NULL;

  -- FK constraints + indexes (unchanged from the generated migration)
  ALTER TABLE "studies_participation_items" ADD CONSTRAINT "studies_participation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_participation_items_locales" ADD CONSTRAINT "studies_participation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies_participation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_eligibility_inclusion" ADD CONSTRAINT "studies_eligibility_inclusion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_eligibility_inclusion_locales" ADD CONSTRAINT "studies_eligibility_inclusion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies_eligibility_inclusion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_eligibility_exclusion" ADD CONSTRAINT "studies_eligibility_exclusion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_eligibility_exclusion_locales" ADD CONSTRAINT "studies_eligibility_exclusion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies_eligibility_exclusion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_faqs" ADD CONSTRAINT "studies_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_faqs_locales" ADD CONSTRAINT "studies_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies_faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "studies_participation_items_order_idx" ON "studies_participation_items" USING btree ("_order");
  CREATE INDEX "studies_participation_items_parent_id_idx" ON "studies_participation_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "studies_participation_items_locales_locale_parent_id_unique" ON "studies_participation_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "studies_eligibility_inclusion_order_idx" ON "studies_eligibility_inclusion" USING btree ("_order");
  CREATE INDEX "studies_eligibility_inclusion_parent_id_idx" ON "studies_eligibility_inclusion" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "studies_eligibility_inclusion_locales_locale_parent_id_uniqu" ON "studies_eligibility_inclusion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "studies_eligibility_exclusion_order_idx" ON "studies_eligibility_exclusion" USING btree ("_order");
  CREATE INDEX "studies_eligibility_exclusion_parent_id_idx" ON "studies_eligibility_exclusion" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "studies_eligibility_exclusion_locales_locale_parent_id_uniqu" ON "studies_eligibility_exclusion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "studies_faqs_order_idx" ON "studies_faqs" USING btree ("_order");
  CREATE INDEX "studies_faqs_parent_id_idx" ON "studies_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "studies_faqs_locales_locale_parent_id_unique" ON "studies_faqs_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "studies_participation_items" CASCADE;
  DROP TABLE "studies_participation_items_locales" CASCADE;
  DROP TABLE "studies_eligibility_inclusion" CASCADE;
  DROP TABLE "studies_eligibility_inclusion_locales" CASCADE;
  DROP TABLE "studies_eligibility_exclusion" CASCADE;
  DROP TABLE "studies_eligibility_exclusion_locales" CASCADE;
  DROP TABLE "studies_faqs" CASCADE;
  DROP TABLE "studies_faqs_locales" CASCADE;
  ALTER TABLE "studies" DROP COLUMN "survey_url";
  ALTER TABLE "studies" DROP COLUMN "ethics_approval_ref";
  ALTER TABLE "studies_locales" DROP COLUMN "compensation";
  ALTER TABLE "studies_locales" DROP COLUMN "location";
  ALTER TABLE "studies_page" DROP COLUMN "contact_email";
  ALTER TABLE "studies_page" DROP COLUMN "contact_phone";
  ALTER TABLE "studies_page_locales" DROP COLUMN "contact_address";`)
}
