import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "research_categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"research_category_terms_id" integer
  );
  
  ALTER TABLE "research_categories_rels" ADD CONSTRAINT "research_categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."research_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_categories_rels" ADD CONSTRAINT "research_categories_rels_research_category_terms_fk" FOREIGN KEY ("research_category_terms_id") REFERENCES "public"."research_category_terms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "research_categories_rels_order_idx" ON "research_categories_rels" USING btree ("order");
  CREATE INDEX "research_categories_rels_parent_idx" ON "research_categories_rels" USING btree ("parent_id");
  CREATE INDEX "research_categories_rels_path_idx" ON "research_categories_rels" USING btree ("path");
  CREATE INDEX "research_categories_rels_research_category_terms_id_idx" ON "research_categories_rels" USING btree ("research_category_terms_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "research_categories_rels" CASCADE;`)
}
