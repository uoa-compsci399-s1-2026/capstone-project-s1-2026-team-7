import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_csv_tools" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "research_csv_tools" CASCADE;
  DROP INDEX "studies_study_code_idx";
  ALTER TABLE "studies" DROP COLUMN "study_code";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "research_csv_tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Research CSV Tools',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "studies" ADD COLUMN "study_code" varchar NOT NULL;
  CREATE INDEX "research_csv_tools_updated_at_idx" ON "research_csv_tools" USING btree ("updated_at");
  CREATE INDEX "research_csv_tools_created_at_idx" ON "research_csv_tools" USING btree ("created_at");
  CREATE UNIQUE INDEX "studies_study_code_idx" ON "studies" USING btree ("study_code");`)
}
