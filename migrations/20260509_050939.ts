import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Add the new columns as nullable (so Postgres lets us add them
    --    even though existing rows have no value for them yet).
    ALTER TABLE "studies" ADD COLUMN "study_code" varchar;
    ALTER TABLE "studies_locales" ADD COLUMN "duration" varchar;
    ALTER TABLE "studies_locales" ADD COLUMN "eligibility" varchar;

    -- 2. Backfill existing rows with placeholder values so the NOT NULL
    --    constraint will pass. study_code uses the row id to stay unique
    --    (the unique index would otherwise reject duplicates).
    UPDATE "studies"
       SET "study_code" = 'HNU-PLACEHOLDER-' || id
     WHERE "study_code" IS NULL;

    UPDATE "studies_locales"
       SET "duration" = ''
     WHERE "duration" IS NULL;

    UPDATE "studies_locales"
       SET "eligibility" = ''
     WHERE "eligibility" IS NULL;

    -- 3. Now we can safely promote the columns to NOT NULL.
    ALTER TABLE "studies" ALTER COLUMN "study_code" SET NOT NULL;
    ALTER TABLE "studies_locales" ALTER COLUMN "duration" SET NOT NULL;
    ALTER TABLE "studies_locales" ALTER COLUMN "eligibility" SET NOT NULL;

    -- 4. Unique index on study_code (deferred to the end so the placeholder
    --    backfill above doesn't trip the uniqueness check).
    CREATE UNIQUE INDEX "studies_study_code_idx" ON "studies" USING btree ("study_code");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "studies_study_code_idx";
  ALTER TABLE "studies" DROP COLUMN "study_code";
  ALTER TABLE "studies_locales" DROP COLUMN "duration";
  ALTER TABLE "studies_locales" DROP COLUMN "eligibility";`)
}
