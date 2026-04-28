import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "studies_page" ADD COLUMN "banner_id" integer NOT NULL;
  ALTER TABLE "studies_page" ADD CONSTRAINT "studies_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "studies_page_banner_idx" ON "studies_page" USING btree ("banner_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "studies_page" DROP CONSTRAINT "studies_page_banner_id_media_id_fk";
  
  DROP INDEX "studies_page_banner_idx";
  ALTER TABLE "studies_page" DROP COLUMN "banner_id";`)
}
