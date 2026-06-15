import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_locales" CASCADE;
  ALTER TABLE "research" DROP COLUMN "search_text";
  ALTER TABLE "research_page" DROP COLUMN "seo_meta_title";
  ALTER TABLE "research_page" DROP COLUMN "seo_meta_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "footer_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "research" ADD COLUMN "search_text" varchar;
  ALTER TABLE "research_page" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "research_page" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_meta_meta_image_idx" ON "footer_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");`)
}
