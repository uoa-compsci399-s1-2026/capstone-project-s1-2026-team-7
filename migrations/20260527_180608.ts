import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "research_page_rels" ADD COLUMN "staff_id" integer;
  ALTER TABLE "research_page_rels" ADD CONSTRAINT "research_page_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "research_page_rels_staff_id_idx" ON "research_page_rels" USING btree ("staff_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "research_page_rels" DROP CONSTRAINT "research_page_rels_staff_fk";
  DROP INDEX "research_page_rels_staff_id_idx";
  ALTER TABLE "research_page_rels" DROP COLUMN "staff_id";`)
}
