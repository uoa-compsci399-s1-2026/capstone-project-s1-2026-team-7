import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "research" ADD COLUMN IF NOT EXISTS "link" varchar;
    UPDATE "research" SET "link" = COALESCE("research_link", '') WHERE "link" IS NULL;
    ALTER TABLE "research" ALTER COLUMN "link" SET NOT NULL;
    ALTER TABLE "research" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE "research" DROP COLUMN IF EXISTS "research_link";
    DO $$ BEGIN
      ALTER TABLE "research" ADD CONSTRAINT "research_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    CREATE INDEX IF NOT EXISTS "research_image_idx" ON "research" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "research_image_idx";
    ALTER TABLE "research" DROP CONSTRAINT IF EXISTS "research_image_id_media_id_fk";
    ALTER TABLE "research" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "research" ADD COLUMN IF NOT EXISTS "research_link" varchar;
    UPDATE "research" SET "research_link" = COALESCE("link", '') WHERE "research_link" IS NULL OR "research_link" = '';
    ALTER TABLE "research" ALTER COLUMN "research_link" SET NOT NULL;
    ALTER TABLE "research" DROP COLUMN IF EXISTS "link";
  `)
}
