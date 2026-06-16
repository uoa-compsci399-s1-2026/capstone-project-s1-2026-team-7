import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "donations_page" ADD COLUMN "hero_background_image_id" integer;
  ALTER TABLE "donations_page" ADD CONSTRAINT "donations_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "donations_page_hero_hero_background_image_idx" ON "donations_page" USING btree ("hero_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "donations_page" DROP CONSTRAINT "donations_page_hero_background_image_id_media_id_fk";
  
  DROP INDEX "donations_page_hero_hero_background_image_idx";
  ALTER TABLE "donations_page" DROP COLUMN "hero_background_image_id";`)
}
