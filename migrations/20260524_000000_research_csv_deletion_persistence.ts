import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "research"
      ADD COLUMN IF NOT EXISTS "csv_deleted" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "csv_deleted_at" timestamp(3) with time zone;

    UPDATE "research"
      SET "csv_deleted" = false
      WHERE "csv_deleted" IS NULL;

    CREATE INDEX IF NOT EXISTS "research_csv_deleted_idx"
      ON "research" USING btree ("csv_deleted");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "research_csv_deleted_idx";

    ALTER TABLE "research"
      DROP COLUMN IF EXISTS "csv_deleted_at",
      DROP COLUMN IF EXISTS "csv_deleted";
  `)
}
