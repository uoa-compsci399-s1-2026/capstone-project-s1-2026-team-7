import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_exclusions" ADD COLUMN "restored_research_id" varchar;
  ALTER TABLE "research_exclusions" ADD COLUMN "restored_at" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_exclusions" DROP COLUMN "restored_research_id";
  ALTER TABLE "research_exclusions" DROP COLUMN "restored_at";`)
}
