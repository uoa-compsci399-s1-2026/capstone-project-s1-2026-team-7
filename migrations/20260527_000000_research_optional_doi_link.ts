import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "research"
      ALTER COLUMN "doi" DROP NOT NULL,
      ALTER COLUMN "link" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "research" SET "doi" = '' WHERE "doi" IS NULL;
    UPDATE "research" SET "link" = '' WHERE "link" IS NULL;

    ALTER TABLE "research"
      ALTER COLUMN "doi" SET NOT NULL,
      ALTER COLUMN "link" SET NOT NULL;
  `)
}
