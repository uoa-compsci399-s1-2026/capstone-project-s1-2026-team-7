import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_research_category_terms_source" AS ENUM('openalex-primary-topic', 'openalex-topic', 'openalex-keyword');
  CREATE TYPE "public"."enum_research_category_terms_status" AS ENUM('unmapped', 'mapped', 'ignored');
  CREATE TABLE "research_category_terms_example_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"doi" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "research_category_terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"normalized_term" varchar NOT NULL,
  	"source" "enum_research_category_terms_source" DEFAULT 'openalex-topic' NOT NULL,
  	"status" "enum_research_category_terms_status" DEFAULT 'unmapped' NOT NULL,
  	"mapped_category_id" integer,
  	"source_score" numeric,
  	"times_seen" numeric DEFAULT 0,
  	"last_seen_at" timestamp(3) with time zone,
  	"admin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "research_category_terms_id" integer;
  ALTER TABLE "research_category_terms_example_research" ADD CONSTRAINT "research_category_terms_example_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_category_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_category_terms" ADD CONSTRAINT "research_category_terms_mapped_category_id_research_categories_id_fk" FOREIGN KEY ("mapped_category_id") REFERENCES "public"."research_categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "research_category_terms_example_research_order_idx" ON "research_category_terms_example_research" USING btree ("_order");
  CREATE INDEX "research_category_terms_example_research_parent_id_idx" ON "research_category_terms_example_research" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "research_category_terms_normalized_term_idx" ON "research_category_terms" USING btree ("normalized_term");
  CREATE INDEX "research_category_terms_mapped_category_idx" ON "research_category_terms" USING btree ("mapped_category_id");
  CREATE INDEX "research_category_terms_updated_at_idx" ON "research_category_terms" USING btree ("updated_at");
  CREATE INDEX "research_category_terms_created_at_idx" ON "research_category_terms" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_category_terms_fk" FOREIGN KEY ("research_category_terms_id") REFERENCES "public"."research_category_terms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_research_category_terms_id_idx" ON "payload_locked_documents_rels" USING btree ("research_category_terms_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_category_terms_example_research" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_category_terms" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "research_category_terms_example_research" CASCADE;
  DROP TABLE "research_category_terms" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_research_category_terms_fk";
  
  DROP INDEX "payload_locked_documents_rels_research_category_terms_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "research_category_terms_id";
  DROP TYPE "public"."enum_research_category_terms_source";
  DROP TYPE "public"."enum_research_category_terms_status";`)
}
