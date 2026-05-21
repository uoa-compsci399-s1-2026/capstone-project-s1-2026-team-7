import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_blocks_current_studies_locales" (
  	"title" varchar DEFAULT 'Current studies' NOT NULL,
  	"link_title" varchar DEFAULT 'View all studies' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "home_page_blocks_current_studies" ADD COLUMN "link_href" varchar DEFAULT '/studies' NOT NULL;
  ALTER TABLE "home_page_rels" ADD COLUMN "studies_id" integer;
  ALTER TABLE "home_page_blocks_current_studies_locales" ADD CONSTRAINT "home_page_blocks_current_studies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_current_studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "home_page_blocks_current_studies_locales_locale_parent_id_un" ON "home_page_blocks_current_studies_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_rels_studies_id_idx" ON "home_page_rels" USING btree ("studies_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_blocks_current_studies_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_blocks_current_studies_locales" CASCADE;
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_studies_fk";
  
  DROP INDEX "home_page_rels_studies_id_idx";
  ALTER TABLE "home_page_blocks_current_studies" DROP COLUMN "link_href";
  ALTER TABLE "home_page_rels" DROP COLUMN "studies_id";`)
}
