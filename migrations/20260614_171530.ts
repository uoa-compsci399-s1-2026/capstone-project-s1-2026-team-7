import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "home_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "home_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page_locales" USING btree ("meta_image_id","_locale");
  ALTER TABLE "home_page_locales" DROP COLUMN "seo_meta_title";
  ALTER TABLE "home_page_locales" DROP COLUMN "seo_meta_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_locales" DROP CONSTRAINT "home_page_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "home_page_meta_meta_image_idx";
  ALTER TABLE "home_page_locales" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "home_page_locales" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "home_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "home_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "home_page_locales" DROP COLUMN "meta_image_id";`)
}
