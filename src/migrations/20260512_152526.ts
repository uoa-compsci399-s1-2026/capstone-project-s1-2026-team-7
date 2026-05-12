import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "enquiry_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recipient_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enquiry_tags_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enquiry_tags_id" integer;
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_enquiry_type_label" varchar DEFAULT 'Enquiry Type' NOT NULL;
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_enquiry_type_placeholder" varchar DEFAULT 'Please select…';
  ALTER TABLE "enquiry_tags_locales" ADD CONSTRAINT "enquiry_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiry_tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "enquiry_tags_updated_at_idx" ON "enquiry_tags" USING btree ("updated_at");
  CREATE INDEX "enquiry_tags_created_at_idx" ON "enquiry_tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "enquiry_tags_locales_locale_parent_id_unique" ON "enquiry_tags_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiry_tags_fk" FOREIGN KEY ("enquiry_tags_id") REFERENCES "public"."enquiry_tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_enquiry_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiry_tags_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "enquiry_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enquiry_tags_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "enquiry_tags" CASCADE;
  DROP TABLE "enquiry_tags_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_enquiry_tags_fk";
  DROP INDEX "payload_locked_documents_rels_enquiry_tags_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "enquiry_tags_id";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_enquiry_type_label";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_enquiry_type_placeholder";`)
}
