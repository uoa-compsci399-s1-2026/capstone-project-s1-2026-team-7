import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_research_source" AS ENUM('manual', 'orcid-csv');
  CREATE TYPE "public"."enum_research_exclusions_source" AS ENUM('manual-exclusion', 'missing-from-csv', 'legacy-csv-deleted');
  CREATE TABLE "research_exclusions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"doi" varchar,
  	"normalized_doi" varchar,
  	"link" varchar,
  	"publication_date" varchar,
  	"fallback_key" varchar,
  	"source" "enum_research_exclusions_source" DEFAULT 'manual-exclusion',
  	"active" boolean DEFAULT true,
  	"excluded_at" timestamp(3) with time zone,
  	"removed_research_id" varchar,
  	"times_seen" numeric DEFAULT 1,
  	"reason" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "research" ADD COLUMN "source" "enum_research_source" DEFAULT 'manual';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "research_exclusions_id" integer;
  CREATE INDEX "research_exclusions_normalized_doi_idx" ON "research_exclusions" USING btree ("normalized_doi");
  CREATE INDEX "research_exclusions_fallback_key_idx" ON "research_exclusions" USING btree ("fallback_key");
  CREATE INDEX "research_exclusions_updated_at_idx" ON "research_exclusions" USING btree ("updated_at");
  CREATE INDEX "research_exclusions_created_at_idx" ON "research_exclusions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_exclusions_fk" FOREIGN KEY ("research_exclusions_id") REFERENCES "public"."research_exclusions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_research_exclusions_id_idx" ON "payload_locked_documents_rels" USING btree ("research_exclusions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_exclusions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "research_exclusions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_research_exclusions_fk";
  
  DROP INDEX "payload_locked_documents_rels_research_exclusions_id_idx";
  ALTER TABLE "research" DROP COLUMN "source";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "research_exclusions_id";
  DROP TYPE "public"."enum_research_source";
  DROP TYPE "public"."enum_research_exclusions_source";`)
}
