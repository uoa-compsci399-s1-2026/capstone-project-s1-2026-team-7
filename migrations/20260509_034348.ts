import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_blocks_who_we_are" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_what_we_do" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_donation_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "home_page_blocks_who_we_are" ADD CONSTRAINT "home_page_blocks_who_we_are_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_what_we_do" ADD CONSTRAINT "home_page_blocks_what_we_do_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_donation_section" ADD CONSTRAINT "home_page_blocks_donation_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_blocks_who_we_are_order_idx" ON "home_page_blocks_who_we_are" USING btree ("_order");
  CREATE INDEX "home_page_blocks_who_we_are_parent_id_idx" ON "home_page_blocks_who_we_are" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_who_we_are_path_idx" ON "home_page_blocks_who_we_are" USING btree ("_path");
  CREATE INDEX "home_page_blocks_what_we_do_order_idx" ON "home_page_blocks_what_we_do" USING btree ("_order");
  CREATE INDEX "home_page_blocks_what_we_do_parent_id_idx" ON "home_page_blocks_what_we_do" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_what_we_do_path_idx" ON "home_page_blocks_what_we_do" USING btree ("_path");
  CREATE INDEX "home_page_blocks_donation_section_order_idx" ON "home_page_blocks_donation_section" USING btree ("_order");
  CREATE INDEX "home_page_blocks_donation_section_parent_id_idx" ON "home_page_blocks_donation_section" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_donation_section_path_idx" ON "home_page_blocks_donation_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_blocks_who_we_are" CASCADE;
  DROP TABLE "home_page_blocks_what_we_do" CASCADE;
  DROP TABLE "home_page_blocks_donation_section" CASCADE;`)
}
