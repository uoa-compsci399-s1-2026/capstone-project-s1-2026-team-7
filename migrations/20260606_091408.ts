import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_staff_formaltitle" AS ENUM(
        'dr',
        'professor',
        'associate-professor',
        'mr',
        'mrs',
        'ms'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "research_categories_keywords" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL
    );

    ALTER TABLE "staff"
      ADD COLUMN IF NOT EXISTS "full_name" varchar;

    ALTER TABLE "staff"
      ADD COLUMN IF NOT EXISTS "formaltitle" "public"."enum_staff_formaltitle";

    ALTER TABLE "research"
      ADD COLUMN IF NOT EXISTS "search_text" varchar;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'research_categories_keywords_parent_id_fk'
      ) THEN
        ALTER TABLE "research_categories_keywords"
          ADD CONSTRAINT "research_categories_keywords_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "public"."research_categories"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "research_categories_keywords_order_idx"
      ON "research_categories_keywords" USING btree ("_order");

    CREATE INDEX IF NOT EXISTS "research_categories_keywords_parent_id_idx"
      ON "research_categories_keywords" USING btree ("_parent_id");

    UPDATE "staff"
    SET "full_name" = trim(
      concat_ws(
        ' ',
        CASE
          WHEN "formaltitle" = 'dr' THEN 'Dr'
          WHEN "formaltitle" = 'professor' THEN 'Professor'
          WHEN "formaltitle" = 'associate-professor' THEN 'Associate Professor'
          WHEN "formaltitle" = 'mr' THEN 'Mr'
          WHEN "formaltitle" = 'mrs' THEN 'Mrs'
          WHEN "formaltitle" = 'ms' THEN 'Ms'
          ELSE NULL
        END,
        "firstname",
        "lastname"
      )
    )
    WHERE "full_name" IS NULL OR trim("full_name") = '';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "research_categories_keywords_order_idx";
    DROP INDEX IF EXISTS "research_categories_keywords_parent_id_idx";

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'research_categories_keywords_parent_id_fk'
      ) THEN
        ALTER TABLE "research_categories_keywords"
          DROP CONSTRAINT "research_categories_keywords_parent_id_fk";
      END IF;
    END $$;

    ALTER TABLE "staff"
      DROP COLUMN IF EXISTS "full_name";

    ALTER TABLE "staff"
      DROP COLUMN IF EXISTS "formaltitle";

    ALTER TABLE "research"
      DROP COLUMN IF EXISTS "search_text";

    -- Intentionally NOT dropping research_categories_keywords.
    -- Intentionally NOT dropping enum_staff_formaltitle.
    -- This keeps rollback safer when AUTOPUSH or existing data already created them.
  `)
}
