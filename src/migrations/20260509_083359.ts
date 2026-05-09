import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research" ADD COLUMN "link" varchar NOT NULL;
  ALTER TABLE "research" ADD COLUMN "image_id" integer;
  ALTER TABLE "research" ADD CONSTRAINT "research_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "research_image_idx" ON "research" USING btree ("image_id");
  ALTER TABLE "research" DROP COLUMN "research_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research" DROP CONSTRAINT "research_image_id_media_id_fk";
  
  DROP INDEX "research_image_idx";
  ALTER TABLE "research" ADD COLUMN "research_link" varchar NOT NULL;
  ALTER TABLE "research" DROP COLUMN "link";
  ALTER TABLE "research" DROP COLUMN "image_id";`)
}
