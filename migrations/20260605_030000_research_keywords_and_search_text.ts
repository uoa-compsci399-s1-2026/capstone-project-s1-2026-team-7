import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "research_categories_keywords" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "research_categories_keywords"
        ADD CONSTRAINT "research_categories_keywords_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."research_categories"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "research_categories_keywords_order_idx"
      ON "research_categories_keywords" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "research_categories_keywords_parent_id_idx"
      ON "research_categories_keywords" USING btree ("_parent_id");

    ALTER TABLE "research" ADD COLUMN IF NOT EXISTS "search_text" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "research_categories_keywords" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "research_categories_keywords" CASCADE;
    ALTER TABLE "research" DROP COLUMN IF EXISTS "search_text";
  `)
}
