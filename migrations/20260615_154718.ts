import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "staff_locales" CASCADE;
  ALTER TABLE "research_locales" DROP CONSTRAINT "research_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "research_meta_meta_image_idx";
  ALTER TABLE "staff" DROP COLUMN "sort_order";
  ALTER TABLE "studies" DROP COLUMN "sort_order";
  ALTER TABLE "research" DROP COLUMN "order";
  ALTER TABLE "research_locales" DROP COLUMN "meta_title";
  ALTER TABLE "research_locales" DROP COLUMN "meta_description";
  ALTER TABLE "research_locales" DROP COLUMN "meta_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "staff_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "staff" ADD COLUMN "sort_order" numeric;
  ALTER TABLE "studies" ADD COLUMN "sort_order" numeric;
  ALTER TABLE "research" ADD COLUMN "order" numeric;
  ALTER TABLE "research_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "research_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "research_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "staff_locales" ADD CONSTRAINT "staff_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff_locales" ADD CONSTRAINT "staff_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "staff_meta_meta_image_idx" ON "staff_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "staff_locales_locale_parent_id_unique" ON "staff_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "research_locales" ADD CONSTRAINT "research_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "research_meta_meta_image_idx" ON "research_locales" USING btree ("meta_image_id","_locale");`)
}
