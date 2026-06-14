import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_blocks_hero" RENAME COLUMN "mobile_hero_image_id" TO "featured_image_id";
  ALTER TABLE "home_page_blocks_hero" DROP CONSTRAINT "home_page_blocks_hero_mobile_hero_image_id_media_id_fk";
  
  DROP INDEX "home_page_blocks_hero_mobile_hero_image_idx";
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_blocks_hero_featured_image_idx" ON "home_page_blocks_hero" USING btree ("featured_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_blocks_hero" RENAME COLUMN "featured_image_id" TO "mobile_hero_image_id";
  ALTER TABLE "home_page_blocks_hero" DROP CONSTRAINT "home_page_blocks_hero_featured_image_id_media_id_fk";
  
  DROP INDEX "home_page_blocks_hero_featured_image_idx";
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_mobile_hero_image_id_media_id_fk" FOREIGN KEY ("mobile_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_blocks_hero_mobile_hero_image_idx" ON "home_page_blocks_hero" USING btree ("mobile_hero_image_id");`)
}
