import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collaborations_page_blocks_collaboration_hero" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "collaborations_page_blocks_collaboration_hero" ADD CONSTRAINT "collaborations_page_blocks_collaboration_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "collaborations_page_blocks_collaboration_hero_background_idx" ON "collaborations_page_blocks_collaboration_hero" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collaborations_page_blocks_collaboration_hero" DROP CONSTRAINT "collaborations_page_blocks_collaboration_hero_background_image_id_media_id_fk";
  
  DROP INDEX "collaborations_page_blocks_collaboration_hero_background_idx";
  ALTER TABLE "collaborations_page_blocks_collaboration_hero" DROP COLUMN "background_image_id";`)
}
