import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_research_exports_status" AS ENUM('pending', 'processing', 'done', 'failed');
  CREATE TABLE "research_exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_research_exports_status" DEFAULT 'pending' NOT NULL,
  	"requested_by_id" integer,
  	"requested_at" timestamp(3) with time zone NOT NULL,
  	"started_at" timestamp(3) with time zone,
  	"completed_at" timestamp(3) with time zone,
  	"filename" varchar,
  	"row_count" numeric,
  	"s3_bucket" varchar,
  	"s3_key" varchar,
  	"error_message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "research_exports_id" integer;
  ALTER TABLE "research_exports" ADD CONSTRAINT "research_exports_requested_by_id_users_id_fk" FOREIGN KEY ("requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "research_exports_requested_by_idx" ON "research_exports" USING btree ("requested_by_id");
  CREATE INDEX "research_exports_updated_at_idx" ON "research_exports" USING btree ("updated_at");
  CREATE INDEX "research_exports_created_at_idx" ON "research_exports" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_exports_fk" FOREIGN KEY ("research_exports_id") REFERENCES "public"."research_exports"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_research_exports_id_idx" ON "payload_locked_documents_rels" USING btree ("research_exports_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_exports" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "research_exports" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_research_exports_fk";
  
  DROP INDEX "payload_locked_documents_rels_research_exports_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "research_exports_id";
  DROP TYPE "public"."enum_research_exports_status";`)
}
