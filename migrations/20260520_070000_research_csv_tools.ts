import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "research_csv_tools" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "research_csv_tools_updated_at_idx"
    ON "research_csv_tools" USING btree ("updated_at");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "research_csv_tools_created_at_idx"
    ON "research_csv_tools" USING btree ("created_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "research_csv_tools" CASCADE;
  `)
}
