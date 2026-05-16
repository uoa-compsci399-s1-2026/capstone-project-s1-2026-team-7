import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_blocks_current_studies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "home_page_blocks_current_studies" ADD CONSTRAINT "home_page_blocks_current_studies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_blocks_current_studies_order_idx" ON "home_page_blocks_current_studies" USING btree ("_order");
  CREATE INDEX "home_page_blocks_current_studies_parent_id_idx" ON "home_page_blocks_current_studies" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_current_studies_path_idx" ON "home_page_blocks_current_studies" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_blocks_current_studies" CASCADE;`)
}
